import axios from 'axios';
import socket from '../socket';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import VITE_BACKEND_URL from '../../config';
import './ChatRoom.css';

const ChatRoom = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const scrollToBottom = useRef(() => {
    if (!isScrolling) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    if (storedUserId) setUserId(storedUserId);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        await axios.get(`${VITE_BACKEND_URL}scope/protecteduser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Token válido, usuario autenticado');
      } catch (error) {
        console.log('Error de autenticación');
        console.error(error);
        navigate('/login');
      }
    };

    if (token) {
      fetchUserStatus();
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchChatAndMessages = async () => {
      try {
        const [chatResponse, messagesResponse] = await Promise.all([
          axios.get(`${VITE_BACKEND_URL}chats/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${VITE_BACKEND_URL}chats/${id}/messages`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setChat(chatResponse.data);
        setMessages(messagesResponse.data);
        scrollToBottom.current();
      } catch (error) {
        console.error('Error al obtener el chat o los mensajes:', error);
        navigate('/');
      }
    };

    fetchChatAndMessages();

    const intervalId = setInterval(fetchChatAndMessages, 1000);

    return () => clearInterval(intervalId);
  }, [id, token, navigate, scrollToBottom]);

  useEffect(() => {
    socket.emit('joinRoom', id);

    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom.current();
    };

    socket.on('message', handleNewMessage);

    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [id, scrollToBottom]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setIsScrolling(scrollHeight - scrollTop !== clientHeight);
      if (scrollHeight - scrollTop === clientHeight) {
        setIsScrolling(false);
        scrollToBottom.current();
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
    <div className="chatroom-container">
      <h2 className="titulo-chatroom">{chat ? chat.nombre : 'Cargando...'}</h2>
      <div className="messages-container" ref={messagesContainerRef} onScroll={handleScroll}>
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

