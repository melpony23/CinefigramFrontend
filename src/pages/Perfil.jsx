import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom'; // Importa navigate desde react-router-dom
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import './Perfil.css';
import './Comunidad.css';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import Logro from '../components/Logro/Logro';
import VITE_BACKEND_URL from "/config";
import ReviewCard from '../components/ReviewCard/ReviewCard'; // Importar ReviewCard

export const Perfil = () => {
    const [username, setUsername] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const { token } = useContext(AuthContext);
    const [logros, setLogros] = useState([]);
    const [gotLogros, setGotLogros] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [listas, setListas] = useState([]);
    const [gotListas, setGotListas] = useState(false);
    const [reviewCount, setReviewCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [gotReviews, setGotReviews] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedFotoPerfil = localStorage.getItem('fotoPerfil');
        const storedDescripcion = localStorage.getItem('descripcion');

        if (storedUsername) setUsername(storedUsername);
        if (storedFotoPerfil) setFotoPerfil(storedFotoPerfil);
        if (storedDescripcion) setDescripcion(storedDescripcion);
    }, []);

    useEffect(() => {
        const config_get_listas = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/usuario/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getListas = async () => {
            if (!gotListas) {
                try {
                    const response = await axios(config_get_listas);
                    setListas(response.data);
                    setGotListas(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getListas();
    }, [id, gotListas]);

    useEffect(() => {
        const config_get_logros = {
            method: 'get',
            url: `${VITE_BACKEND_URL}users/${id}/logros`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        const getLogros = async () => {
            if (!gotLogros) {
                try {
                    const response = await axios(config_get_logros);
                    setLogros(response.data);
                    setGotLogros(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getLogros();
    }, [id, gotLogros, token]);

    useEffect(() => {
        const config_get_review_count = {
            method: 'get',
            url: `${VITE_BACKEND_URL}reviews/usuario/${id}/count`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getReviewCount = async () => {
            try {
                const response = await axios(config_get_review_count);
                setReviewCount(response.data.count);
            } catch (error) {
                console.log(error);
            }
        };
        getReviewCount();
    }, [id]);

    useEffect(() => {
        const config_get_reviews = {
            method: 'get',
            url: `${VITE_BACKEND_URL}reviews/usuario/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getReviews = async () => {
            if (!gotReviews) {
                try {
                    const response = await axios(config_get_reviews);
                    setReviews(response.data);
                    setGotReviews(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getReviews();
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
                    <h2>No tienes logros todavía</h2>
                ) : (
                    logros.map(logro => (
                        <Logro key={logro.id} titulo={logro.titulo} logo={logro.logo} />
                    ))
                )}
            </div>

            <h4 className='font-custome-tittle card-title'>Reviews de {username}</h4>
            <div className='contenedor_reviews'>
                {reviews.length === 0 ? (
                    <h2>No tienes reviews todavía. ¡Escribe una!</h2>
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
                    <h2>No tienes listas todavía. ¡Crea una!</h2>
                ) : (
                    listas.map(lista => (
                        <ListaGrande_Card
                            key={lista.id}
                            id={lista.id}
                            titulo={lista.titulo}
                            autor={username}
                            likes={2} // Aquí puedes añadir la lógica para obtener likes
                            dislikes={2} // Aquí puedes añadir la lógica para obtener dislikes
                            descripcion={lista.descripcion}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Perfil;
