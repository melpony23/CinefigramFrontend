import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./EditPelicula.css";
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../auth/AuthContext'; // Asegúrate de importar correctamente el contexto de autenticación
import VITE_BACKEND_URL from '/config'; // Asumiendo que VITE_BACKEND_URL está correctamente definido en tu archivo de configuración

const EditPelicula = () => {
    const { token } = useContext(AuthContext); // Obtener el token del contexto de autenticación
    const id = useParams().id;
    const navigate = useNavigate();
    const [peliInfo, setPeliInfo] = useState({});
    const [gotPeliInfo, setGotPeliInfo] = useState(false);
    const [editTitulo, setEditTitulo] = useState('');
    const [editSinopsis, setEditSinopsis] = useState('');
    const [editGenero, setEditGenero] = useState('');
    const [editDirector, setEditDirector] = useState('');
    const [editClasificacion, setEditClasificacion] = useState('');
    const [editMode, setEditMode] = useState(true);
    const [error, setError] = useState(false);

    // Llamado para obtener info de la película
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}peliculas/unica/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setPeliInfo(response.data);
                setEditTitulo(response.data.titulo);
                setEditSinopsis(response.data.sinopsis);
                setEditGenero(response.data.genero);
                setEditDirector(response.data.director);
                setEditClasificacion(response.data.clasificacion);
                setGotPeliInfo(true);
            } catch (error) {
                console.error('Error fetching movie info:', error);
            }
        };

        fetchData();
    }, [id]);

    // Verificar si el usuario es administrador al cargar el componente
    useEffect(() => {
        const checkAdminStatus = async () => {
            const config = {
                method: 'get',
                url: `${VITE_BACKEND_URL}scope/protectedadmin`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true // Asegura que las credenciales se envíen con la solicitud
            };

            try {
                const response = await axios(config);
                console.log('Enviaste un token válido y estás logueado.');
                console.log(response);
            } catch (error) {
                console.log('Error:', error);
                setError(true); // Establecer el estado de error
            }
        };

        checkAdminStatus();
    }, [token]);

    // Función para manejar cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'titulo':
                setEditTitulo(value);
                break;
            case 'sinopsis':
                setEditSinopsis(value);
                break;
            case 'genero':
                setEditGenero(value);
                break;
            case 'director':
                setEditDirector(value);
                break;
            case 'clasificacion':
                setEditClasificacion(value);
                break;
            default:
                break;
        }
    };

    // Función para enviar los cambios al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar nuevamente el estado de administrador antes de actualizar
        if (!editMode || error) {
            console.log('No estás autorizado para editar esta película.');
            return;
        }

        const updateData = {
            titulo: editTitulo,
            sinopsis: editSinopsis,
            genero: editGenero,
            director: editDirector,
            clasificacion: editClasificacion
        };

        const config = {
            method: 'patch',
            url: `${VITE_BACKEND_URL}peliculas/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: updateData
        };

        try {
            const response = await axios(config);
            console.log('Película actualizada:', response.data);
            navigate(`/pelicula/${id}`);
        } catch (error) {
            console.error('Error actualizando película:', error);
        }
    };

    // Renderizado condicional para mostrar mensaje de error de permisos
    if (error) {
        return (
            <div className='error-view'>
                <h2 className='error-title-edit'>No estás autorizado para editar esta película.</h2>
                <center>
                    <Button onClick={() => navigate('/peliculas')} className='boton-volver-peliculas'>Volver a la página de películas</Button>
                </center>
            </div>
        );
    }

    // Renderizado del formulario de edición
    return (
        <div className="BodyEditPelicula">
            <div className="contenedor_imagen_edit_pelicula">
                <img src={peliInfo.imagen} className="imagen_pag_pelicula" alt="Imagen de la película" />
            </div>
            <div className="contenedor_formulario">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitulo">
                        <Form.Label className="texto_form">Título</Form.Label>
                        <Form.Control
                            className="texto_form_input"
                            type="text"
                            name="titulo"
                            value={editTitulo}
                            placeholder={peliInfo.titulo}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSinopsis">
                        <Form.Label className="texto_form">Sinopsis</Form.Label>
                        <Form.Control
                            className="texto_form_input"
                            as="textarea"
                            name="sinopsis"
                            value={editSinopsis}
                            placeholder={peliInfo.sinopsis}
                            onChange={handleInputChange}
                            rows={3}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGenero">
                        <Form.Label className="texto_form">Género</Form.Label>
                        <Form.Control
                            className="texto_form_input"
                            type="text"
                            name="genero"
                            value={editGenero}
                            placeholder={peliInfo.genero}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDirector">
                        <Form.Label className="texto_form">Director</Form.Label>
                        <Form.Control
                            className="texto_form_input"
                            type="text"
                            name="director"
                            value={editDirector}
                            placeholder={peliInfo.director}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formClasificacion">
                        <Form.Label className="texto_form">Clasificación</Form.Label>
                        <Form.Select
                            className="texto_form_input"
                            name="clasificacion"
                            value={editClasificacion}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="TE">TE</option>
                            <option value="TE+7">TE+7</option>
                            <option value="MA14">MA14</option>
                            <option value="MA18">MA18</option>
                        </Form.Select>
                    </Form.Group>

                    <div className="contenedor_boton_submit">
                        <Button className="boton_enviar_edit" variant="primary" type="submit">
                            Enviar cambios
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default EditPelicula;
