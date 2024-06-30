import React, { useState } from 'react';
import './InfoCardLista.css';

const InfoCardLista = (props) => {
    const { autor, privacidad, show_privacidad, num_peliculas } = props;

    return (
        <div className='content_info_card_lista'>
            <div className='div_autor_lista'>
                <p className='info_lista autor'>{autor}</p>
            </div>
            <div className='div_num_peliculas'>
                <p className='info_lista'>{num_peliculas} movies</p>
            </div>
            <div className='div_privacidad'>
                <p className='info_lista'> {privacidad}</p>
            </div>
        </div>
    );
};

export default InfoCardLista;
