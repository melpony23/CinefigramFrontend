import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReviewCard.css';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import {StarRating} from './starRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment, faEdit } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";


export const ReviewCard = (props) => {
    const navigate = useNavigate();
    const userImg = props.userImg
    const id = props.id
    const clickfunction = props.clickfunction
    const movieImg = props.movieImg
    const movieId = props.movieId
    const rating = props.rating
    const title = props.title
    const fecha = props.fecha
    const userId = props.userId
    const estado = props.estado
    const text = props.text
    const [like, setLike] = useState(2302);
    const [isLike, setIsLike] = useState(false);
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




    const onLikeButtonClick = () => {
        setLike(like + (isLike? -1 : 1));
        setIsLike(!isLike);
      };

      const handleEditClick = () => {
        console.log("hol")
        if (userId == localStorage.getItem("userId")) {
            navigate(`/review/${id}`);
        } else {
            alert("Solo puedes editar Reviews tuyas");
        }
    };


    return (
    <div className="review-container" onClick={() => clickfunction(movieId)}>
        <img src={movie_info.imagen} alt="Movie" className="movie-image" />
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
                    <FontAwesomeIcon icon={faComment} />
                    <p className="number-like">205</p>
                </div>
                <div className="flex-item">
                    <FontAwesomeIcon
                    icon={isLike? faHeartSolid : faHeartRegular}
                    onClick={onLikeButtonClick}
                    style={{ cursor: "pointer", color: isLike ? "#BC2528" : "#BC2528"}}
                    />
                    <p className="number-action">{like}</p>
                </div>
                <div className="edit-section">
                    <div className="fecha-container">
                        {estado}
                        {fecha}
                    </div>
                    <div className="review-botones">
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={handleEditClick}
                                style={{ cursor: "pointer", color: "#000", marginRight: "10px" }}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={handleDeleteClick}
                                style={{ cursor: "pointer", color: "#000" }}
                            />
                        </div>
                </div>
            </div>
        </div>
    </div>
    );
};
