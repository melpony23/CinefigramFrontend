import PropTypes from 'prop-types';
import "./Info_Pag-Cards.css";

const Info_Page_Card = ({ imagen, nombre_pag, texto_pag1, texto_pag2 }) => {
    return (
        <div className="Info_pag">
            <div className="Imagen_container">
                <img className="Imagen_pag" src={imagen} alt={nombre_pag} />
            </div>
            <div className="Info_container">
                <h3 className="Nombre_pag">{nombre_pag}</h3>
                <div className="mini_separador"></div>
                <p className="Texto_pag">{texto_pag1}</p>
                <p className="Texto_pag">{texto_pag2}</p>
            </div>
        </div>
    );
};

// Definir PropTypes para las propiedades esperadas
Info_Page_Card.propTypes = {
    imagen: PropTypes.string.isRequired, // Se espera una URL como cadena
    nombre_pag: PropTypes.string.isRequired, // Nombre de la página como cadena
    texto_pag1: PropTypes.string.isRequired, // Primer texto como cadena
    texto_pag2: PropTypes.string.isRequired, // Segundo texto como cadena
};

export default Info_Page_Card;
