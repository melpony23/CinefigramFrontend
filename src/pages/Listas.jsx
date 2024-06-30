import "./Listas.css";
import { useEffect, useState } from 'react';
import ListaChica_Card from '../components/ListaChica-Card/ListaChica-Card';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";

const Listas = () => {
    const [listasPopulares, setListasPopulares] = useState([]);
    const [gotListasPopulares, setGotListasPopulares] = useState(false);
    const [listas, setListas] = useState([]);
    const [gotListas, setGotListas] = useState(false);
    


    useEffect(() => {
        const config_get_listas_pop = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/populares`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getListasPopulares = async () => {
            if (!gotListasPopulares) {
                try {
                    const response = await axios(config_get_listas_pop);
                    setListasPopulares(response.data);
                    setGotListasPopulares(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getListasPopulares();
    }, [gotListasPopulares]); // Agregar gotListasPopulares como dependencia

    useEffect(() => {
        const config_get_listas = {
            method: 'get',
            url: `${VITE_BACKEND_URL}playlists/`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const getListas = async () => {
            if (!gotListas) {
                try {
                    const response = await axios(config_get_listas);
                    setListas(response.data);
                    setGotListas(true);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getListas();
    }, [gotListas]); // Agregar gotListas como dependencia

    return (
        <body className='Body_listas'>
            <div className='Separador_listas'></div>

            <div className='content_listas'>
                <div className='contenedor_titulo_listas'>
                    <h1 className='titulo_listas'>
                        Colecciona, organiza y comparte. Las listas son la forma perfecta de agrupar películas.
                    </h1>
                </div>
                <div className='contenedor_listas'>
                    <div className='grid-lista-1'>
                        <h2>Listas destacadas</h2>
                        <hr className='decorator-separator-2-lista decorator-separator-yellow-lista' />
                        <div className='contenedor-listas-populares'>
                            {listas.length === 0 ? (<h2>No hay listas para mostrar</h2>) :
                                (listas.map(lista => (
                                    <ListaChica_Card
                                        key={lista.id} // Añadir key prop
                                        id={lista.id}
                                        titulo={lista.titulo}
                                        likes={2}
                                        dislikes={2}
                                    />
                                )))
                            }
                        </div>
                    </div>
                    <div className='grid-lista-2'>
                        <h2>Listas populares</h2>
                        <hr className='decorator-separator-lista decorator-separator-red-lista' />
                        <div className='contenedor-listas-destacadas'>
                            {listasPopulares.length === 0 ? (<h2>No hay listas para mostrar</h2>) :
                                (listasPopulares.map(lista => (
                                    <ListaGrande_Card
                                        key={lista.id} // Añadir key prop
                                        id={lista.id}
                                        titulo={lista.titulo}
                                        likes={2}
                                        dislikes={2}
                                        descripcion={lista.descripcion}
                                    />
                                )))
                            }
                        </div>
                    </div>
                    <div className='grid-lista-3'>
                        <h2>Listas verified</h2>
                        <hr className='decorator-separator-lista decorator-separator-red-lista' />
                        <div className='contenedor-listas-verified'>
                            {listas.length === 0 ? (<h2>No hay listas para mostrar</h2>) :
                                (listas.map(lista => (
                                    <ListaChica_Card
                                        key={lista.id} // Añadir key prop
                                        id={lista.id}
                                        titulo={lista.titulo}
                                        likes={2}
                                        dislikes={2}
                                    />
                                )))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Listas;
