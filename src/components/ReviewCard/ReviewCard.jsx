import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReviewCard.css';
import {StarRating} from './starRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane as faPaperPlaneRegular } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane as faPaperPlaneSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';


export const ReviewCard = (props) => {
    const userImg = props.userImg
    const movieImg = props.movieImg
    const rating = props.rating
    const title = props.title
    const fecha = props.fecha
    const username = props.username
    const text = props.text
    const [like, setLike] = useState(2302);
    const [isLike, setIsLike] = useState(false);



    const onLikeButtonClick = () => {
        setLike(like + (isLike? -1 : 1));
        setIsLike(!isLike);
      };


    return (
    <div className="review-container">
        <img src={movieImg} alt="Movie" className="movie-image" />
        <div className="review-content">
            <div className="review-header">
                <img src={userImg} alt="User" className="user-image" />
                <h4 className="user-name">{username}</h4>
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
                <div className="fecha-container">
                        {fecha}
                </div>
            </div>
        </div>
    </div>
    );
};
