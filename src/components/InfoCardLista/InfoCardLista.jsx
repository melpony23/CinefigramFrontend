import PropTypes from 'prop-types';
import { useState } from 'react';
import './InfoCardLista.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown as ThumbsDownSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as ThumbsDownRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as ThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as ThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';

const InfoCardLista = ({ autor, likes, dislikes, num_peliculas }) => {
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

            <div className='div_num_peliculas'>
                <p className='info_lista'>{num_peliculas} movies</p>
            </div>
        </div>
    );
};

// Definir PropTypes para las propiedades esperadas
InfoCardLista.propTypes = {
    autor: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    num_peliculas: PropTypes.number.isRequired,
};

export default InfoCardLista;
