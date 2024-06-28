import React from 'react';
import "./ListasUser.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const ListasUser = () => {
    const navigate = useNavigate();

    return (
        <div className='Big_contenedor_listas_user'>
            <div className='titulo_listas_user'>
                <h1>Tus listas</h1>
                <h2>Revisa y crea listas para ti y para compartir con tus amigos</h2>
            </div>
            <div className='contenedor_listas_creadas'>

            </div>
            <div className='contenedor_boton_crear_lista'>
                <button className="cssbuttons-io" onClick={() => {navigate('/crear-lista')}}>
                    <span>Crear lista</span>
                </button>
            </div>
        </div>

    );

};

export default ListasUser;