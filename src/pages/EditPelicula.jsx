import React from 'react';
import "./EditPelicula.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export const EditPelicula = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [peli_info, setPeli_info] = useState([]);
    const [gotPeli_info, setGot] = useState(false);
    const [edit_titulo, setTitulo] = useState(peli_info.titulo);
    const [edit_sinopsis, setSinopsis] = useState(peli_info.sinopsis);
    const [edit_genero, setGenero] = useState(peli_info.genero);
    const [edit_director, setDirector] = useState(peli_info.director);
    const [edit_clasificacion, setClasificacion] = useState(peli_info.clasificacion);
    const [edit_mode, setEditMode] = useState(true)

    // Llamado para obtener info de la película
    const config_get_peli_info = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
        url: `${VITE_BACKEND_URL}peliculas/unica/${id}`,
    }

    useEffect(() => {
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
        }
        getData();

    }, [id])

    // Para editar la película
    function change_edit_mode() {
        console.log(edit_mode)
        if (edit_mode) {
            const update_pelicula = async () => {
                const titulo = (edit_titulo == undefined ? peli_info.titulo : edit_titulo);
                const sinopsis = (edit_sinopsis == undefined ? peli_info.sinopsis : edit_sinopsis);
                const genero = (edit_genero == undefined ? peli_info.genero : edit_genero);
                const director = (edit_director == undefined ? peli_info.director : edit_director);
                const clasificacion = (edit_clasificacion == undefined ? peli_info.clasificacion : edit_clasificacion);

                const config_update_pelicula = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'patch',
                    url: `${VITE_BACKEND_URL}peliculas/${id}`,
                    data: {
                        'id': `${id}`,
                        'titulo': `${titulo}`,
                        'sinopsis': `${sinopsis}`,
                        'genero': `${genero}`,
                        'director': `${director}`,
                        'clasificacion': `${clasificacion}`,

                    }
                }
                try {
                    const response_update = await axios(config_update_pelicula);
                    console.log(response_update);
                    navigate(`/pelicula/${id}`);
                }
                catch (error) {
                    console.log(error);
                }
            }
            update_pelicula()
        }
        setEditMode(!edit_mode)
    }

    function onInputTitulo(e) {
        setTitulo(e.target.value);
    }

    function onInputSinopsis(e) {
        setSinopsis(e.target.value);
    }

    function onInputGenero(e) {
        setGenero(e.target.value);
    }

    function onInputDirector(e) {
        setDirector(e.target.value);
    }

    function onInputClasificacion(e) {
        setClasificacion(e.target.value);
    }
    return (
        <body className='BodyEditPelicula'>
            <div className='contenedor_imagen_edit_pelicula'>
                <img src={peli_info.imagen} className='imagen_pag_pelicula' />
            </div>
            <div className='contenedor_formulario'>
                <Form>
                    <Form.Group className="mb-3" controlId="Titulo">
                        <Form.Label className='texto_form'>Titulo</Form.Label>
                        <Form.Control className='texto_form_input' type="input" value={edit_titulo} placeholder={peli_info.titulo} onChange={onInputTitulo} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="sinopsis">
                        <Form.Label className='texto_form'>Sinopsis</Form.Label>
                        <Form.Control className='texto_form_input' as="textarea" value={edit_sinopsis} placeholder={peli_info.sinopsis} rows={3} onChange={onInputSinopsis} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='genero'>
                        <Form.Label className='texto_form'>Genero</Form.Label>
                        <Form.Control className='texto_form_input' type="input" value={edit_genero} placeholder={peli_info.genero} onChange={onInputGenero} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='director'>
                        <Form.Label className='texto_form'>Director</Form.Label>
                        <Form.Control className='texto_form_input' type="input" value={edit_director} placeholder={peli_info.director} onChange={onInputDirector} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="clasificacion">
                        <Form.Label className='texto_form'>Clasificación</Form.Label>
                        <Form.Select className='texto_form_input' defaultValue={peli_info.clasificacion} onChange={onInputClasificacion}>
                            <option className='texto_form_input' value={edit_clasificacion}>TE</option>
                            <option className='texto_form_input' value={edit_clasificacion}>TE+7</option>
                            <option className='texto_form_input' value={edit_clasificacion}>MA14</option>
                            <option className='texto_form_input' value={edit_clasificacion}>MA18</option>
                        </Form.Select>
                    </Form.Group>
                    <div className='contenedor_boton_submit'>
                        <Button className='boton_enviar_edit' variant="primary" onClick={change_edit_mode}>
                            Enviar cambios
                        </Button>
                    </div>

                </Form>
            </div>

        </body >
    )
};
export default EditPelicula;