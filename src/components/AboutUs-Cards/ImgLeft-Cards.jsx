import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cards.css';
import './responsive.css';

export const ImgLeft = (props) => {
    const { imgUrl, integrante, descripcion } = props; // Desestructuración de las props

    return (
        <div className="Presentation-Card">
            <div className="ContenedorImg">
                <img src={imgUrl} alt="" />
            </div>
            <div className="ContenedorContenidos">
                <div className="Contenido">
                    <span className="titulo">
                        <span> </span>Amimir Team
                    </span>
                    <h2>{integrante}</h2>
                    <p>{descripcion}</p>
                </div>
            </div>
        </div>
    );
};

// Definir PropTypes para las propiedades esperadas
ImgLeft.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    integrante: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
};
