import { useState } from 'react';
import './SearchBarPlaylist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const SearchBarPlaylist = ({ parentCallback }) => {
    const [query, setQuery] = useState('');
    const [peliculas, setPeliculas] = useState([]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query.trim() !== '') {
            console.log([query]);
            const pelis = peliculas.concat([query]);
            setPeliculas(pelis);
            console.log(`en search bar ${pelis}`);
            parentCallback(pelis);
        }
    };

    return (
        <div className='busqueda-y-lista'>
            <fieldset className="search-bar1">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Ingresa el nombre de una película"
                    className="search-input1"
                />
                <button onClick={handleSubmit} className="search-button1 button-gris1">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </fieldset>
            <ul>
                {peliculas.length === 0 ? <br /> : peliculas.map((pelicula, index) => <li key={index}>{pelicula}</li>)}
            </ul>
        </div>
    );
};

SearchBarPlaylist.propTypes = {
    parentCallback: PropTypes.func,
};

export default SearchBarPlaylist;
