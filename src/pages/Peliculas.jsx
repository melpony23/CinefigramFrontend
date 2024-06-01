import React, { useState } from 'react';
import "./Peliculas.css"
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../components/MovieList/MovieList';
import bohemianRhapsodyPoster from '../../assets/bohemian-rhapsody.jpg';
import djangoPoster from '../../assets/django.png';
import bladeRunnerPoster from '../../assets/blade-runner.png';
import missSunshinePoster from '../../assets/miss-sunshine.png';
import ameliePoster from '../../assets/amelie.png';

export const Peliculas = () => {
    const [movies, setMovies] = useState([
        {   
            key: 1, 
            Title: 'Bohemian rhapsody',
            Year: '2018',
            Type: 'movie',
            Poster: bohemianRhapsodyPoster
        },
        {
            key: 2, 
            Title: 'Django',
            Year: '2012',
            Type: 'movie',
            Poster: djangoPoster
        },
        {
            key: 3, 
            Title: 'Blade Runner 2049',
            Year: '2017',
            Type: 'movie',
            Poster: bladeRunnerPoster
        },
        {
            key: 4, 
            Title: 'Little miss sunshine',
            Year: '2006',
            Type: 'movie',
            Poster: missSunshinePoster
        },
        {
            key: 5, 
            Title: 'Amelie',
            Year: '2001',
            Type: 'movie',
            Poster: ameliePoster
        },
        {   
            key: 6, 
            Title: 'Bohemian rhapsody',
            Year: '2018',
            Type: 'movie',
            Poster: bohemianRhapsodyPoster
        },
        {
            key: 7, 
            Title: 'Django',
            Year: '2012',
            Type: 'movie',
            Poster: djangoPoster
        },
        {
            key: 8, 
            Title: 'Blade Runner 2049',
            Year: '2017',
            Type: 'movie',
            Poster: bladeRunnerPoster
        },
        {
            key: 9, 
            Title: 'Little miss sunshine',
            Year: '2006',
            Type: 'movie',
            Poster: missSunshinePoster
        },
        {
            key: 10, 
            Title: 'Amelie',
            Year: '2001',
            Type: 'movie',
            Poster: ameliePoster
        },
    ]);

    return (
        <div className="peliculas-container">
            <div className='search-bar'>
                <SearchBar />
            </div>
            <h4 className='card-title-peliculas'>Peliculas destacadas</h4>
            <hr className='decorator-separator-movie decorator-separator-movie-red'/>
            <div className='contenedor-pelicula'>
                <div className='peliculas-destacadas'>
                    <MovieList movies={movies} />
                </div>
            </div>
            <h5 className='card-title-peliculas-h5'>Peliculas variadas </h5>
            <hr className='decorator-separator-movie decorator-separator-movie-red'/>
            <div className='contenedor-pelicula'>
                <div className='peliculas-variadas'>
                    <MovieList movies={movies} />
                </div>
            </div>
        </div>
    );
};

export default Peliculas;
