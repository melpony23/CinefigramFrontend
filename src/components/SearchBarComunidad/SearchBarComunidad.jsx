import  { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBarComunidad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBarComunidad = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar ..."
        className="search-input"
      />
      <button type="submit" className="search-button button-gris">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

SearchBarComunidad.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBarComunidad;
