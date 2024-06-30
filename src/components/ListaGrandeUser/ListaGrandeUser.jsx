import PropTypes from 'prop-types';
import InfoCardLista from '../InfoCardLista/InfoCardLista';
import './ListaGrandeUser.css';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const ListaGrandeUser = (props) => {
    const { id, titulo, descripcion, privacidad, show_privacidad } = props;
    const [imagen, setImagen] = useState([]);
    const [gotImagen, setGotImagen] = useState(false);
    const [autor, setAutor] = useState(null);
    const [gotAutor, setGotAutor] = useState(false);
    const navigate = useNavigate();

    function handlePosterClick(id) {
        navigate(`/lista/${id}`);
    }

    function set_privacidad(privacidad) {
        return privacidad ? "Pública" : "Privada";
    }

    useEffect(() => {
        const getImagen = async () => {
            if (!gotImagen) {
                const config_get_imagen = {
                    method: 'get',
                    url: `${VITE_BACKEND_URL}playlists/${id}/imagen`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                };
                try {
                    const response = await axios(config_get_imagen);
                    setImagen(response.data);
                    setGotImagen(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getImagen();
    }, [id, gotImagen]);

    useEffect(() => {
        const getAutor = async () => {
            if (!gotAutor) {
                const config_get_autor = {
                    method: 'get',
                    url: `${VITE_BACKEND_URL}playlists/${id}/autor`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                };
                try {
                    const response = await axios(config_get_autor);
                    setAutor(response.data);
                    setGotAutor(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getAutor();
    }, [id, gotAutor]);

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro que deseas borrar esta lista? Esta acción no se puede deshacer.')) {
            const config = {
                method: 'delete',
                url: `${VITE_BACKEND_URL}playlists/${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            try {
                await axios(config);
                alert('Lista eliminada exitosamente');
                navigate(`/listas-user/${autor.id}`);
            } catch (error) {
                alert('Error al intentar borrar la lista. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    };

    return (
        <div className='Card_lista_grande2'>
            <div className='div_imagen_lista_g' onClick={() => handlePosterClick(id)}>
                {imagen.map((img, index) => (
                    <img key={index} src={img} className={`Imagen_lista${index}`} alt={`Lista ${index}`} />
                ))}
            </div>
            <div className='div_info_playlist_gg' onClick={() => handlePosterClick(id)}>
                <div className='div_titulo_lista_g'>
                    <h3>{titulo}</h3>
                </div>
                <div className='div_stats_lista_g'>
                    <InfoCardLista
                        autor={autor}
                        num_peliculas={imagen.length}
                        privacidad={set_privacidad(privacidad)}
                        show_privacidad={show_privacidad}
                    />
                </div>
                <div className='div_descripcion_lista_g'>
                    <h4>{descripcion}</h4>
                </div>
            </div>
            <div className='div_boton_editar'>
                <button className="cssbuttons-io" onClick={handleDelete}>
                    <span>Eliminar lista</span>
                </button>
            </div>
        </div>
    );
};

// Añadir PropTypes para validar las propiedades esperadas
ListaGrandeUser.propTypes = {
    id: PropTypes.string,
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    privacidad: PropTypes.bool,
    show_privacidad: PropTypes.bool,
};

export default ListaGrandeUser;
