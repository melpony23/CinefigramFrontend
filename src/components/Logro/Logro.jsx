import PropTypes from 'prop-types';
import './Logro.css';

const Logro = (props) => {
    const { titulo, logo } = props; 

    return (
        <div className='Card_logro'>
            <div className='contenedor_imagen_logo'>
                <img src={logo} className='imagen_logro' alt="Logro Logo" />
            </div>
            <div className='contenedor_info_logo'>
                <h2>{titulo}</h2>
            </div>
        </div>
    );
};

// Define PropTypes para el componente
Logro.propTypes = {
    titulo: PropTypes.string.isRequired, 
    logo: PropTypes.string.isRequired 
};

export default Logro;
