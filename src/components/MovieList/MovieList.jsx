import React from 'react';
import './MovieList.css';
import InfoCardMovie from '../InfoCardMovie/InfoCardMovie';
import { useNavigate } from "react-router-dom";

const MovieList = ({ movies }) => {
    const navigate = useNavigate();

    function PosterClick({ id, children }) {
        return (
            <div onClick={() => { navigate(`/pelicula/${id}`) }} className="movie-poster">
                {children}
            </div>
        )
    }

    return (
        <div className="movie-app">
            {movies.map(movie => (
                <PosterClick key={movie.id} id={movie.id}>
                    <img src={movie.imagen} alt={movie.Title} className="movie-poster" />
                    <InfoCardMovie />
                    <br />
                </PosterClick>


            ))}
        </div>
    );
};

export default MovieList;
