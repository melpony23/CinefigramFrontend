import "./ListasUser.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import PortadaPlaylist from '../../assets/portada_playlist.png';
import ListaGrandeUser from '../components/ListaGrandeUser/ListaGrandeUser';

export const ListasUser = () => {
    const navigate = useNavigate();
    const id = useParams().id;
    const [listas, setListas] = useState([]);
    const [gotListas, setGotListas] = useState(false);

    useEffect(() => {
        const config_get_listas = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/usuario/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getListas = async () => {
            if (!gotListas) {
                try {
                    const response = await axios(config_get_listas);
                    setListas(response.data);
                    console.log(`Llegaron listas!!`);

                    setGotListas(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getListas();
    }, [id, gotListas]); // Añadir dependencias a useEffect

    return (
        <div className='Big_contenedor_listas_user'>
            <div className='separador1234'>
            </div>
            <div className='titulo_listas_user'>
                <h1>Tus listas</h1>
                <h2>Revisa y crea listas para ti y para compartir con tus amigos</h2>
                <div className='contenedor_boton_crear_lista'>
                    <button className="cssbuttons-io" onClick={() => { navigate(`/crear-lista/${id}`) }}>
                        <span>Crear lista</span>
                    </button>
                </div>
            </div>
            <div className='contenedor_listas_creadas'>
                {listas.length == 0 ? (<h2>No tienes listas todavía. Crea una!</h2>) :
                    (listas.map(lista => { return (<ListaGrandeUser key={lista.id} id={lista.id} titulo={lista.titulo} descripcion={lista.descripcion} privacidad={lista.esPublica} show_privacidad={true}> </ListaGrandeUser>) }))

             
            </div>

        </div>
    );
};

export default ListasUser;
