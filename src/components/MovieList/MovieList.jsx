import './MovieList.css';
import InfoCardMovie from '../InfoCardMovie/InfoCardMovie';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

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
                        {/* Aquí se pasa la película y su ranking */}
                        <InfoCardMovie movie={movie} ranking={movie.ranking} />
                    </div>
                ))}
            </div>
        </div>
    );
};

MovieList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired, 
        imagen: PropTypes.string.isRequired, 
        Title: PropTypes.string,
        ranking: PropTypes.number.isRequired // Añade ranking como requerido
    })).isRequired
};

export default MovieList;
