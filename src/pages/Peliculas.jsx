import React, { useState, useEffect } from 'react';
import "./Peliculas.css";
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../components/MovieList/MovieList';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";

export const Peliculas = () => {
    const [movies, setMovies] = useState([]);
    const [gotPeliculas, setGot] = useState(false);
    const [moviesDestacadas, setMoviesDestacadas] = useState([]);
    const [gotPeliculasDestacadas, setGotDestacadas] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getData = async () => {
            if (!gotPeliculasDestacadas) {
                try {
                    const peliculas = await axios.get(`${VITE_BACKEND_URL}peliculas/populares`);
                    setMoviesDestacadas(peliculas.data);
                    setGotDestacadas(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            if (!gotPeliculas) {
                try {
                    const peliculas = await axios.get(`${VITE_BACKEND_URL}peliculas`);
                    setMovies(peliculas.data);
                    setGot(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getData();
    }, []);

    const handleSearch = async (searchTerm) => {
        setSearchTerm(searchTerm);
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}peliculas/search?search=${searchTerm}`);
            setSearchResults(response.data);
            setSearched(true);
        } catch (error) {
            console.error('Error al buscar películas:', error);
            setSearchResults([]);
            setSearched(true);
        }
    };

    const renderMovies = () => {
        if (searched && searchResults.length === 0) {
            return <p>No se encontraron películas</p>;
        } else if (searched) {
            return <MovieList movies={searchResults} />;
        } else {
            return <MovieList movies={movies} />;
        }
    };

    return (
        <div className="peliculas-container">
            <div className='search-bar'>
                <SearchBar onSearch={handleSearch} />
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
                    {renderMovies()}
                </div>
            </div>
        </div>
    );
};

export default Peliculas;
