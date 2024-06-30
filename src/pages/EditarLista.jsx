import { useState, useEffect } from 'react';
import "./EditarLista.css";
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchBarPlaylist from '../components/SearchBarPlaylist/SearchBarPlaylist';

const EditarLista = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [gotLista, setGotLista] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [privacidad, setPrivacidad] = useState('');

    const handleCallback = () => {
        // Esta función se encarga de recibir datos desde el componente hijo SearchBarPlaylist
        // y actualizar el estado de las películas asociadas a la lista.
    };

    const onInputTitulo = (e) => {
        setTitulo(e.target.value);
    };

    const onInputDescripcion = (e) => {
        setDescripcion(e.target.value);
    };

    const onInputPrivacidad = (e) => {
        setPrivacidad(e.target.value);
    };

    useEffect(() => {
        const getLista = async () => {
            const config_get_lista = {
                method: 'get',
                url: `${VITE_BACKEND_URL}playlists/unica/${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            if (!gotLista) {
                try {
                    const response = await axios(config_get_lista);
                    // Actualiza los estados según los datos recibidos del backend
                    setTitulo(response.data.titulo);
                    setDescripcion(response.data.descripcion);
                    setPrivacidad(response.data.esPublica ? 'true' : 'false'); // Ajusta según el tipo de dato esperado
                    setGotLista(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getLista();
    }, [id, gotLista]); // Dependencias actualizadas

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config_put_lista = {
            method: 'put',
            url: `${VITE_BACKEND_URL}playlists/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                'titulo': titulo,
                'descripcion': descripcion,
                'esPublica': privacidad === 'true' ? true : false // Ajusta según el tipo de dato esperado
            }
        };

        try {
            await axios(config_put_lista);
            navigate(`/listas-user/${id}`);
        } catch (error) {
            console.error('Error al editar la lista:', error);
        }
    };

    return (
        <div className='Big_contenedor_crear_lista'>
            <div className='contenedor_titulo_new_playlist'>
                <h1>Editar lista</h1>
            </div>
            <div className='contenedor_form_playlist'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitulo">
                        <Form.Label className="texto_form">Título</Form.Label>
                        <Form.Control
                            className="texto_form_input"
                            value={titulo}
                            onChange={onInputTitulo}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescripcion">
                        <Form.Label className="texto_form">Descripción</Form.Label>
                        <Form.Control
                            className="texto_form_input"
                            value={descripcion}
                            onChange={onInputDescripcion}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPeliculas">
                        {/* Aquí deberías mostrar las películas asociadas a la lista para editarlas */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrivacidad">
                        <Form.Label className="texto_form">Privacidad</Form.Label>
                        <Form.Select
                            className="texto_form_input"
                            value={privacidad}
                            onChange={onInputPrivacidad}
                            required
                        >
                            <option>Selecciona una opción</option>
                            <option value={'true'}>Pública</option>
                            <option value={'false'}>Privada</option>
                        </Form.Select>
                    </Form.Group>

                    <div className='contenedor_search-bar-playlist'>
                        <SearchBarPlaylist parentCallback={handleCallback} />
                    </div>

                    <div className="contenedor_boton_submit">
                        <Button
                            className="boton_crear_playlist"
                            variant="primary"
                            type="submit"
                        >
                            Guardar Cambios
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default EditarLista;
