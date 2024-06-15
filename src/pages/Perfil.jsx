import React, { useState, useEffect, useContext} from 'react';
import { AuthContext } from '../auth/AuthContext';
import './Perfil.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Comunidad.css";
import { ReviewCard } from '../components/ReviewCard/ReviewCard';
import djangoPoster from '../../assets/django.png';
import bohemianRhapsodyPoster from '../../assets/bohemian-rhapsody.jpg';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import PortadaPlaylist from '../../assets/portada_playlist.png';

export const Perfil = () => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [error, setError] = useState(false);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const movie = bohemianRhapsodyPoster;

    useEffect(() => {
        const config = {
            method: 'get',
            url: `/api/scope/protecteduser`,
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

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storedFotoPerfil = localStorage.getItem('fotoPerfil');
        const storedDescripcion = localStorage.getItem('descripcion');

        if (storedUsername) setUsername(storedUsername);
        if (storedEmail) setEmail(storedEmail);
        if (storedFotoPerfil) setFotoPerfil(storedFotoPerfil);
        if (storedDescripcion) setDescripcion(storedDescripcion);
    }, []);

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
            <br></br>
            <p className='align-left'>--------------- Por implementar -------------------</p>
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
            <div className='contenedor-playlis-perfil'>
            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={username} likes={200} dislikes={2} num_peliculas={15} 
            descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
            </div>
        </div>
    );
};

export default Perfil;
