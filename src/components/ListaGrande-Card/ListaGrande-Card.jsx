import InfoCardLista from '../InfoCardLista/InfoCardLista';
import './ListaGrande-Card.css';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useState, useEffect } from 'react';

const ListaGrande_Card = (props) => {
    const { id, titulo, descripcion, likes, dislikes } = props;
    const [imagen, setImagen] = useState([]);
    const [gotImagen, setGotImagen] = useState(false);
    const [autor, setAutor] = useState(null)
    const [gotAutor, setGotAutor] = useState(false);

    const config_get_imagen = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/${id}/imagen`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    useEffect(() => {
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
        }
        getImagen();
    }, [])

    const config_get_autor = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/${id}/autor`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    useEffect(() => {
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
        }
        getAutor();
    }, [])

    return (
        <div className='Card_lista_grande'>
            <div className='div_imagen_lista_g'>
                <img src={imagen[0]} className='Imagen_lista0' />
                <img src={imagen[1]} className='Imagen_lista1' />
            </div>
            <div className='div_info_playlist_g'>
                <div className='div_titulo_lista_g'>
                    <h3>{titulo}</h3>
                </div>
                <div className='div_stats_lista_g'>
                    <InfoCardLista autor={autor} likes={likes} dislikes={dislikes} num_peliculas={imagen.length}></InfoCardLista>
                </div>
                <div className='div_descripcion_lista_g'>
                    <h4> {descripcion}</h4>
                </div>

            </div>
        </div>
    )
}

export default ListaGrande_Card;