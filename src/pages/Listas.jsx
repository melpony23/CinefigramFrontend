import React from 'react'
import "./Listas.css"
import { useEffect, useState } from 'react';
import ListaChica_Card from '../components/ListaChica-Card/ListaChica-Card';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";


export const Listas = () => {
    const [listasPopulares, setListasPopulares] = useState([]);
    const [gotListasPopulares, setGotListasPopulares] = useState(false);
    const [listas, setListas] = useState([]);
    const [gotListas, setGotListas] = useState(false);

    const config_get_listas_pop = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/populares`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    useEffect(() => {
        const getListas = async () => {
            if (!gotListasPopulares) {
                try {
                    const listas = await axios(config_get_listas_pop);
                    setListasPopulares(listas.data);
                    console.log(`Llegaron listas!!`);
                    setGotListasPopulares(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getListas();
    }, [])

    const config_get_listas = {
        method: 'get',
        url: `${VITE_BACKEND_URL}playlists/`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    useEffect(() => {
        const getListas = async () => {
            if (!gotListas) {
                try {
                    const listas = await axios(config_get_listas);
                    setListas(listas.data);
                    console.log(`Llegaron listas!!`);
                    setGotListas(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getListas();
    }, [])


    return (
        <body className='Body_listas'>
            <div className='Separador_listas'></div>

            <div className='content_listas'>
                <div className='contenedor_titulo_listas'>
                    <h1 className='titulo_listas'>
                        Colecciona, organiza y comparte.  Las listas son la forma perfecta de agrupar películas.
                    </h1>
                </div>
                <div className='contenedor_listas'>
                    <div className='grid-lista-1'>
                        <h2>Listas destacadas</h2>
                        <hr className='decorator-separator-2-lista decorator-separator-yellow-lista' />
                        <div className='contenedor-listas-populares'>
                            {listas.length == 0 ? (<h2>No hay listas para mostrar</h2>) :
                                (listas.map(lista => { return (<ListaChica_Card id={lista.id} titulo={lista.titulo} likes={2} dislikes={2} > </ListaChica_Card>) }))
                            }
                        </div>
                    </div>
                    <div className='grid-lista-2'>
                        <h2>Listas populares</h2>
                        <hr className='decorator-separator-lista decorator-separator-red-lista' />
                        <div className='contenedor-listas-destacadas'>
                            {listasPopulares.length == 0 ? (<h2>No hay listas para mostrar</h2>) :
                                (listasPopulares.map(lista => { return (<ListaGrande_Card id={lista.id} titulo={lista.titulo} likes={2} dislikes={2} descripcion={lista.descripcion}> </ListaGrande_Card>) }))
                            }
                        </div>
                    </div>
                    <div className='grid-lista-3'>
                        <h2>Listas verified</h2>
                        <hr className='decorator-separator-lista decorator-separator-red-lista' />
                        <div className='contenedor-listas-verified'>
                            {listas.length == 0 ? (<h2>No hay listas para mostrar</h2>) :
                                (listas.map(lista => { return (<ListaChica_Card id={lista.id} titulo={lista.titulo} likes={2} dislikes={2} > </ListaChica_Card>) }))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Listas;