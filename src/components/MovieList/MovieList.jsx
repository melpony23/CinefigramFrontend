import React from 'react';
import './MovieList.css';
import InfoCardMovie from '../InfoCardMovie/InfoCardMovie';
import { useNavigate } from "react-router-dom";

const MovieList = ({ movies }) => {
    const navigate = useNavigate();

    function handlePosterClick(id) {
        navigate(`/pelicula/${id}`);
    }

    return (
        <div className="movie-app">
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-item">
                        <div className="poster-container" onClick={() => handlePosterClick(movie.id)}>
                            <img src={movie.imagen} alt={movie.Title} className="movie-poster" />
                        </div>
                        <br></br>
                        <InfoCardMovie movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
