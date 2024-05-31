import React from 'react'
import "./Instrucciones.css"
import { useState } from 'react';
import Info_Page_Card from '../components/Info_Pag-Cards/Info_Pag-Cards';
import Carousel from 'react-bootstrap/Carousel';

function AlertButton({ message, children }) {
    return (
        <button className='boton' onClick={() => alert(message)}>
            {children}
        </button>
    );
}

export const Instrucciones = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <div className='contenido'>
            <div className='separador'></div>
            <div className='contenido_principal'>
                <div className='titulo'>
                    <h1 className='titulo_info_pag'>Sobre nuestra página</h1>
                </div>
                <div className='contenedor_carrusel'>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={"/src/assets/Landing_page.png"} texto_pag={"En nuestra página de películas encontrarás todas las películas de nuestra plataforma, organizadas según popularidad y cantidad de reviews. Podrás leer las reviews que han dejado nuestros usuario, y si inicias sesión, podrás publicar reviews en cualquier película, además de dar like y dejar comentarios en otras reviews."} nombre_pag={"Landing page"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={"/src/assets/Landing_page.png"} texto_pag={"En nuestra página de películas encontrarás todas las películas de nuestra plataforma, organizadas según popularidad y cantidad de reviews. Podrás leer las reviews que han dejado nuestros usuario, y si inicias sesión, podrás publicar reviews en cualquier película, además de dar like y dejar comentarios en otras reviews."} nombre_pag={"Películas"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={"/src/assets/Landing_page.png"} texto_pag={"En nuestra página de películas encontrarás todas las películas de nuestra plataforma, organizadas según popularidad y cantidad de reviews. Podrás leer las reviews que han dejado nuestros usuario, y si inicias sesión, podrás publicar reviews en cualquier película, además de dar like y dejar comentarios en otras reviews."} nombre_pag={"Listas"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={"/src/assets/Landing_page.png"} texto_pag={"En nuestra página de películas encontrarás todas las películas de nuestra plataforma, organizadas según popularidad y cantidad de reviews. Podrás leer las reviews que han dejado nuestros usuario, y si inicias sesión, podrás publicar reviews en cualquier película, además de dar like y dejar comentarios en otras reviews."} nombre_pag={"Comunidad"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={"/src/assets/Landing_page.png"} texto_pag={"En nuestra página de películas encontrarás todas las películas de nuestra plataforma, organizadas según popularidad y cantidad de reviews. Podrás leer las reviews que han dejado nuestros usuario, y si inicias sesión, podrás publicar reviews en cualquier película, además de dar like y dejar comentarios en otras reviews."} nombre_pag={"Sobre nosotros"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>

                    </Carousel>
                </div>
                <div className='separador_chico'></div>
                <div className='Botones'>
                    <p className='texto_boton'> ¿Te sirvió esta información?</p>
                    <AlertButton message={"¡Que bueno que te sirvió!"}> Si </AlertButton>
                    <AlertButton message={"Que lata bro"}> No </AlertButton>
                </div>

            </div>

        </div>

    );
};

export default Instrucciones;
