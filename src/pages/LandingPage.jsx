import React from 'react';
import "./LandingPage.css";

export const LandingPage = () => {
    return (
        <div className='landing'>
            <div className='portada_img'>
                <div className='card-presentation'>
                    <h1 className='font-custome-tittle'>Cinefigram</h1>
                    <h3>La red social para los amantes del cine</h3>
                    {/* button from: https://uiverse.io/adamgiebl/pink-chicken-70 */}
                    <button className="cssbuttons-io">
                        <span>Únete hoy!</span>
                    </button>
                </div>
            </div>
            <div className='grid-container'>
                {/* Contenido de Películas destacadas */}
                <div className='grid-item'>
                    <h4 className='font-custome-tittle card-title'>Películas destacadas</h4>
                    <hr className='decorator-separator decorator-separator-red'/>
                </div>
                {/* Contenido de Listas populares */}
                <div className='grid-item'>
                    <h4 className='font-custome-tittle card-title'>Listas populares</h4>
                    <hr className='decorator-separator decorator-separator-yellow'/>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
