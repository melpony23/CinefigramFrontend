import React from 'react'
import "./Listas.css"
import { useEffect, useState } from 'react';
import VITE_BACKEND_URL from "/config.js";
import ListaChica_Card from '../components/ListaChica-Card/ListaChica-Card';
import ListaGrande_Card from '../components/ListaGrande-Card/ListaGrande-Card';
import bladeRunnerPoster from '../../assets/blade-runner.png';
import PortadaPlaylist from '../../assets/portada_playlist.png';


export const Listas = () => {
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
                        <h2>Listas populares</h2>
                        <hr className='decorator-separator-2-lista decorator-separator-yellow-lista' />
                        <div className='contenedor-listas-populares'>
                            <ListaChica_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15}></ListaChica_Card>
                            <ListaChica_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15}></ListaChica_Card>
                            <ListaChica_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15}></ListaChica_Card>
                            <ListaChica_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15}></ListaChica_Card>

                        </div>
                    </div>
                    <div className='grid-lista-2'>
                        <h2>Listas destacadas</h2>
                        <hr className='decorator-separator-lista decorator-separator-red-lista' />
                        <div className='contenedor-listas-destacadas'>
                            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15} descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
                            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15} descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
                            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15} descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
                            <ListaGrande_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15} descripcion={'Compilado de mis películas de acción favoritas. Explosiones! Muerte! Boom Boom!!'}></ListaGrande_Card>
                        </div>
                    </div>
                    <div className='grid-lista-3'>
                        <h2>Listas verified</h2>
                        <hr className='decorator-separator-lista decorator-separator-red-lista' />
                        <div className='contenedor-listas-verified'>
                            <ListaChica_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15}></ListaChica_Card>
                            <ListaChica_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15}></ListaChica_Card>
                            <ListaChica_Card imagen={PortadaPlaylist} titulo={'Favoritas de acción'} autor={'Kate'} likes={200} dislikes={2} num_peliculas={15}></ListaChica_Card>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Listas;