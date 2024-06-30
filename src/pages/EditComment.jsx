import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useNavigate } from "react-router-dom";
import "./EditComment.css"
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentCards/CommentForm';

export const EditComment = () => {
    const navigate = useNavigate();
    const commentId = useParams().id;
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}comments/${commentId}`);
                setCommentData(response.data);
            } catch (error) {
                console.error('Error buscando Comentario', error);
            }
        };
        fetchCommentData();
    }, [commentId]);

    const handleCommentSubmit = async (updatedCommentData) => {
        try {
            const response = await axios.patch(`${VITE_BACKEND_URL}comments/${commentId}`, {
                texto: updatedCommentData.text,
                estado:"edited:",
                fecha: new Date().toISOString()
        });
            navigate(`/Comments/${response.data.reviewId}`)
            console.log("Comentario actualizado:", response );
        } catch (error) {
            console.error('Error updating Comment:', error);
        }
    };


    return (
        <div className='Contenedor-total-comment'>
            <h1>Editar Comentario</h1>
            {commentData ? (
                <CommentForm 
                    submitfunction={handleCommentSubmit}
                    commentData={commentData}
                />
            ) : (
                <p>Cargando datos del Comentario</p>
            )}
        </div>
    );
};

export default EditComment;