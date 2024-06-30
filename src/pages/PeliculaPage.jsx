import "./PeliculaPage.css";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewCard/ReviewForm';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';

export const PeliculaPage = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [peli_info, setPeli_info] = useState({});
    const [reviews, setReviews] = useState([]);
    const [gotPeli_info, setGot] = useState(false);
    const [año, setAño] = useState('');

    useEffect(() => {
        const config_get_peli_info = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: `${VITE_BACKEND_URL}peliculas/unica/${id}`,
        };

        const getData = async () => {
            if (!gotPeli_info) {
                try {
                    const info_peli = await axios(config_get_peli_info);
                    setPeli_info(info_peli.data);
                    setGot(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getData();
    }, [id, gotPeli_info]);

    useEffect(() => {
        const getAño = () => {
            if (gotPeli_info) {
                const año = peli_info.fechaEstreno.slice(0, 4);
                setAño(año);
            }
        };
        getAño();
    }, [gotPeli_info, peli_info]);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}reviews/pelicula/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getReviews();
    }, [id]);

    const handleReviewSubmit = async (reviewData) => {
        const estado = "published";
        const fecha = new Date().toISOString();
        if (!token) {
            alert("Debes estar logueado para dejar una review.");
            return;
        }
        try {
            const response = await axios.post(`${VITE_BACKEND_URL}reviews`, {
                titulo: reviewData.title,
                texto: reviewData.text,
                calificacion: reviewData.rating,
                estado: estado,
                fecha: fecha,
                peliculaId: id,
                usuarioId: localStorage.getItem('userId'),
            });
            setReviews(prevReviews => {
                if (Array.isArray(prevReviews)) {
                    return [...prevReviews, response.data];
                } else {
                    return [response.data];
                }
            });
            console.log('Review creada:', response.data);
        } catch (error) {
            console.error('Error al crear la review:', error);
        }
    };

    const handleReviewDelete = async (reviewId) => {
        const review = await axios.get(`${VITE_BACKEND_URL}reviews/${reviewId}`);
        if (review.data.usuarioId !== localStorage.getItem("userId")) {
            alert("Solo puedes eliminar Reviews tuyas");
            return;
        }
        try {
            await axios.delete(`${VITE_BACKEND_URL}reviews/${reviewId}`);
            setReviews(prevReviews => Array.isArray(prevReviews) ? prevReviews.filter(review => review.id !== reviewId) : []);
            console.log('Review Eliminada:', reviewId);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='Body_Pelicula'>
            <div className='separador'></div>
            <div className='Contenido_pag_pelicula'>
                <div className='contenedor_imagen_pag_pelicula'>
                    <img src={peli_info.imagen} className='imagen_pag_pelicula' alt="Imagen de la película" />
                </div>
                <div className='contenedor_info_pag_pelicula'>
                    <div className='row1_info_peli'>
                        <h1 className='Titulo_pelicula'>{peli_info.titulo}</h1>
                        <div className='contenedor_boton_edit_pelicula'>
                            <button id={peli_info.id} className="cssbuttons-io" onClick={() => {
                                navigate(`/pelicula/edit/${id}`, {
                                    state: {
                                        titulo: peli_info.titulo,
                                        sinopsis: peli_info.sinopsis,
                                        genero: peli_info.genero,
                                        director: peli_info.director,
                                        clasificacion: peli_info.clasificacion,
                                        imagen: peli_info.imagen
                                    }
                                });
                            }}>
                                <span>Editar</span>
                            </button>
                        </div>
                        <h2>{año}</h2>
                    </div>
                    <div className='row2_info_peli'>
                        <h2>Ranking: {peli_info.ranking}</h2>
                        <div className='separador_row2'></div>
                        <h2>{peli_info.clasificacion}</h2>
                    </div>
                    <div className='row3_info_peli'>
                        <h2 className='Sinopsis_pelicula'>{peli_info.sinopsis}</h2>
                    </div>
                    <div className='review-form-container'>
                        <h2> Hacer una review</h2>
                        <ReviewForm movieId={id} submitfunction={handleReviewSubmit} />
                    </div>
                </div>
            </div>
            <hr className='decorator-separator-2-lista decorator-separator-yellow-lista' />
            <div className='div_reviews'>
                <h1 className='titulo_seccion_reviews'>Reviews de la Película</h1>
                <div className='div_contenedor_reviews'>
                    {Array.isArray(reviews) && reviews.map(review => (
                        <ReviewCard
                            key={review.id} // Agregar la prop key con un valor único (en este caso, review.id)
                            deletefunction={handleReviewDelete}
                            id={review.id}
                            movieId={id}
                            movieImg={peli_info.imagen}
                            fecha={review.fecha}
                            userId={review.usuarioId}
                            estado={review.estado}
                            title={review.titulo}
                            rating={review.calificacion}
                            text={review.texto}
                        />
                    ))}
                </div>
                <hr className='decorator-separator-2-lista decorator-separator-red-lista' />
            </div>
        </div>
    );
};

export default PeliculaPage;