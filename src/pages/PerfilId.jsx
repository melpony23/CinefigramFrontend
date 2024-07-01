import { useState, useEffect } from 'react';
import './PerfilId.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VITE_BACKEND_URL from "/config";
import { ReviewCard } from '../components/ReviewCard/ReviewCard';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';

const PerfilId = () => {
    const id = useParams().id;
    const [username, setUsername] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [comments, setComments] = useState([]);
    const [logros, setLogros] = useState([]);
    const [gotListas, setGotListas] = useState(false);
    const [descripcion, setDescripcion] = useState(null);
    const [listas, setListas] = useState([]);
    const [reviews, setReviews] = useState([]);

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
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}userPublic/${id}`);
                setUsername(response.data.username);
                setFotoPerfil(response.data.fotoPerfil); // Asegúrate de que response.data.fotoPerfil sea una URL válida
                setDescripcion(response.data.descripcion);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}reviews/usuario/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchReviews();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}comments/usuario/${id}`);
                setComments(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchComments();
    }, [id]);

    useEffect(() => {
        const fetchLogros = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}logros/usuarios/${id}`);
                setLogros(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLogros();
    }, [id]);

    const handleReviewDelete = async (reviewId) => {
        try {
            const response = await axios.delete(`${VITE_BACKEND_URL}reviews/${reviewId}`);
            if (response.status === 200) {
                setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
                console.log('Review Eliminada correctamente');
            }
        } catch (error) {
            console.log('Error al eliminar la review:', error);
        }
    };

    const handleClickLogro = (logro) => {
        alert(logro.descripcion);
    };

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
                            <p>Reviews: {reviews.length}</p>
                            <p>Comentarios: {comments.length}</p>
                            <p>Logros: {logros.length}</p>
                        </div>
                        <br />
                        <div>
                            <p>{descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className='font-custome-tittle card-title'>Logros de {username}</h4>
            <div className='div-logros'>
                {Array.isArray(logros) && logros.length > 0 ? (
                    logros.map((logro, index) => (
                        <div key={index} className='logro' onClick={() => handleClickLogro(logro)}>
                            <img src={logro.logo} alt='Logro' />
                            <p>{logro.titulo}</p>
                        </div>
                    ))
                ) : (
                    <p>Este usuario todavía no ha ganado ningún logro.</p>
                )}
            </div>

            <h4 className='font-custome-tittle card-title'>Reviews de {username}</h4>
            <div className='carrusel-reviews'>
                <div className='div_contenedor_reviews2'>
                    {Array.isArray(reviews) && reviews.length > 0 ? (
                        reviews.map(review => (
                            <ReviewCard
                                key={review.id}
                                deletefunction={handleReviewDelete}
                                id={review.id}
                                movieId={review.peliculaId}
                                fecha={review.fecha}
                                userId={review.usuarioId}
                                estado={review.estado}
                                title={review.titulo}
                                rating={review.calificacion}
                                text={review.texto}
                            />
                        ))
                    ) : (
                        <p>Este usuario no ha hecho reviews.</p>
                    )}
                </div>
            </div>

            <h4 className='font-custome-tittle card-title'>Listas de {username}</h4>
            <div >
                {listas.length == 0 ? (<h2>No tienes listas todavía. Crea una!</h2>) :
                    (<div className='contenedor-playlist-perfil'>
                        <ListaGrande_Card id={listas[0].id} titulo={listas[0].titulo} autor={username} descripcion={listas[0].descripcion}> </ListaGrande_Card>
                        <ListaGrande_Card id={listas[1].id} titulo={listas[1].titulo} autor={username} descripcion={listas[1].descripcion}> </ListaGrande_Card>
                    </div>

                    )
                }

            </div>
        </div>
    );
};

export default PerfilId;
