import PropTypes from 'prop-types';
import './InfoCardLista.css';


const InfoCardLista = (props) => {
    const { autor, privacidad, show_privacidad, num_peliculas } = props;

    // const [like, setLike] = useState(likes);
    // const [isLike, setIsLike] = useState(false);

    // const [dislike, setDislike] = useState(dislikes);
    // const [isDislike, setIsDislike] = useState(false);

    // const onLikeButtonClick = () => {
    //     setLike(like + (isLike ? -1 : 1));
    //     setIsLike(!isLike);
    // };

    // const onDislikeButtonClick = () => {
    //     setDislike(dislike + (isDislike ? -1 : 1));
    //     setIsDislike(!isDislike);
    // };


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

// Definir PropTypes para las propiedades esperadas
InfoCardLista.propTypes = {
    autor: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    num_peliculas: PropTypes.number.isRequired,
};

export default InfoCardLista;
