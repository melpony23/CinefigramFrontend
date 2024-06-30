import { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import CommentForm from '../components/CommentCards/CommentForm';
import { ReviewCard } from '../components/ReviewCard/ReviewCard';
import { CommentCard } from '../components/CommentCards/CommentCard';
import { AuthContext } from '../auth/AuthContext';

const CommentPage = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [Review_info, setReview_info] = useState({});
    const [Comments, setComments] = useState([]);
    const [gotReview_info, setGotReview_info] = useState(false);

    const config_get_review_info = useMemo(() => ({
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        url: `${VITE_BACKEND_URL}reviews/${id}`,
    }), [id]);

    useEffect(() => {
        const getData = async () => {
            if (!gotReview_info) {
                try {
                    const info_review = await axios(config_get_review_info);
                    setReview_info(info_review.data);
                    setGotReview_info(true);

                    const commentsResponse = await axios.get(`${VITE_BACKEND_URL}comments/review/${id}`);
                    setComments(commentsResponse.data);

                } catch (error) {
                    console.log(error);
                }
            }
        };
        getData();

    }, [id, gotReview_info, config_get_review_info]);

    const handleCommentSubmit = async (commentData) => {
        const estado = "published";
        const fecha = new Date().toISOString();
        if (!token) {
            alert("Debes estar logueado para comentar una review.");
            return;
        }
        try {
            const response = await axios.post(`${VITE_BACKEND_URL}comments`, {
                texto: commentData.text,
                estado: estado,
                fecha: fecha,
                reviewId: id,
                usuarioId: localStorage.getItem('userId'),
            });
            setComments(prevComments => [response.data, ...prevComments]);
            console.log('Comentario creado:', response.data);
        } catch (error) {
            console.error('Error al crear el Comentario:', error);
        }
    };

    const handleReviewDelete = async (reviewId) => {
        try {
            const reviewResponse = await axios.get(`${VITE_BACKEND_URL}reviews/${reviewId}`);
            const review = reviewResponse.data;
            if (review.usuarioId !== localStorage.getItem("userId")) {
                alert("Solo puedes eliminar tus propias reviews.");
                return;
            }
            await axios.delete(`${VITE_BACKEND_URL}reviews/${reviewId}`);
            console.log('Review Eliminada:', reviewId);
            navigate(`/pelicula/${review.peliculaId}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            const commentResponse = await axios.get(`${VITE_BACKEND_URL}comments/${commentId}`);
            const comment = commentResponse.data;
            if (comment.usuarioId !== localStorage.getItem("userId")) {
                alert("Solo puedes eliminar tus propios comentarios.");
                return;
            }
            await axios.delete(`${VITE_BACKEND_URL}comments/${commentId}`);
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            console.log('Comentario Eliminado:', commentId);
        } catch (error) {
            console.log(error);
        }
    };

    const handleReviewClick = (movieId) => {
        navigate(`/pelicula/${movieId}`);
    };

    return (
        <div className='Body_Pelicula'>
            <div className='separador'></div>
            <div className='Contenido_pag_pelicula'>
                <div className='Review-principal'>
                    <ReviewCard 
                        clickfunction={handleReviewClick}
                        deletefunction={handleReviewDelete}
                        id={Review_info.id}
                        movieId={Review_info.peliculaId}
                        fecha={Review_info.fecha}
                        userId={Review_info.usuarioId}
                        estado={Review_info.estado}
                        title={Review_info.titulo}
                        rating={Review_info.calificacion}
                        text={Review_info.texto}
                    />
                    <div className='review-form-container'>
                        <h2> Escribir un Comentario </h2>
                        <CommentForm submitfunction={handleCommentSubmit} />
                    </div>
                </div>
            </div>
            <hr className='decorator-separator-2-lista decorator-separator-yellow-lista' />
            <div className='div_reviews'>
                <h1 className='titulo_seccion_reviews'> Comentarios de la Review</h1>
                <div className='div_contenedor_reviews'>
                    {Array.isArray(Comments) && Comments.length > 0 ? (
                        Comments.map(comment => (
                            <CommentCard
                                key={comment.id}
                                id={comment.id}
                                text={comment.texto}
                                userId={comment.usuarioId}
                                deletefunction={handleCommentDelete}
                            />
                        ))
                    ) : (
                        <p>Nadie ha comentado</p>
                    )}
                </div>
                <hr className='decorator-separator-2-lista decorator-separator-red-lista' />
            </div>
        </div>
    );
};

export default CommentPage;
