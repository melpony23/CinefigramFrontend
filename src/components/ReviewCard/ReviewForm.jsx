import React, { useState, useEffect } from 'react';
import { StarRatingForm } from './starRatingForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReviewForm.css';

const ReviewForm = ({ movieId, submitfunction, reviewData }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (reviewData) {
        setTitle(reviewData.titulo);
        setText(reviewData.texto);
        setRating(reviewData.calificacion);
    }
}, [reviewData]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitfunction({ title, text, rating });
    setTitle('');
    setText('');
    setRating(0);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="text">Texto</label>
        <textarea
          className="form-control"
          id="text"
          value={text}
          onChange={handleTextChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Rating</label>
        <StarRatingForm rating={rating} onRatingChange={handleRatingChange} />
      </div>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
};

export default ReviewForm;