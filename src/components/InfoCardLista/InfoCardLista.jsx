import PropTypes from 'prop-types';
import './InfoCardLista.css';

const InfoCardLista = ({ autor, privacidad, show_privacidad, num_peliculas }) => {
    return (
        <div className='content_info_card_lista'>
            <div className='div_autor_lista'>
                <p className='info_lista autor'>{autor}</p>
            </div>
            <div className='div_num_peliculas'>
                <p className='info_lista'>{num_peliculas} movies</p>
            </div>
            {show_privacidad && (
                <div className='div_privacidad'>
                    <p className='info_lista'>Privacidad: {privacidad}</p>
                </div>
            )}
        </div>
    );
};

// Definir PropTypes para las propiedades esperadas
InfoCardLista.propTypes = {
    autor: PropTypes.string,
    num_peliculas: PropTypes.number,
    privacidad: PropTypes.string,
    show_privacidad: PropTypes.bool,
};

export default InfoCardLista;
