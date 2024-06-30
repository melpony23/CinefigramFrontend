import React, { useState, useEffect } from 'react';
import "./EditarLista.css";
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchBarPlaylist from '../components/SearchBarPlaylist/SearchBarPlaylist';

export const EditarLista = () => {
    const navigate = useNavigate();
    const id = useParams().id;
    const [lista, setLista] = useState([]);
    const [gotLista, setGotLista] = useState(false);
    const [imagen, setImagen] = useState([]);
    const [gotImagen, setGotImagen] = useState(false);
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


    const config_get_lista = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/unica/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    useEffect(() => {
        const getLista = async () => {
            if (!gotLista) {
                try {
                    const lista = await axios(config_get_lista);
                    setLista(lista.data);
                    setGotLista(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getLista();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    return (
        <div className='Big_contenedor_crear_lista'>
            <div className='contenedor_titulo_new_playlist'>
                <h1 >Editar lista</h1>
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

                    <Form.Group className="mb-3" controlId="formPeliculas">

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

export default EditarLista;