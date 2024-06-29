import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import socket from '../socket';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import VITE_BACKEND_URL from "../../config";
import "./ChatRoom.css";

const ChatRoom = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false); // Estado para controlar si el usuario está scrollando manualmente

  const messagesEndRef = useRef(null); // Referencia para el final de los mensajes
  const messagesContainerRef = useRef(null); // Referencia al contenedor de mensajes

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    if (storedUserId) setUserId(storedUserId);
    if (storedUsername) setUsername(storedUsername);  
  }, []);

  useEffect(() => {
    if (token) {
      axios.get(`${VITE_BACKEND_URL}scope/protecteduser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Token válido, usuario autenticado');
      })
      .catch(error => {
        console.log('Error de autenticación');
        console.error(error);
        setError(true);
        navigate('/login');
      });
    }
  }, [token, navigate]);

  if (error) {
    return <div className="alert alert-danger">Error al cargar la página. Por favor, inténtelo de nuevo.</div>;
  }

  useEffect(() => {
    socket.emit('joinRoom', id);

    axios.get(`${VITE_BACKEND_URL}chats/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('API response:', response.data);
      setChat(response.data);
    })
    .catch(error => {
      console.error('Error al obtener el chat:', error);
      navigate('/');
    });

    const fetchMessages = () => {
      axios.get(`${VITE_BACKEND_URL}chats/${id}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setMessages(response.data);
        scrollToBottom(); // Llamar a función de desplazamiento al obtener nuevos mensajes
      })
      .catch(error => {
        console.error('Error al obtener los mensajes:', error.response ? error.response.data : error.message);
      });
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 1000);

    return () => clearInterval(intervalId);
  }, [id, token, navigate]);

  useEffect(() => {
    socket.on('message', message => {
      console.log('Mensaje recibido desde el servidor:', message);
      setMessages(prevMessages => [...prevMessages, message]);
      scrollToBottom(); // Llamar a función de desplazamiento al recibir un nuevo mensaje
    });

    return () => {
      socket.off('message');
    };
  }, []);

  // Función para desplazar automáticamente al final de los mensajes
  const scrollToBottom = () => {
    if (!isScrolling) { // Solo hacer scroll automático si no se está scrollando manualmente
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Función para manejar el scroll manual
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Verificar si el usuario está scrollando manualmente
      setIsScrolling(scrollHeight - scrollTop !== clientHeight);
      if (scrollHeight - scrollTop === clientHeight) {
        // Estamos en el fondo del contenedor
        setIsScrolling(false); // Terminó el scroll manual
        scrollToBottom(); // Llamar a función de desplazamiento al llegar al fondo
      }
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && userId && id) {
      socket.emit('sendMessage', { contenido: newMessage, usuarioId: userId, chatId: id });
      setNewMessage('');
    } else {
      console.error('Error: Mensaje, usuarioId o chatId están vacíos o son inválidos.');
    }
  };

  return (
    <div className='chatroom-container'>
      <h2 className='titulo-chatroom'>{chat ? chat.nombre : 'Cargando...'}</h2>
      <div
        className="messages-container"
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {messages.length > 0 ? (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-item ${message.usuario?.username === username ? 'own-message' : 'other-message'}`}
                style={{ alignSelf: message.usuario?.username === username ? 'flex-end' : 'flex-start' }}
              >
                <div className="message-content">
                  <strong>{message.usuario?.username || username}</strong>: {message.contenido}
                </div>
                <div className="message-time">{new Date(message.createdAt).toLocaleString()}</div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Referencia para el final de los mensajes */}
          </>
        ) : (
          <p>No hay mensajes en este chat.</p>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatRoom;
