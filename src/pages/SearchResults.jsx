import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';
import VITE_BACKEND_URL from '/config';
import "./SearchResults.css";

const SearchResults = () => {
    const { searchTerm } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const url = `${VITE_BACKEND_URL}peliculas/search?search=${searchTerm}`;
                console.log('Fetching URL:', url); // Log para verificar la URL
                const response = await axios.get(url);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error al buscar películas:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    if (isLoading) {
        return <p>Cargando resultados...</p>;
    }

    if (searchResults.length === 0) {
        return (
            <div className="search-results">
                <h2 className="title-result-search">No se encontraron resultados de búsqueda para: &quot;{searchTerm}&quot;</h2>
            </div>
        );
    }

    return (
        <div className="search-results">
            <h2 className="title-result-search">Resultados de búsqueda para: &quot;{searchTerm}&quot;</h2>
            <MovieList movies={searchResults} />
        </div>
    );
};

export default SearchResults;
