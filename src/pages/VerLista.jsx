import React, { useState, useEffect } from 'react';
import "./VerLista.css";
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';

export const VerLista = () => {
    const id = useParams().id;
    const [lista, setLista] = useState([]);
    const [gotLista, setGotLista] = useState(false);
    const [imagen, setImagen] = useState([]);
    const [gotImagen, setGotImagen] = useState(false);
    const [autor, setAutor] = useState(null);
    const [gotAutor, setGotAutor] = useState(false);

    const config_get_lista = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/unica/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const config_get_imagen = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/${id}/imagen`,
        headers: {
            'Content-Type': 'application/json'
        },
    }
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

    useEffect(() => {
        const getLista = async () => {
            if (!gotLista) {
                try {
                    const lista = await axios(config_get_lista);
                    setLista(lista.data);
                    setGotLista(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getLista();
    }, [])


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
    }, [lista, gotLista])

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
                    {imagen.length == 0 ? (<h2>No tienes listas todavía. Crea una!</h2>) :
                        (imagen.map(imagen => { return (<img className='imagenpelilista' src={imagen} />) }))
                    }
                </div>
            </div>


        </body>
    )
}



export default VerLista;