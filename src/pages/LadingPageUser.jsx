import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Mueve esto dentro del componente
import './LandingPageUser.css';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import ListaChica_Card from '../components/ListaChica-Card/ListaChica-Card';
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

    const [moviesDestacadas, setMoviesDestacadas] = useState([]);
    const [gotPeliculasDestacadas, setGotDestacadas] = useState(false);

    const [listas, setListas] = useState([]);
    const [gotListas, setGotListas] = useState(false);

    const config_get_peliculas_destacadas = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        url: `${VITE_BACKEND_URL}peliculas/populares`,
        withCredentials: true // Asegura que las credenciales se envíen con la solicitud
    };

    useEffect(() => {
        const getData = async () => {
            if (!gotPeliculasDestacadas) {

                try {
                    const peliculas = await axios(config_get_peliculas_destacadas);
                    setMoviesDestacadas(peliculas.data);
                    setGotDestacadas(true);

                } catch (error) {
                    console.log(error);
                }
            }
        }
        getData();
    }, [])

    const config_get_peliculas = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        url: `${VITE_BACKEND_URL}peliculas`,
    }

    useEffect(() => {
        const getData = async () => {
            if (!gotPeliculas) {
                try {
                    const peliculas = await axios(config_get_peliculas);
                    setMovies(peliculas.data);

                    setGot(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getData();
    }, []);

    const config_get_listas = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/`,
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
        const config = {
            method: 'get',
            url: `${VITE_BACKEND_URL}scope/protecteduser`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true // Asegura que las credenciales se envíen con la solicitud
        };

        axios(config)
            .then((response) => {
                console.log('Enviaste un token bueno y estás logueado');
                console.log(response);
            })
            .catch((error) => {
                console.log('Hubo un error, no estás logueado');
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

                    <h4 className='font-custome-tittle card-title'>Películas que te podrían gustar</h4>
                    <hr className='decorator-separator decorator-separator-red'/>

                    <div>
                        <div className='movie-row'>
                            <MovieList movies={moviesDestacadas} />
                        </div>
                    </div>
                </div>
                <div className='grid-item2'>
                    <div className='playlist-row'>
                        <h4 className='font-custome-tittle card-title-2'>Listas populares</h4>
                        <hr className='decorator-separator-2 decorator-separator-yellow' />
                        <div>
                            {listas.length == 0 ? (<h2>No hay listas para mostrar</h2>) :
                                (<ListaChica_Card id={listas[0].id} titulo={listas[0].titulo} likes={2} dislikes={2} > </ListaChica_Card>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className='grid-container'>
                <div className='grid-item1'>
                    <h4 className='font-custome-tittle card-title'>Películas agregadas recientemente</h4>
                    <hr className='decorator-separator decorator-separator-red' />
                    <div>
                        <div className='movie-row'>
                            <MovieList movies={movies} />
                        </div>
                    </div>
                </div>
                <div className='grid-item2'>
                    <div className='playlist-row'>
                        <h4 className='font-custome-tittle card-title-2'>Listas populares</h4>
                        <hr className='decorator-separator-2 decorator-separator-yellow' />
                        <div>
                            {listas.length == 0 ? (<h2>No hay listas para mostrar</h2>) :
                                (<ListaChica_Card id={listas[1].id} titulo={listas[1].titulo} likes={2} dislikes={2} > </ListaChica_Card>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>

        </div>
    );
};

export default LandingPageUser;
