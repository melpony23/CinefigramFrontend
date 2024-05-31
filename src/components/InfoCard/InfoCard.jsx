import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './InfoCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

const InfoCard = () => {
    const [like, setLike] = useState(2302);
    const [isLike, setIsLike] = useState(false);
  
    const onLikeButtonClick = () => {
      setLike(like + (isLike? -1 : 1));
      setIsLike(!isLike);
    };
  
    return (
      <Card className="info-card">
        <Card.Body>
          <div className="flex-container">
            <div className="flex-item">
              <h5 className="title-card">Lista Popular</h5>
              <p>By Kate</p>
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
              <FontAwesomeIcon icon={faComment} />
              <p className="number-like">205</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };
  
export default InfoCard;
