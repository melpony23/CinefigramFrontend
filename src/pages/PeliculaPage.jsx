import React from 'react';
import "./PeliculaPage.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';

export const PeliculaPage = () => {
    const id = useParams().id;
    const [peli_info, setPeli_info] = useState([]);
    const [gotPeli_info, setGot] = useState(false);
    const [año, setAño] = useState('')

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

    }, [])

    useEffect(() => {
        const getAño = async () => {
            if (gotPeli_info) {
                const año = (peli_info.fechaEstreno).slice(0, 4);
                setAño(año);
            }
        }
        getAño();
    })

    return (
        <body className='Body_Pelicula'>
            <div className='Separador_pag_pelicula'></div>
            <div className='Contenido_pag_pelicula'>
                <div className='contenedor_imagen_pag_pelicula'>
                    <img src={peli_info.imagen} className='imagen_pag_pelicula' />
                </div>
                <div className='contenedor_info_pag_pelicula'>
                    <div className='row1_info_peli'>
                        <h1 className='Titulo_pelicula'>{peli_info.titulo}</h1>
                        <h2> {año}</h2>
                    </div>
                    <div className='row2_info_peli'>
                        <h2>Ranking: {peli_info.ranking}</h2>
                        <div className='separador_row2'></div>
                        <h2>{peli_info.clasificacion}</h2>
                    </div>
                    <div className='row3_info_peli'>
                        <h2 className='Sinopsis_pelicula'>{peli_info.sinopsis}</h2>
                    </div>
                </div>
            </div>
            <div className='Separador_inferior_pelicula'></div>
        </body>
    );
};

export default PeliculaPage;