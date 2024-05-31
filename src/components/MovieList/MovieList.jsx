import React from 'react';
import './MovieList.css';
import InfoCardMovie from '../InfoCardMovie/InfoCardMovie';

const MovieList = ({ movies }) => {
    return (
        <div className="movie-app">
            {movies.map((movie) => (
                <div key={movie.key} className="movie-poster">
                    <img src={movie.Poster} alt={movie.Title}  className="movie-poster"/>
                    <InfoCardMovie />
                    <br />
                </div>
            ))}
        </div>
    );
};

export default MovieList;
