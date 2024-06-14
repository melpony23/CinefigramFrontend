import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./LandingPage.css";
import MovieList from '../components/MovieList/MovieList';
import InfoCard from '../components/InfoCard/InfoCard';
import playlistImage from '../../assets/portada_playlist.png';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";

export const LandingPage = () => {
    const [movies, setMovies] = useState([]);
    const [gotPeliculas, setGot] = useState(false);

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

    return (
        <div className="landing-page-container">
            <div className='portada_img'>
                <div className='card-presentation'>
                    <h1>Cinefigram</h1>
                    <h3 className='text-align-center'>La red social para los amantes del cine</h3>
                    <center>
                        <Link to="/sign-up">
                            <button className="cssbuttons-io">
                                <span>Únete hoy!</span>
                            </button>
                        </Link>
                    </center>
                </div>
            </div>
            <div className='grid-container'>
                <div className='grid-item1'>
                    <h4 className='font-custome-tittle card-title'>Películas destacadas</h4>
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
                        <img src={playlistImage} alt='playlist-png' className="playlist-png" />
                        <InfoCard />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LandingPage;
