import InfoCardLista from '../InfoCardLista/InfoCardLista';
import './ListaChica-Card.css';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Importa PropTypes


const ListaChica_Card = (props) => {
    const { id, titulo, likes, dislikes } = props;
    const [imagen, setImagen] = useState([]);
    const [gotImagen, setGotImagen] = useState(false);
    const [autor, setAutor] = useState(null);
    const [gotAutor, setGotAutor] = useState(false);
    const navigate = useNavigate();

    function handlePosterClick(id) {
        navigate(`/lista/${id}`);
    }

    useEffect(() => {
        const config_get_imagen = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/${id}/imagen`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getImagen = async () => {
            if (!gotImagen) {
                try {
                    const imagen = await axios(config_get_imagen);
                    setImagen(imagen.data);
                    setGotImagen(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getImagen();
    }, [id, gotImagen]);

    useEffect(() => {
        const config_get_autor = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/${id}/autor`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getAutor = async () => {
            if (!gotAutor) {
                try {
                    const autor = await axios(config_get_autor);
                    setAutor(autor.data);
                    setGotAutor(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getAutor();
    }, [id, gotAutor]);

    return (
        <div className='Card_lista_chica' onClick={() => handlePosterClick(id)}>
            <div className='div_imagen_lista_ch'>

                {imagen[0] && <img src={imagen[0]} className='Imagen_lista0' alt="Imagen 0" />}
                {imagen[1] && <img src={imagen[1]} className='Imagen_lista1' alt="Imagen 1" />}

            </div>
            <div className='div_info_playlist_ch'>
                <div className='div_titulo_lista_c'>
                    <h3>{titulo}</h3>
                </div>
                <div className='div_stats_lista_c'>
                    <InfoCardLista autor={autor} likes={likes} dislikes={dislikes} num_peliculas={imagen.length}></InfoCardLista>
                </div>
            </div>
        </div>
    );
};

// PropTypes para el componente
ListaChica_Card.propTypes = {
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired
};

export default ListaChica_Card;
