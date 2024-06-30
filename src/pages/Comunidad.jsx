import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useNavigate } from "react-router-dom";
import "./Comunidad.css";
import SearchBar from '../components/SearchBarComunidad/SearchBarComunidad';
import { ReviewCard } from '../components/ReviewCard/ReviewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Comunidad = () => {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [searchSuccesful, setsearchSuccesful] = useState(false);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const userId = localStorage.getItem('userId');

    const searchUsers = async (username) => {
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}userPublic/username/${username}`);
            setSearchResults(response.data); 
            setsearchSuccesful(true);
            console.log(searchResults.username)
        } catch (error) {
            alert("Usuario no encontrado");
            setsearchSuccesful(false);
            console.log(error)
            setSearchResults([]); 
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await axios.get(`${VITE_BACKEND_URL}userPublic/list/${userId}`);
                setUsers(users.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, [userId])

    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviews = await axios.get(`${VITE_BACKEND_URL}reviews/populares`);
                setReviews(reviews.data);
            } catch (error) {
                console.log(error);
            }
        }
        getReviews();
    }, [])

    const handleReviewClick = (movieId) => {
        navigate(`/pelicula/${movieId}`);
    };

    const handleReviewDelete = async (reviewId) => {
        const review = await axios.get(`${VITE_BACKEND_URL}reviews/${reviewId}`);
        if (review.data.usuarioId != localStorage.getItem("userId")){
            alert("Solo puedes eliminar Reviews tuyas");
            return;
        }
        try {
            await axios.delete(`${VITE_BACKEND_URL}reviews/${reviewId}`);
            setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
            console.log('Review Eliminada:', reviewId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='body_comunidad'>
            <div className='contenido_comunidad'>
                <div className='separator'></div>
                <div className='div_titulo_comunidad'>
                    <br></br>
                    <h1 className='titulo_comunidad'>
                        Cinefigram Community
                    </h1>
                    <hr className='decorator-separator-2-lista decorator-separator-yellow-lista' />
                </div>
                <div className='findUser-comunidad'>
                    <h1 className='titulo_findUser'>Buscar usuarios</h1>
                    <div className='search-bar_comunidad'>
                        <SearchBar onSearch={searchUsers}/>
                        {searchSuccesful && (
                            <div className='usuarios-famosos'>
                                <h2>Resultados de búsqueda:</h2>
                                <div className='usuario'>
                                    <img src={searchResults.fotoPerfil} alt='Usuario encontrado' />
                                    <p>{searchResults.username}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <hr className='decorator-separator-2-lista decorator-separator-red-lista' />
                </div>
                <h1 className='titulo_findUser'>Find More Users</h1>
                <div className='usuarios-famosos'>
                    {Array.isArray(users) && users.map(user => (
                        <div key={user.id} className='usuario' onClick={() => navigate(`/perfil/${user.id}`)} style={{ cursor: 'pointer' }}>
                            <img src={user.fotoPerfil} alt='Usuario listado' />
                            <p>{user.username}{user.isVerified ? <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#F6AE2D', marginLeft: '5px' }} /> : <></>}</p>
                        </div>
                    ))}
                </div>
                <hr className='decorator-separator-2-lista decorator-separator-red-lista' />
                
                <div className='div_reviews'>
                    <h1 className='titulo_seccion_reviews'> Reviews mas positivas</h1>
                    <div className='div_contenedor_reviews'>
                        {Array.isArray(reviews) && reviews.map(review => (
                            <ReviewCard
                                key={review.id}
                                deletefunction={handleReviewDelete}
                                id={review.id}
                                movieId={review.peliculaId}
                                userId={review.usuarioId}
                                estado={review.estado}
                                title={review.titulo}
                                rating={review.calificacion}
                                text={review.texto}
                                fecha={review.fecha}
                                clickfunction={handleReviewClick}
                            />
                        ))}
                    </div>
                    <hr className='decorator-separator-2-lista decorator-separator-red-lista' />
                </div>
                <div className='div_playlists_comunidad'>
                    <h1 className='titulo_seccion_reviews'> Explora el mundo del Cine!</h1>
                    <div className="botones-seccion">
                        <button className="boton-explorar" onClick={() => navigate('/peliculas')}>
                            Explorar Películas
                        </button>
                        <button className="boton-explorar" onClick={() => navigate('/listas')}>
                            Explorar Listas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comunidad;
