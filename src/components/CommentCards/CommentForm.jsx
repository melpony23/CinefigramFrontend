import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CommentForm.css';
import PropTypes from 'prop-types'; // Importa PropTypes

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
    submitfunction({ text });
    setText('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        {/* Este div está vacío, podrías eliminarlo si no es necesario */}
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

// Define los tipos esperados para las propiedades
CommentForm.propTypes = {
  submitfunction: PropTypes.func.isRequired, // Valida que submitfunction sea una función y es requerida
  commentData: PropTypes.shape({
    texto: PropTypes.string, // Valida que commentData, si existe, tenga una propiedad texto que sea string
  }),
};

export default CommentForm;
