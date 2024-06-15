import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Mueve esto dentro del componente
import './LandingPageUser.css';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

import MovieList from '../components/MovieList/MovieList';
import InfoCard from '../components/InfoCard/InfoCard';
import bohemianRhapsodyPoster from '../../assets/bohemian-rhapsody.jpg';
import djangoPoster from '../../assets/django.png';
import bladeRunnerPoster from '../../assets/blade-runner.png';
import missSunshinePoster from '../../assets/miss-sunshine.png';
import ameliePoster from '../../assets/amelie.png';
import playlistImage from '../../assets/portada_playlist.png';

export const LandingPageUser = () => {
    const { token } = useContext(AuthContext); // Asegúrate de que AuthContext esté definido correctamente
    const navigate = useNavigate(); // Debe estar dentro del componente

    const [movies, setMovies] = useState([
        // Inicializa tu estado aquí
        { key: 1, Title: 'Bohemian rhapsody', Year: '2018', Type: 'movie', Poster: bohemianRhapsodyPoster },
        { key: 2, Title: 'Django', Year: '2012', Type: 'movie', Poster: djangoPoster },
        { key: 3, Title: 'Blade Runner 2049', Year: '2017', Type: 'movie', Poster: bladeRunnerPoster },
        { key: 4, Title: 'Little miss sunshine', Year: '2006', Type: 'movie', Poster: missSunshinePoster },
        { key: 5, Title: 'Amelie', Year: '2001', Type: 'movie', Poster: ameliePoster },
        { key: 6, Title: 'Bohemian rhapsody', Year: '2018', Type: 'movie', Poster: bohemianRhapsodyPoster },
        { key: 7, Title: 'Django', Year: '2012', Type: 'movie', Poster: djangoPoster },
        { key: 8, Title: 'Blade Runner 2049', Year: '2017', Type: 'movie', Poster: bladeRunnerPoster },
        { key: 9, Title: 'Little miss sunshine', Year: '2006', Type: 'movie', Poster: missSunshinePoster },
        { key: 10, Title: 'Amelie', Year: '2001', Type: 'movie', Poster: ameliePoster },
    ]);

    const [error, setError] = useState(false);

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

    // Si hay un error, renderiza un mensaje de error o redirige
    if (error) {
        return <div className="error-message">Error al cargar la página. Por favor, inténtelo de nuevo.</div>;
    }

    return (
        <div className="landing-page-container">
            <div className='portada_img'>
                <div className='card-presentation'>
                    <h1>Cinefigram</h1>
                    <h3 className='text-align-center'>La red social para los amantes del cine</h3>
                </div>
            </div>
            <div className='grid-container'>
                <div className='grid-item1'>
                    <h4 className='font-custome-tittle card-title'>Películas destacadas</h4>
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
