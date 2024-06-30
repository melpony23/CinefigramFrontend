import { useState, useEffect } from 'react';
import './InfoCardMovie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios'; // Importa axios para hacer llamadas HTTP
import PropTypes from 'prop-types';
import VITE_BACKEND_URL from '/config'; // Asegúrate de importar la URL correcta de tu backend

const InfoCardMovie = ({ ranking, movie }) => {
    const [like, setLike] = useState(2302);
    const [isLike, setIsLike] = useState(false);
    const [numReviews, setNumReviews] = useState(0); // Estado para almacenar el número de reviews

    useEffect(() => {
        const fetchReviewCount = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}reviews/count/${movie.id}`);
                setNumReviews(response.data.count);
            } catch (error) {
                console.error('Error fetching review count:', error);
            }
        };

        fetchReviewCount();
    }, [movie.id]);

    const onLikeButtonClick = () => {
        setLike(like + (isLike ? -1 : 1));
        setIsLike(!isLike);
    };

    // Truncar el ranking a un decimal
    const truncatedRanking = Number(ranking).toFixed(1);

    return (
        <div className="flex-container">
            <div className="flex-item">
                <FontAwesomeIcon icon={faComment} />
                <p className="ranking-movie">{numReviews}</p>
            </div>
            <div className="flex-item">
                <FontAwesomeIcon
                    icon={faStarSolid}
                    onClick={onLikeButtonClick}
                    style={{ color: "#F6AE2D" }}
                />
                <p className="ranking-movie">{truncatedRanking}</p>
            </div>
        </div>
    );
};

InfoCardMovie.propTypes = {
    ranking: PropTypes.number.isRequired,
    movie: PropTypes.object.isRequired // Asegúrate de definir correctamente el tipo de prop para movie
};

export default InfoCardMovie;

