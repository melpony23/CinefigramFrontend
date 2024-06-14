import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './starRating.css'; 

export const StarRating = (props) => {
    const rating = props.rating;

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        return (
          <span key={index} className={index < rating ? 'star filled' : 'star'}>★</span>
        );
      })}
    </div>
  );
};


