import React from 'react';
import "./PeliculaPage.css"
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentCards/CommentForm';
import { ReviewCard } from '../components/ReviewCard/ReviewCard';
import { CommentCard } from '../components/CommentCards/CommentCard';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';

export const CommentPage = () => {
    const { token } = useContext(AuthContext);
    const id = useParams().id;
    const navigate = useNavigate();
    const [Review_info, setReview_info] = useState([]);
    const [Comments, setComments] = useState([]);
    const [gotReview_info, setGot] = useState(false);    

    const config_get_review_info = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        url: `${VITE_BACKEND_URL}reviews/${id}`,
    }


    useEffect(() => {
        const getData = async () => {
            if (!gotReview_info) {
                try {
                    const info_review = await axios(config_get_review_info);
                    setReview_info(info_review.data);
                    setGot(true);

                    const commentsResponse = await axios.get(`${VITE_BACKEND_URL}comments/review/${id}`);
                    setComments(commentsResponse.data);

                } catch (error) {
                    console.log(error);
                }
            }
        }
        getData();

    }, [id])

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
            console.log(response.data.estado)
            setComments(prevComment => {
                if (Array.isArray(prevComment)) {
                    return [...prevComment, response.data];
                } else {
                    return [response.data];
                }
            });
            console.log('Comentario creado:', response.data);
        } catch (error) {
            console.error('Error al crear el Comentario:', error);
        }
    };

    const handleReviewDelete = async (reviewId) => {
        const review = await axios.get(`${VITE_BACKEND_URL}reviews/${reviewId}`);
        if (review.data.usuarioId != localStorage.getItem("userId")){
            alert("Solo puedes eliminar Reviews tuyas");
            return;
        }
        try {
            await axios.delete(`${VITE_BACKEND_URL}reviews/${reviewId}`);
            setReviews(prevReviews => Array.isArray(prevReviews) ? prevReviews.filter(review => review.id !== reviewId): []);
            console.log('Review Eliminada:');
            navigate(`/pelicula/${movieId}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCommentDelete = async (commentId) => {
        const comment = await axios.get(`${VITE_BACKEND_URL}comments/${commentId}`);
        if (comment.data.usuarioId != localStorage.getItem("userId")){
            alert("Solo puedes eliminar Comentarios tuyos");
            return;
        }
        try {
            await axios.delete(`${VITE_BACKEND_URL}comments/${commentId}`);
            setComments(prevComments => Array.isArray(prevComments) ? prevComments.filter(comment => comment.id !== commentId): []);
            console.log('Comentario Eliminada:');
        } catch (error) {
            console.log(error);
        }
    }

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
                        movieId = {Review_info.peliculaId}
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