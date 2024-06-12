import React, { useState } from 'react';
import './InfoCardLista.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown as ThumbsDownSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as ThumbsDownRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as ThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as ThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';

const InfoCardLista = (props) => {
    const { autor, likes, dislikes, num_peliculas } = props;

    const [like, setLike] = useState(likes);
    const [isLike, setIsLike] = useState(false);

    const [dislike, setDislike] = useState(dislikes);
    const [isDislike, setIsDislike] = useState(false);


    const onLikeButtonClick = () => {
        setLike(like + (isLike ? -1 : 1));
        setIsLike(!isLike);
    };

    const onDislikeButtonClick = () => {
        setDislike(dislike + (isDislike ? -1 : 1));
        setIsDislike(!isDislike);
    };

    return (
        <div className='content_info_card_lista'>
            <div className='div_autor_lista'>
                <p className='info_lista autor'>{autor}</p>
            </div>
            <div className='div_like_lista'>
                <FontAwesomeIcon icon={isLike ? ThumbsUpSolid : ThumbsUpRegular}
                    onClick={onLikeButtonClick}
                    style={{ color: "#f6ae2d", cursor: "pointer", paddingRight: '10%' }} />
                <p className='info_lista'>{like}</p>
            </div>
            <div className='div_dislike_lista'>
                <FontAwesomeIcon icon={isDislike ? ThumbsDownSolid : ThumbsDownRegular}
                    onClick={onDislikeButtonClick}
                    style={{ color: "#f6ae2d", cursor: "pointer", paddingRight: '10%' }} />
                <p className='info_lista'>{dislike}</p>
            </div>
            <div className='div_num_peliculas'>
                <p className='info_lista'>{num_peliculas} movies</p>
            </div>
        </div>
    );
};

export default InfoCardLista;
