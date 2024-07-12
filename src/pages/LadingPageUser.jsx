import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPageUser.css';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import ListaChica_Card from '../components/ListaChica-Card/ListaChica-Card';
import MovieList from '../components/MovieList/MovieList';

export const LandingPageUser = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const [movies, setMovies] = useState([]);
    const [gotPeliculas, setGotPeliculas] = useState(false);
    const [username, setUsername] = useState(null);

    const [moviesDestacadas, setMoviesDestacadas] = useState([]);
    const [gotPeliculasDestacadas, setGotPeliculasDestacadas] = useState(false);

    const [listas, setListas] = useState([]);
    const [gotListas, setGotListas] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (!gotPeliculasDestacadas) {
                try {
                    const response = await axios.get(`${VITE_BACKEND_URL}peliculas/populares`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });
                    setMoviesDestacadas(response.data);
                    setGotPeliculasDestacadas(true);
                } catch (error) {
                    console.log(error);
                    setError(true);
                }
            }
        };

        getData();
    }, [gotPeliculasDestacadas]);

    useEffect(() => {
        const getData = async () => {
            if (!gotPeliculas) {
                try {
                    const response = await axios.get(`${VITE_BACKEND_URL}peliculas`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    setMovies(response.data);
                    setGotPeliculas(true);
                } catch (error) {
                    console.log(error);
                    setError(true);
                }
            }
        };

        getData();
    }, [gotPeliculas]);

    useEffect(() => {
        const getData = async () => {
            if (!gotListas) {
                try {
                    const response = await axios.get(`${VITE_BACKEND_URL}playlists/`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    setListas(response.data);
                    setGotListas(true);
                } catch (error) {
                    console.log(error);
                    setError(true);
                }
            }
        };

        getData();
    }, [gotListas]);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}scope/protecteduser`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                console.log('Usuario logueado:', response.data);
                const username = localStorage.getItem('username');
                if (username) {
                    setUsername(username);
                }
            } catch (error) {
                console.log('Error al verificar login:', error);
                setError(true);
                navigate('/login');
            }
        };

        checkLoggedIn();
    }, [token, navigate]);

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
                    <hr className='decorator-separator decorator-separator-red' />
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
                            {listas.length === 0 ? (
                                <h2>No hay listas para mostrar</h2>
                            ) : (
                                listas[0] && <ListaChica_Card id={listas[0].id} titulo={listas[0].titulo} likes={2} dislikes={2} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
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
                            {listas.length < 2 ? (
                                <h2>No hay listas para mostrar</h2>
                            ) : (
                                listas[1] && <ListaChica_Card id={listas[1].id} titulo={listas[1].titulo} likes={2} dislikes={2} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};

export default LandingPageUser;