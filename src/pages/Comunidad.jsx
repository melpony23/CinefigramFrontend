import React from 'react';
import "./Comunidad.css";
import SearchBar from '../components/SearchBar/SearchBar';
import {ReviewCard} from '../components/ReviewCard/ReviewCard';
import bohemianRhapsodyPoster from '../../assets/bohemian-rhapsody.jpg';
import djangoPoster from '../../assets/django.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import PortadaPlaylist from '../../assets/portada_playlist.png';

export const Comunidad = () => {
    const movie = bohemianRhapsodyPoster;
    const user = "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png";
    const famous_user = "https://forbes.es/wp-content/uploads/2017/05/20141114135148_1.jpg";
    const famous_user2 = "https://cdn.britannica.com/65/227665-050-D74A477E/American-actor-Leonardo-DiCaprio-2016.jpg";

    return (
        <div className='body_comunidad'>
            <div className='contenido_comunidad'>
            <div className='separator'></div>
                <div className='div_titulo_comunidad'>
                    <br></br>
                    <h1 className='titulo_comunidad'>
                        Cinefigram Community
                    </h1>
                    <hr className='decorator-separator-2-lista decorator-separator-yellow-lista' />
                </div>
                <div className='findUser-comunidad'>
                    <h1 className='titulo_findUser'>Buscar usuarios</h1>

                    <div className='search-bar_comunidad'>
                        <SearchBar />
                    </div>
                    <hr className='decorator-separator-2-lista decorator-separator-red-lista' />
                </div>
                <h1 className='titulo_findUser'>Verified users</h1>
                <div className='usuarios-famosos'>
                    <div className='usuario'>
                        <img src={famous_user2} alt='Usuario 1' />
                        <p>LeoDiCaprio<FontAwesomeIcon icon={faCheckCircle} style={{ color: '#F6AE2D', marginLeft: '5px' }} /></p>
                    </div>
                    <div className='usuario'>
                        <img src={famous_user} alt='Usuario 2' />
                        <p>quentinTarantino<FontAwesomeIcon icon={faCheckCircle} style={{ color: '#F6AE2D', marginLeft: '5px' }} /></p>
                    </div>
                    <div className='usuario'>
                        <img src={famous_user2} alt='Usuario 1' />
                        <p>LeoDiCaprio<FontAwesomeIcon icon={faCheckCircle} style={{ color: '#F6AE2D', marginLeft: '5px' }} /></p>
                    </div>
                    <div className='usuario'>
                        <img src={famous_user} alt='Usuario 2' />
                        <p>quentinTarantino<FontAwesomeIcon icon={faCheckCircle} style={{ color: '#F6AE2D', marginLeft: '5px' }} /></p>
                    </div>
                    <div className='usuario'>
                        <img src={famous_user2} alt='Usuario 1' />
                        <p>LeoDiCaprio<FontAwesomeIcon icon={faCheckCircle} style={{ color: '#F6AE2D', marginLeft: '5px' }} /></p>
                    </div>
                    <div className='usuario'>
                        <img src={famous_user} alt='Usuario 2' />
                        <p>quentinTarantino<FontAwesomeIcon icon={faCheckCircle} style={{ color: '#F6AE2D', marginLeft: '5px' }} /></p>
                    </div>
                </div>
                <hr className='decorator-separator-2-lista decorator-separator-red-lista' />
                
                <div className='div_reviews'>
                    <h1 className='titulo_seccion_reviews'> Reviews mas votadas</h1>
                    <div className='div_contenedor_reviews'>
                        <ReviewCard
                            movieImg={movie}
                            username = "vice"
                            userImg={user}
                            title="Muy buena la pelicula!"
                            rating={4}
                            text="Muy buena pelicula. El final no me lo esperaba."
                            fecha="12-06-2024"
                        />
                        <ReviewCard
                            movieImg={djangoPoster}
                            username = "vice"
                            userImg={user}
                            title="De lo mejor del Director"
                            rating={5}
                            text="Todo lo que uno esperaria de una pelicula de tarantino, buena accion, buena trama y buenos personajes. De lo mejor que tiene el director."
                            fecha="12-06-2024"
                        />
                        <ReviewCard
                            movieImg={movie}
                            username = "vice"
                            userImg={user}
                            title="Muy buena la pelicula!"
                            rating={4}
                            text="Muy buena pelicula. El final no me lo esperaba, quien diria que freddie mercury muere."
                            fecha="12-06-2024"
                        />
                        <ReviewCard
                            movieImg={djangoPoster}
                            username = "vice"
                            userImg={user}
                            title="De lo mejor del Director"
                            rating={5}
                            text="Todo lo que uno esperaria de una pelicula de tarantino, buena accion, buena trama y buenos personajes. De lo mejor que tiene el director."
                            fecha="12-06-2024"
                        />
                    </div>
                    <hr className='decorator-separator-2-lista decorator-separator-red-lista' />
                </div>
                <div className='div_playlists_comunidad'>
                    <h1 className='titulo_seccion_reviews'> Top Listas</h1>
                    <div className='contenedor-listas-destacadas'>
                            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15} descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
                            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15} descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
                            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15} descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
                            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15} descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
                        </div>
                </div>
                

            </div>
        </div>
    );
};

export default Comunidad;