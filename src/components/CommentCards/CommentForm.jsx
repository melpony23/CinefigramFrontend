import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CommentForm.css';

const CommentForm = ({ submitfunction, commentData }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (commentData) {
        setText(commentData.texto);
    }
}, [commentData]);


  const handleTextChange = (e) => {
    setText(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    submitfunction({text});
    setText('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
      </div>
      <div className="form-group">
        <label htmlFor="text">Comenta:</label>
        <textarea
          className="form-control"
          id="text"
          value={text}
          onChange={handleTextChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Comentar</button>
    </form>
  );
};

export default CommentForm;