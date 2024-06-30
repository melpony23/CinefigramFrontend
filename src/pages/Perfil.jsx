import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './Perfil.css';
import axios from 'axios';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import Logro from '../components/Logro/Logro';
import djangoPoster from '../../assets/django.png';
import bohemianRhapsodyPoster from '../../assets/bohemian-rhapsody.jpg';
import ReviewCard from '../components/ReviewCard/ReviewCard'; // Asegúrate de importar ReviewCard desde la ubicación correcta
import VITE_BACKEND_URL from "/config";

export const Perfil = () => {
    const [username, setUsername] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const { token } = useContext(AuthContext);
    const [logros, setLogros] = useState([]);
    const [gotLogros, setGotLogros] = useState(false);
    const { id } = useParams();
    const movie = bohemianRhapsodyPoster;
    const [listas, setListas] = useState([]);
    const [gotListas, setGotListas] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedFotoPerfil = localStorage.getItem('fotoPerfil');
        const storedDescripcion = localStorage.getItem('descripcion');

        if (storedUsername) setUsername(storedUsername);
        if (storedFotoPerfil) setFotoPerfil(storedFotoPerfil);
        if (storedDescripcion) setDescripcion(storedDescripcion);
    }, []);

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
                    setGotListas(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getListas();
    }, [id, gotListas]);

    useEffect(() => {
        const config_get_logros = {
            method: 'get',
            url: `${VITE_BACKEND_URL}users/${id}/logros`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        const getLogros = async () => {
            if (!gotLogros) {
                try {
                    const response = await axios(config_get_logros);
                    setLogros(response.data);
                    setGotLogros(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getLogros();
    }, [id, gotLogros, token]);

    return (
        <div className='fondo-perfil'>
            <div className="perfil">
                <div className="banner-perfil">
                    {fotoPerfil && (
                        <div className="foto-perfil">
                            <img src={fotoPerfil} alt="Foto de perfil" />
                        </div>
                    )}
                    <div className="info-usuario">
                        <h1>{username}</h1>
                        <div className="stats">
                            <p>Reviews: 10</p>
                            <p>Seguidores: 20</p>
                            <p>Seguidos: 15</p>
                        </div>
                        <br></br>
                        <div>
                            <p>{descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h4 className='font-custome-tittle card-title'>Logros de {username}</h4>
            <div className='contenedor_logros'>
                {logros.length === 0 ? (<h2>No tienes logros todavía</h2>) :
                    (logros.map(logro => (<Logro key={logro.id} titulo={logro.titulo} logo={logro.logo} />)))
                }
            </div>
            <h4 className='font-custome-tittle card-title'>Reviews de {username}</h4>
            <div className='carrusel-reviews'>
                <div className='div_contenedor_reviews2'>
                    <ReviewCard
                        movieImg={movie}
                        username={username}
                        userImg={fotoPerfil}
                        title="Muy buena la pelicula!"
                        rating={4}
                        text="Muy buena pelicula. El final no me lo esperaba."
                        fecha="12-06-2024"
                    />
                    <ReviewCard
                        movieImg={djangoPoster}
                        username={username}
                        userImg={fotoPerfil}
                        title="De lo mejor del Director"
                        rating={5}
                        text="Todo lo que uno esperaria de una pelicula de tarantino, buena accion, buena trama y buenos personajes. De lo mejor que tiene el director."
                        fecha="12-06-2024"
                    />
                    <ReviewCard
                        movieImg={movie}
                        username={username}
                        userImg={fotoPerfil}
                        title="Muy buena la pelicula!"
                        rating={4}
                        text="Muy buena pelicula. El final no me lo esperaba, quien diria que freddie mercury muere."
                        fecha="12-06-2024"
                    />
                </div>
            </div>
            <h4 className='font-custome-tittle card-title'>Listas de {username}</h4>
            <div className='contenedor-playlist-perfil'>
                {listas.length === 0 ? (<h2>No tienes listas todavía. Crea una!</h2>) :
                    (listas.map(lista => (<ListaGrande_Card key={lista.id} id={lista.id} titulo={lista.titulo} autor={username} likes={2} dislikes={2} descripcion={lista.descripcion} />)))
                }
            </div>
        </div>
    );
};

export default Perfil;

