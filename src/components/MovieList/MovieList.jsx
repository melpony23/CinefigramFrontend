import './MovieList.css';
import InfoCardMovie from '../InfoCardMovie/InfoCardMovie';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Importa PropTypes

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

// Define PropTypes para el componente
MovieList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired, 
        imagen: PropTypes.string.isRequired, 
        Title: PropTypes.string 
    })).isRequired
};

export default MovieList;
