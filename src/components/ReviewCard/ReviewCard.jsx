import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReviewCard.css';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import {StarRating} from './starRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment, faEdit } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Importa PropTypes


export const ReviewCard = (props) => {
    const navigate = useNavigate();
    const id = props.id
    const clickfunction = props.clickfunction
    const movieId = props.movieId
    const rating = props.rating
    const title = props.title
    const fecha = props.fecha
    const userId = props.userId
    const estado = props.estado
    const text = props.text
    const [user_info, setUser_info] = useState([]);
    const [gotUser_info, setGot] = useState(false);
    const [movie_info, setMovie_info] = useState([]);
    const [gotMovie_info, setGotMovie] = useState(false);
    

    useEffect(() => {
        const getUser_info = async () => {
            try {
                const userResponse = await axios.get(`${VITE_BACKEND_URL}userPublic/${userId}`);
                setUser_info(userResponse.data);
                setGot(true);
            } catch (error) {
                console.log(error);
            }
        }

        if (userId && !gotUser_info) {
            getUser_info();
            }
        }, [userId, gotUser_info]);

    const handleDeleteClick = () => {
        props.deletefunction(props.id); //ESTA EN PELICULAPAGE
    };

    useEffect(() => {
        const getMovie_info = async () => {
            try {
                const movieResponse = await axios.get(`${VITE_BACKEND_URL}peliculas/unica/${movieId}`);
                setMovie_info(movieResponse.data);
                setGotMovie(true);
            } catch (error) {
                console.log(error);
            }
        }

        if (!gotMovie_info) {
            getMovie_info();
            }
        }, [movieId,gotMovie_info]);


      const handleEditClick = () => {
        if (userId == localStorage.getItem("userId")) {
            navigate(`/review/${id}`);
        } else {
            alert("Solo puedes editar Reviews tuyas");
        }
    };

    const handleCommentClick = () => {
        navigate(`/Comments/${id}`);
    }


    return (
    <div className="review-container" >
        <img src={movie_info.imagen} onClick={() => clickfunction(movieId)} alt="Movie" className="movie-image" 
        style={{ cursor: "pointer", color: "#000", marginRight: "10px" }}/>
        <div className="review-content">
            <div className="review-header">
                <img src={user_info.fotoPerfil} alt="User" className="user-image" />
                <h4 className="user-name">{user_info.username}</h4>
                <div className="header-right">
                    <h3 className="review-title">{title}</h3>
                </div>
                <div className="review-rating">
                        <StarRating rating={rating} />
                    </div>
            </div>
            <div className="review-text">
                {text}
            </div>
            <div className="review-footer">
                <div className="flex-item">
                    <FontAwesomeIcon icon={faComment} onClick={handleCommentClick}
                    style={{ cursor: "pointer", color: "#000", marginRight: "10px" }}/>
                    <p className="number-like">Ver comentarios</p>
                </div>
                <div className="edit-section">
                    <div className="fecha-container">
                        {estado}
                        {fecha}
                    </div>
                    <div className="review-botones">
                        <div className="flex-item">
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={handleEditClick}
                                style={{ cursor: "pointer", color: "#000", marginRight: "10px" }}
                            />
                            <p className="number-like">Editar</p>
                            </div>
                            <div className="flex-item">
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={handleDeleteClick}
                                style={{ cursor: "pointer", color: "#000" }}
                            />
                            <p className="number-like">Delete</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    );
};

ReviewCard.propTypes = {
    userImg: PropTypes.string,
    id: PropTypes.number,
    clickfunction: PropTypes.func,
    movieImg: PropTypes.string,
    movieId: PropTypes.number,
    rating: PropTypes.number,
    title: PropTypes.string,
    fecha: PropTypes.string,
    userId: PropTypes.number,
    estado: PropTypes.string,
    text: PropTypes.string,
    deletefunction: PropTypes.func,
};


export default ReviewCard;