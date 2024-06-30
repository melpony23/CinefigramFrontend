import { useState, useEffect} from 'react';
import './PerfilId.css';
import axios from 'axios';
import "./Comunidad.css";
import { useParams } from 'react-router-dom';
import VITE_BACKEND_URL from "/config";
import { ReviewCard } from '../components/ReviewCard/ReviewCard';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import PortadaPlaylist from '../../assets/portada_playlist.png';

export const PerfilId = () => {
    const id = useParams().id;
    const [username, setUsername] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [Comments, setComments] = useState([]);
    const [logros, setLogros] = useState([]);
    const [descripcion, setDescripcion] = useState(null);
    const [reviews, setReviews] = useState([]);
    

    useEffect(() => {
        const serUser = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}userPublic/${id}`);
                setUsername(response.data.username);
                setEmail(response.data.email); 
                setFotoPerfil(response.data.fotoPerfil); 
                setDescripcion(response.data.descripcion);  
            } catch (error) {
                console.log(error);
            }
        };
    
        serUser();
    
    }, [id]);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviews = await axios.get(`${VITE_BACKEND_URL}reviews/usuario/${id}`);
                setReviews(reviews.data);
            } catch (error) {
                console.log(error);
            }
        }
        getReviews();
    }, [id])

    useEffect(() => {
        const getComments = async () => {
            try {
                const comments = await axios.get(`${VITE_BACKEND_URL}comments/usuario/${id}`);
                setComments(comments.data);
            } catch (error) {
                console.log(error);
            }
        }
        getComments();
    }, [id])

    useEffect(() => {
        const getLogros = async () => {
            try {
                const logros = await axios.get(`${VITE_BACKEND_URL}logros/usuarios/${id}`);
                setLogros(logros.data);
            } catch (error) {
                console.log(error);
            }
        }
        getLogros();
    }, [id])

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
        } catch (error) {
            console.log(error);
        }
    }
      

    const handleClickLogro = (logro) => {
        alert(logro.descripcion)
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
                            <p>Comentarios: {Comments.length}</p>
                            <p>Logros: {logros.length}</p>
                        </div>
                        <br></br>
                        <div>
                            <p>{descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h4 className='font-custome-tittle card-title'>Logros de {username}</h4>
            <br></br>
            <div className='div-logros'>
                {Array.isArray(logros) && logros.length > 0 ? (logros.map(logro => (
                        <div className='logro' onClick={() => handleClickLogro(logro)}>
                            <img src={logro.logo} alt='Usuario listado' />
                            <p>{logro.titulo}</p>
                        </div>
                    ))) : (
                        <p> Este usuario todavia no gana ningun logro</p>
                    )}
            </div>
            
                        
            <h4 className='font-custome-tittle card-title'>Reviews de {username}</h4>
            <div className='carrusel-reviews'>
                <div className='div_contenedor_reviews2'>
                {Array.isArray(reviews) && reviews.length > 0 ? (reviews.map(review => (
                            <ReviewCard
                                deletefunction={handleReviewDelete}
                                id={review.id}
                                movieId = {review.peliculaId}
                                fecha={review.fecha}
                                userId={review.usuarioId}
                                estado={review.estado}
                                title={review.titulo}
                                rating={review.calificacion}
                                text={review.texto}
                                
                            />
                        ))) : (
                            <p>Este usuario no ha hecho reviews.</p>
                        )}
                </div>
            </div>
            <h4 className='font-custome-tittle card-title'>Listas de {username}</h4>
            <div className='contenedor-playlis-perfil'>
            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={username} likes={200} dislikes={2} num_peliculas={15} 
            descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
            </div>
        </div>
    );
};

export default PerfilId;
