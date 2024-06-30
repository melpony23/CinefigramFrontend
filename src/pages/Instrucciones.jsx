import "./Instrucciones.css"
import { useState } from 'react';
import Info_Page_Card from '../components/Info_Pag-Cards/Info_Pag-Cards';
import Carousel from 'react-bootstrap/Carousel';
import Landingpageview from '../../assets/Views/ViewsLandingPage/Landingpage_view.png';
import AboutUsView from '../../assets/Views/about_us_view.png';
import PropTypes from 'prop-types'; // Importa PropTypes

function AlertButton({ message, children }) {
    return (
        <button className='boton' onClick={() => alert(message)}>
            {children}
        </button>
    );
}

// Agrega PropTypes para validar props
AlertButton.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

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
                                    imagen={Landingpageview} texto_pag1={"En nuestra página de películas encontrarás todas las películas de nuestra plataforma, organizadas según popularidad y cantidad de reviews. Podrás leer las reviews que han dejado nuestros usuario, y si inicias sesión, podrás publicar reviews en cualquier película, además de dar like y dejar comentarios en otras reviews."} nombre_pag={"Landing page"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={Landingpageview} texto_pag1={"En nuestra página de películas encontrarás todas las películas de nuestra plataforma, organizadas según popularidad y cantidad de reviews. Podrás leer las reviews que han dejado nuestros usuario."}
                                    texto_pag2={"Una vez que inicies sesión con tu cuenta, podrás publicar reviews en cualquier película, además de dar like y dejar comentarios en otras reviews."} nombre_pag={"Películas"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={Landingpageview} texto_pag1={"En nuestra página 'Listas' podrás encontrar las listas más populares del momento. Pincha una lista que te interese para ver todas las películas en la lista. Utiliza las tags para filtrar las listas que te interesan."}
                                    texto_pag2={"Una vez que inicies sesión con tu cuenta, podrás darle like y comentar en tus listas favoritas."} nombre_pag={"Listas"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={Landingpageview} texto_pag1={"En nuestra página 'Comunidad' podrás conocer a los reviewers más populares del momento. Pincha un perfil para conocer más acerca del reviewer y sus publicaciones. Usa el buscador de usuarios para encontrar a cualquier reviewer que te interese."}
                                    texto_pag2={"Una vez que inicies sesión con tu cuenta, podrás seguir a tus reviewers favoritos y mantenerte al tanto de sus publicaciones. Además de esto, podrás chatear con tus amigos."} nombre_pag={"Comunidad"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='container_cards'>
                                <Info_Page_Card
                                    imagen={AboutUsView} texto_pag1={"En nuestra página 'Sobre nosotros' podrás encontrar infomación acerca del equipo que diseñó y programó la página."}
                                    texto_pag2={"Visitala para conocernos!"} nombre_pag={"Sobre nosotros"}>
                                </Info_Page_Card>
                            </div>
                        </Carousel.Item>

                    </Carousel>
                </div>
                <div className='separador_chico'></div>
                <div className='Botones'>
                    <p className='texto_boton'> ¿Te sirvió esta información?</p>
                    <AlertButton message={"¡Que bueno que te sirvió! Estas list@ para disfrutar de Cinefigram."}> Si </AlertButton>
                    <AlertButton message={"Lamentamos escuchar esto. Contáctate con soporte para más info."}> No </AlertButton>
                </div>

            </div>

        </div>

    );
};

export default Instrucciones;
