import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useNavigate } from "react-router-dom";
import "./EditReview.css"
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewCard/ReviewForm';

export const EditReview = () => {
    const navigate = useNavigate();
    const reviewId = useParams().id;
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}reviews/${reviewId}`);
                setReviewData(response.data);
            } catch (error) {
                console.error('Error fetching review data:', error);
            }
        };
        fetchReviewData();
    }, [reviewId]);

    const handleReviewSubmit = async (updatedReviewData) => {
        try {
            const response = await axios.patch(`${VITE_BACKEND_URL}reviews/${reviewId}`, {
                titulo: updatedReviewData.title,
                texto: updatedReviewData.text,
                calificacion: updatedReviewData.rating,
                estado:"edited:",
                fecha: new Date().toISOString()
        });
            //navigate(`/pelicula/${reviewData.peliculaId}`)
            navigate(-1);
            console.log("review actualizada:", response );
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };


    return (
        <div className='Contenedor-total'>
            <h1>Editar Review</h1>
            {reviewData ? (
                <ReviewForm 
                    movieId={reviewData.peliculaId}
                    submitfunction={handleReviewSubmit}
                    reviewData={reviewData}
                />
            ) : (
                <p>Cargando datos de la review...</p>
            )}
        </div>
    );
};

export default EditReview;