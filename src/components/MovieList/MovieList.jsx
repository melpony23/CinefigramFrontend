import React from 'react';
import './MovieList.css';

const MovieList = ({ movies }) => {
    return (
        <div className="movie-app">
            {movies.map((movie) => (
                <div key={movie.key} className="movie-poster">
                    <img src={movie.Poster} alt={movie.Title}  className="movie-poster"/>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
