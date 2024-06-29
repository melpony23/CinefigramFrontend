import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VITE_BACKEND_URL from "/config";
import { AuthContext } from '../auth/AuthContext';
import "./ChatList.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap
import { format } from 'date-fns'; // Importar date-fns

const ChatList = () => {
  const { token } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${VITE_BACKEND_URL}scope/protecteduser`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log('Enviaste un token bueno y estas logueado');
        console.log(response);
      })
      .catch((error) => {
        console.log('Hubo un error, no estas logueado');
        console.log(error);
        setError(true);
        navigate('/login');
      });
      
  }, [token, navigate]);

  if (error) {
    return <div className="alert alert-danger">Error al cargar la página. Por favor, inténtelo de nuevo.</div>;
  }

  useEffect(() => {
    if (token) {
      axios.get(`${VITE_BACKEND_URL}chats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setChats(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los chats:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      });
    }
  }, [token, navigate]);

  return (
    <div className='lista-chats'>
      <h2 className='titulo-lista-chats text-center mb-4'>Salas de chat</h2>
      <button className="cssbuttons-io">
        <span >
          <Link to="/crear-chat" className='boton-titulo-chat'>
            Crear nuevo chat
          </Link>
        </span>
      </button>
      <ul className="list-group">
        {chats.map(chat => (
          <li key={chat.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <h3 className='chat-nombre-lista'>{chat.nombre}</h3>
              <p className='chat-descripcion-lista'>Descripcion: {chat.descripcion}</p>
              <small className='chat-fecha-lista'>
                Fecha de creación: {format(new Date(chat.createdAt), 'dd/MM/yyyy HH:mm')}
              </small>
            </div>
            <Link to={`/chats/${chat.id}`} className="btn btn-primary btn-size">
              Unirse
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;

