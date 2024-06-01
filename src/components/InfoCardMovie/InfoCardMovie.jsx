import React, { useState } from 'react';
import './InfoCardMovie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane as faPaperPlaneRegular } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane as faPaperPlaneSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import ModalSelectUser from '../ModalSelectUser/ModalSelectUser';

const InfoCardMovie = () => {
    const [like, setLike] = useState(2302);
    const [isLike, setIsLike] = useState(false);
    const [recommend, setRecommend] = useState(290);
    const [isRecommend, setIsRecommend] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        { id: 1, name: 'kate', imageUrl: 'https://avatars.githubusercontent.com/u/84293701?v=4' },
        { id: 2, name: 'melpony', imageUrl: 'https://avatars.githubusercontent.com/u/67890035?v=4'},
        { id: 3, name: 'vice', imageUrl: 'https://avatars.githubusercontent.com/u/127246624?v=4' },
    ];

    const onLikeButtonClick = () => {
      setLike(like + (isLike? -1 : 1));
      setIsLike(!isLike);
    };

    const onRecommendButtonClick = () => {
        setShowModal(true);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setShowModal(false);
        setRecommend(recommend + 1);
        setIsRecommend(true);
        alert(`Recomendación enviada a ${user.name}`);
    };

    const closeModal = () => {
        setShowModal(false);
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
            style={{ cursor: "pointer", color: isLike ? "#BC2528" : "#BC2528"}}
            />
            <p className="number-action">{like}</p>
        </div>
        <div className="flex-item">
            <FontAwesomeIcon
            icon={isRecommend? faPaperPlaneSolid : faPaperPlaneRegular}
            onClick={onRecommendButtonClick}
            style={{ cursor: "pointer", color: isRecommend ? "#1E90FF": "#1E90FF"}} />
            <p className="number-action">{recommend}</p>
            
        </div>
        {showModal && 
          <ModalSelectUser
            users={users} 
            onClose={closeModal} 
            onSelectUser={handleUserSelect} 
          />
        }
        </div>
    );
};

export default InfoCardMovie;
