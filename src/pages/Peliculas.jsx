import React, { useState, useEffect } from 'react';
import "./Peliculas.css"
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../components/MovieList/MovieList';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";

export const Peliculas = () => {
    const [movies, setMovies] = useState([]);
    const [gotPeliculas, setGot] = useState(false);

    const [moviesDestacadas, setMoviesDestacadas] = useState([]);
    const [gotPeliculasDestacadas, setGotDestacadas] = useState(false);

    const config_get_peliculas_destacadas = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        url: `${VITE_BACKEND_URL}peliculas/populares`,
    }

    const config_get_peliculas = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        url: `${VITE_BACKEND_URL}peliculas`,
    }

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
        }
        getData();
    }, [])



    return (
        <div className="peliculas-container">
            <div className='search-bar'>
                <SearchBar />
            </div>
            <h4 className='card-title-peliculas'>Peliculas destacadas</h4>
            <hr className='decorator-separator-movie decorator-separator-movie-red' />
            <div className='contenedor-pelicula'>
                <div className='peliculas-destacadas'>
                    <MovieList movies={moviesDestacadas} />
                </div>
            </div>
            <h5 className='card-title-peliculas-h5'>Peliculas variadas </h5>
            <hr className='decorator-separator-movie decorator-separator-movie-red' />
            <div className='contenedor-pelicula'>
                <div className='peliculas-variadas'>
                    <MovieList movies={movies} />
                </div>
            </div>
        </div>
    );
};

export default Peliculas;
