import React from 'react';
import "./ListasUser.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import PortadaPlaylist from '../../assets/portada_playlist.png';

export const ListasUser = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const id = useParams().id;
    const [listas, setListas] = useState([]);
    const [gotListas, setGotListas] = useState(false);

    const config_get_listas = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/usuario/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    useEffect(() => {
        const getListas = async () => {
            if (!gotListas) {
                try {
                    const listas = await axios(config_get_listas);
                    setListas(listas.data);
                    console.log(`Llegaron listas!!`);
                    setGotListas(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getListas();
    }, [])

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) setUsername(storedUsername);
    }, []);


    return (
        <div className='Big_contenedor_listas_user'>
            <div className='titulo_listas_user'>
                <h1>Tus listas</h1>
                <h2>Revisa y crea listas para ti y para compartir con tus amigos</h2>
            </div>
            <div className='contenedor_listas_creadas'>
                {listas.length == 0 ? (<h2>No tienes listas todavía. Crea una!</h2>) :
                    (listas.map(lista => { return (<ListaGrande_Card id={lista.id} titulo={lista.titulo} likes={2} dislikes={2} descripcion={lista.descripcion}> </ListaGrande_Card>) }))
                }
            </div>
            <div className='contenedor_boton_crear_lista'>
                <button className="cssbuttons-io" onClick={() => { navigate('/crear-lista') }}>
                    <span>Crear lista</span>
                </button>
            </div>
        </div>

    );

};

export default ListasUser;