import React, { useState } from 'react';
import "./LandingPage.css";
import MovieList from '../components/MovieList/MovieList';
import InfoCard from '../components/InfoCard/InfoCard';

export const LandingPage = () => {

    const [movies, setMovies] = useState([
        {   
            key: 1, 
            Title: 'Bohemian rhapsody',
            Year: '2018',
            Type: 'movie',
            Poster: 'src/assets/bohemian-rhapsody.jpg'
        },
        {
            key: 2, 
            Title: 'Django',
            Year: '2012',
            Type: 'movie',
            Poster: 'src/assets/django.png'
        },
        {
            key: 3, 
            Title: 'Blade Runner 2049',
            Year: '2017',
            Type: 'movie',
            Poster: 'src/assets/blade-runner.png'
        },
        {
            key: 4, 
            Title: 'Little miss sunshine',
            Year: '2006',
            Type: 'movie',
            Poster: 'src/assets/miss-sunshine.png'
        },
        {
            key: 5, 
            Title: 'Amelie',
            Year: '2001',
            Type: 'movie',
            Poster:'src/assets/amelie.png'
        },
        {   
            key: 6, 
            Title: 'Bohemian rhapsody',
            Year: '2018',
            Type: 'movie',
            Poster: 'src/assets/bohemian-rhapsody.jpg'
        },
        {
            key: 7, 
            Title: 'Django',
            Year: '2012',
            Type: 'movie',
            Poster: 'src/assets/django.png'
        },
        {
            key: 8, 
            Title: 'Blade Runner 2049',
            Year: '2017',
            Type: 'movie',
            Poster: 'src/assets/blade-runner.png'
        },
        {
            key: 9, 
            Title: 'Little miss sunshine',
            Year: '2006',
            Type: 'movie',
            Poster: 'src/assets/miss-sunshine.png'
        },
        {
            key: 10, 
            Title: 'Amelie',
            Year: '2001',
            Type: 'movie',
            Poster:'src/assets/amelie.png'
        }
    ]);

    return (
        <div className='landing'>
            <div className='portada_img'>
                <div className='card-presentation'>
                    <h1 className='font-custome-tittle'>Cinefigram</h1>
                    <h3>La red social para los amantes del cine</h3>
                    {/* button from: https://uiverse.io/adamgiebl/pink-chicken-70 */}
                    <button className="cssbuttons-io">
                        <span>Únete hoy!</span>
                    </button>
                </div>
            </div>
            <div className='grid-container'>
                {/* Contenido de Películas destacadas */}
                <div className='grid-item1'>
                    <h4 className='font-custome-tittle card-title'>Películas destacadas</h4>
                    <hr className='decorator-separator decorator-separator-red'/>
                    <div>
                        <div className='row'>
                            <MovieList movies={movies} />
                        </div>
                    </div>
                </div>
                {/* Contenido de Listas populares */}
                <div className='grid-item2'>
                    <h4 className='font-custome-tittle card-title-2'>Listas populares</h4>
                    <hr className='decorator-separator-2 decorator-separator-yellow'/>
                    <div>
                        <div className='playlist-row'> 
                            <img src='src/assets/portada_playlist.png' alt='playlist-png'  className="playlist-png"/>
                        </div>
                        <InfoCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
