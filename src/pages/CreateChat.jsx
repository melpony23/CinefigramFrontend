import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import VITE_BACKEND_URL from "/config";
import "./CreateChat.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS

const CreateChat = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const { token } = useContext(AuthContext);
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
      .then(() => {
        console.log('Enviaste un token bueno y estás logueado');
      })
      .catch((error) => {
        console.log('Hubo un error, no estás logueado');
        console.log(error);
        setError(true);
        navigate('/login');
      });
      
  }, [token, navigate]);

  // Si hay un error, renderiza un mensaje de error o redirige
  if (error) {
    return <div className="alert alert-danger">Error al cargar la página. Por favor, inténtelo de nuevo.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const config = {
      method: 'post',
      url: `${VITE_BACKEND_URL}chats`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' // Especifica el tipo de contenido JSON
      },
      data: {
        nombre,
        descripcion
      }
    };
  
    axios(config)
      .then(() => {
        navigate('/chats');
      })
      .catch(error => {
        console.error('Error al crear el chat:', error);
      });
  };
  

  return (
    <>
    <div className='boton-volver-contenedor'>
        <Link to="/chats" className='boton-volver-chat'>
            Volver
        </Link>   
    </div>
    <div className="container-crear-chat mt">
        <h2 className='titulo-lista-chats text-center mb-4'>Crear Chat</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="nombre" className="form-label-chat">Nombre del chat</label>
            <input
                type="text"
                className="form-control chat-width2"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre del chat"
                required
            />
            </div>
            <div>
            <label htmlFor="descripcion" className="form-label-chat">Descripción del chat</label>
            <textarea
                className="form-control chat-width1"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese la descripción del chat"
                required
            />
            </div>
                <center>
                    <button type="submit" className="cssbuttons-io">
                        <span className='text-crear-chat'>
                            Crear
                        </span>
                    </button>
                </center>
        </form>
    </div>
    </>
  );
};

export default CreateChat;
