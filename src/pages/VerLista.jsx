import { useState, useEffect } from 'react';
import "./VerLista.css";
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';

const VerLista = () => {
    const { id } = useParams();
    const [lista, setLista] = useState([]);
    const [gotLista, setGotLista] = useState(false);
    const [imagen, setImagen] = useState([]);
    const [gotImagen, setGotImagen] = useState(false);
    const [autor, setAutor] = useState(null);
    const [gotAutor, setGotAutor] = useState(false);

    useEffect(() => {
        const config_get_lista = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/unica/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const getLista = async () => {
            if (!gotLista) {
                try {
                    const listaResponse = await axios(config_get_lista);
                    setLista(listaResponse.data);
                    setGotLista(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        getLista();
    }, [id, gotLista]);

    useEffect(() => {
        const config_get_imagen = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/${id}/imagen`,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const getImagen = async () => {
            if (!gotImagen) {
                try {
                    const imagenResponse = await axios(config_get_imagen);
                    setImagen(imagenResponse.data);
                    setGotImagen(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        getImagen();
    }, [id, gotImagen]);

    useEffect(() => {
        const config_get_autor = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/${id}/autor`,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const getAutor = async () => {
            if (!gotAutor) {
                try {
                    const autorResponse = await axios(config_get_autor);
                    setAutor(autorResponse.data);
                    setGotAutor(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        getAutor();
    }, [id, gotAutor]);

    return (
        <body className='contenedor_lista_page'>
            <div className='separador_lista_page'></div>
            <div className='contenido_lista_page'>
                <div className='titulo_lista_page'>
                    <h1>{lista.titulo}</h1>
                </div>
                <div className='autor_lista_page'>
                    <h2>Creada por: {autor}</h2>
                </div>
                <div className='descripcion_lista_page'>
                    <h2>{lista.descripcion}</h2>
                </div>
                <div className='imagenes_peli_lista_page'>
                    {imagen.length === 0 ? (
                        <h2>No tienes listas todavía. ¡Crea una!</h2>
                    ) : (
                        imagen.map((imagenItem, index) => (
                            <img key={index} className='imagenpelilista' src={imagenItem} alt={`Imagen ${index}`} />
                        ))
                    )}
                </div>
            </div>
        </body>
    )
}

export default VerLista;
