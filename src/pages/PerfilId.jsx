import { useState, useEffect } from 'react';
import './Perfil.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VITE_BACKEND_URL from "/config";
import ReviewCard from '../components/ReviewCard/ReviewCard';
import djangoPoster from '../../assets/django.png';
import bohemianRhapsodyPoster from '../../assets/bohemian-rhapsody.jpg';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import PortadaPlaylist from '../../assets/portada_playlist.png';

export const PerfilId = () => {
    const id = useParams().id;
    const [username, setUsername] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const movie = bohemianRhapsodyPoster;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}userPublic/${id}`);
                setUsername(response.data.username);
                setFotoPerfil(response.data.fotoPerfil);
                setDescripcion(response.data.descripcion);
            } catch (error) {
                console.log(error);
                // Manejar errores o actualizar estado en caso de error
            }
        };

        fetchUserData();

    }, [id]);

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

export default PerfilId;
