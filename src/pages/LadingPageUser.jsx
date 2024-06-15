import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Mueve esto dentro del componente
import './LandingPageUser.css';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";

import MovieList from '../components/MovieList/MovieList';
import InfoCard from '../components/InfoCard/InfoCard';
import playlistImage from '../../assets/portada_playlist.png';

export const LandingPageUser = () => {
    const { token } = useContext(AuthContext); // Asegúrate de que AuthContext esté definido correctamente
    const navigate = useNavigate(); // Debe estar dentro del componente
    const [error, setError] = useState(false);

    const [movies, setMovies] = useState([]);
    const [gotPeliculas, setGot] = useState(false);
    const [username, setUsername] = useState(null); 

    const config_get_peliculas = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        url: `${VITE_BACKEND_URL}peliculas/populares`,
    }

    useEffect(() => {
        const getData = async () => {
            if (!gotPeliculas) {

                try {
                    const peliculas = await axios(config_get_peliculas);
                    setMovies(peliculas.data);
                    console.log(peliculas.data);
                    setGot(true);

                } catch (error) {
                    console.log(error);
                }
            }
        }
        getData();
    }, [])

    useEffect(() => {
        const config = {
            method: 'get',
            url: '/api/scope/protecteduser',
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
                setError(true); // Establecer el estado de error
                navigate('/login'); // Redirigir al usuario si hay un error
            });
            
    }, [token, navigate]);

    useEffect(() => {
        // Obtener el nombre de usuario del localStorage
        const username = localStorage.getItem('username');

        // Actualizar username en el estado
        if (username) {
            setUsername(username);
        }

    }, []);

    // Si hay un error, renderiza un mensaje de error o redirige
    if (error) {
        return <div className="error-message">Error al cargar la página. Por favor, inténtelo de nuevo.</div>;
    }

    return (
        <div className="landing-page-container">
            <div className='portada_img_user'>
                <div className='card-presentation'>
                    <h1>Cinefigram</h1>
                    <h3 className='text-align-center'>La red social para los amantes del cine</h3>
                    <div className="terminal-loader">
                        <div className="terminal-header">
                            <div className="terminal-title">Status</div>
                            <div className="terminal-controls">
                            <div className="control close"></div>
                            <div className="control minimize"></div>
                            <div className="control maximize"></div>
                            </div>
                        </div>
                        <div className="text">Hola {username}!</div>
                    </div>
                </div>
            </div>
            <div className='grid-container'>
                <div className='grid-item1'>
                    <h4 className='font-custome-tittle card-title'>Películas que te podrian gustar</h4>
                    <hr className='decorator-separator decorator-separator-red'/>
                    <div>
                        <div className='movie-row'>
                            <MovieList movies={movies} />
                        </div>
                    </div>
                </div>
                <div className='grid-item2'>
                    <div className='playlist-row'>
                        <h4 className='font-custome-tittle card-title-2'>Listas populares</h4>
                        <hr className='decorator-separator-2 decorator-separator-yellow'/>
                        <img src={playlistImage} alt='playlist-png' className="playlist-png"/>
                        <InfoCard />
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='grid-container'>
                <div className='grid-item1'>
                    <h4 className='font-custome-tittle card-title'>Películas agregadas recientemente</h4>
                    <hr className='decorator-separator decorator-separator-red'/>
                    <div>
                        <div className='movie-row'>
                            <MovieList movies={movies} />
                        </div>
                    </div>
                </div>
                <div className='grid-item2'>
                    <div className='playlist-row'>
                        <h4 className='font-custome-tittle card-title-2'>Listas populares</h4>
                        <hr className='decorator-separator-2 decorator-separator-yellow'/>
                        <img src={playlistImage} alt='playlist-png' className="playlist-png"/>
                        <InfoCard />
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='grid-container'>
                <div className='grid-item1'>
                    <h4 className='font-custome-tittle card-title'>Películas que les gusta a tus amigos</h4>
                    <hr className='decorator-separator decorator-separator-red'/>
                    <div>
                        <div className='movie-row'>
                            <MovieList movies={movies} />
                        </div>
                    </div>
                </div>
                <div className='grid-item2'>
                    <div className='playlist-row'>
                        <h4 className='font-custome-tittle card-title-2'>Listas populares</h4>
                        <hr className='decorator-separator-2 decorator-separator-yellow'/>
                        <img src={playlistImage} alt='playlist-png' className="playlist-png"/>
                        <InfoCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPageUser;
