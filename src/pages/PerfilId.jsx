import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Perfil.css';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import ReviewCard from '../components/ReviewCard/ReviewCard'; // Importar ReviewCard
import Logro from '../components/Logro/Logro'; // Importar Logro
import VITE_BACKEND_URL from "/config";

const PerfilId = () => {
    const { id } = useParams();
    const [username, setUsername] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [logros, setLogros] = useState([]);
    const [gotLogros, setGotLogros] = useState(false);
    const [listas, setListas] = useState([]);
    const navigate = useNavigate();
    const [gotListas, setGotListas] = useState(false);
    const [reviewCount, setReviewCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [gotReviews, setGotReviews] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}userPublic/${id}`);
                setUsername(response.data.username);
                setFotoPerfil(response.data.fotoPerfil);
                setDescripcion(response.data.descripcion);
            } catch (error) {
                console.log(error);
                // Manejar errores o actualizar estado en caso de error
            }
        };

        fetchUserData();

    }, [id]);

    useEffect(() => {
        const fetchLogros = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}users/${id}/logros`);
                setLogros(response.data);
                setGotLogros(true);
            } catch (error) {
                console.log(error);
                // Manejar errores o actualizar estado en caso de error
            }
        };

        if (!gotLogros) {
            fetchLogros();
        }
    }, [id, gotLogros]);

    useEffect(() => {
        const fetchListas = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}playlists/usuario/${id}`);
                setListas(response.data);
                setGotListas(true);
            } catch (error) {
                console.log(error);
                // Manejar errores o actualizar estado en caso de error
            }
        };

        if (!gotListas) {
            fetchListas();
        }
    }, [id, gotListas]);

    useEffect(() => {
        const fetchReviewCount = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}reviews/usuario/${id}/count`);
                setReviewCount(response.data.count);
            } catch (error) {
                console.log(error);
                // Manejar errores o actualizar estado en caso de error
            }
        };

        fetchReviewCount();

    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}reviews/usuario/${id}`);
                setReviews(response.data);
                setGotReviews(true);
            } catch (error) {
                console.log(error);
                // Manejar errores o actualizar estado en caso de error
            }
        };

        if (!gotReviews) {
            fetchReviews();
        }
    }, [id, gotReviews]);

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
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='fondo-perfil'>
            <div className="perfil">
                <div className="banner-perfil">
                    {fotoPerfil && (
                        <div className="foto-perfil">
                            <img src={fotoPerfil} alt="Foto de perfil" />
                        </div>
                    )}
                    <div className="info-usuario">
                        <h1>{username}</h1>
                        <div className="stats">
                            <p>Reviews: {reviewCount}</p>
                        </div>
                        <br />
                        <div>
                            <p>Descripción: {descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className='font-custome-tittle card-title'>Logros de {username}</h4>
            <div className='contenedor_logros'>
                {logros.length === 0 ? (
                    <h2>No tiene logros todavía</h2>
                ) : (
                    logros.map(logro => (
                        <Logro key={logro.id} titulo={logro.titulo} logo={logro.logo} />
                    ))
                )}
            </div>

            <h4 className='font-custome-tittle card-title'>Reviews de {username}</h4>
            <div className='contenedor_reviews'>
                {reviews.length === 0 ? (
                    <h2>No tiene reviews todavía</h2>
                ) : (
                    reviews.map(review => (
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
                    ))
                )}
            </div>

            <h4 className='font-custome-tittle card-title'>Listas de {username}</h4>
            <div className='contenedor-playlist-perfil'>
                {listas.length === 0 ? (
                    <h2>No tiene listas todavía</h2>
                ) : (
                    listas.map(lista => (
                        <ListaGrande_Card
                            key={lista.id}
                            id={lista.id}
                            titulo={lista.titulo}
                            autor={username}
                            likes={2} 
                            dislikes={2} 
                            descripcion={lista.descripcion}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default PerfilId;
