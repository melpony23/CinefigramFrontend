import React, { useState } from 'react';
import './InfoCardMovie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const InfoCardMovie = () => {
    const [like, setLike] = useState(2302);
    const [isLike, setIsLike] = useState(false);
  
    const onLikeButtonClick = () => {
      setLike(like + (isLike? -1 : 1));
      setIsLike(!isLike);
    };
  
    return (
        <div className="flex-container">
        <div className="flex-item">
            <FontAwesomeIcon icon={faComment} />
            <p className="number-like">205</p>
        </div>
        <div className="flex-item">
            <FontAwesomeIcon
            icon={isLike? faHeartSolid : faHeartRegular}
            onClick={onLikeButtonClick}
            style={{ cursor: "pointer" }}
            />
            <p className="number-like">{like}</p>
        </div>
        <div className="flex-item">
            <FontAwesomeIcon icon={faPaperPlane} />
            <p className="number-like">205</p>
        </div>
        </div>
    );
  };
  
export default InfoCardMovie;