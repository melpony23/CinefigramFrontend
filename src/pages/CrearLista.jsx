import "./CrearLista.css"
import { useState } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchBarPlaylist from '../components/SearchBarPlaylist/SearchBarPlaylist';

export const CrearLista = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [privacidad, setPrivacidad] = useState(null);
    const [peliculas, setPeliculas] = useState([]);

    const handleCallback = (childData) => {
        setPeliculas(childData);
    };

    function onInputTitulo(e) {
        setTitulo(e.target.value)
    }

    function onInputDescripcion(e) {
        setDescripcion(e.target.value)
    }

    function onInputPrivacidad(e) {
        setPrivacidad(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config_post_playlist = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            url: `${VITE_BACKEND_URL}playlists/`,
            data: { 'usuarioId': `${id}`, 'titulo': `${titulo}`, 'descripcion': `${descripcion}`, 'esPublica': `${privacidad}` }
        }

        const config_get_peliculas = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get',
            url: `${VITE_BACKEND_URL}peliculas/find_peliculas?search=${peliculas}`
        }

        try {
            const peliculasResponse = await axios(config_get_peliculas);
            const response_post_playlist = await axios(config_post_playlist);

            const config_post_playlistpelicula = {
                method: 'post',
                url: `${VITE_BACKEND_URL}playlistpeliculas/`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 'array': `${peliculasResponse.data}`, 'id_playlist': `${response_post_playlist.data}` }
            }

            await axios(config_post_playlistpelicula);
            navigate(`/listas-user/${id}`);

        } catch (error) {
            console.error('Error al crear la playlist:', error);
        }
    }

    return (
        <div className='Big_contenedor_crear_lista'>
            <div className='contenedor_titulo_new_playlist'>
                <h1 >Nueva lista</h1>
            </div>
            <div className='contenedor_form_playlist'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitulo">
                        <Form.Label className="texto_form">Título</Form.Label>
                        <Form.Control className="texto_form_input"
                            onChange={onInputTitulo}
                            required>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescripcion">
                        <Form.Label className="texto_form">Descripción</Form.Label>
                        <Form.Control className="texto_form_input"
                            onChange={onInputDescripcion}
                            required>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrivacidad">
                        <Form.Label className="texto_form">Privacidad</Form.Label>
                        <Form.Select className="texto_form_input"
                            onChange={onInputPrivacidad}
                            required>
                            <option>Selecciona una opción</option>
                            <option value={true}>Pública</option>
                            <option value={false}>Privada</option>
                        </Form.Select>
                    </Form.Group>
                    <div className='contenedor_search-bar-playlist'>
                        <SearchBarPlaylist parentCallback={handleCallback} />
                    </div>
                    <div className="contenedor_boton_submit">
                        <Button className="boton_crear_playlist" variant="primary" type="submit">
                            Crear Lista
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
};

export default CrearLista;
