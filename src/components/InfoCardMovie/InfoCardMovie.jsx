import { useState } from 'react';
import './InfoCardMovie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

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
                icon={faStarSolid}
                onClick={onLikeButtonClick}
                style={{color: "#BC2528"}}
                />
                <p className="number-action">{like}</p>
            </div>
        </div>
    );
};

export default InfoCardMovie;
