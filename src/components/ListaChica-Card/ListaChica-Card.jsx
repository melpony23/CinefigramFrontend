import InfoCardLista from '../InfoCardLista/InfoCardLista';
import './ListaChica-Card.css';

const ListaChica_Card = (props) => {
    const { imagen, titulo, autor, likes, dislikes, num_peliculas } = props;
    return (
        <div className='Card_lista_chica'>
            <div className='div_imagen_lista_ch'>
                <img src={imagen} className='Imagen_lista' />
            </div>
            <div className='div_info_playlist_ch'>
                <div className='div_titulo_lista_c'>
                    <h3>{titulo}</h3>
                </div>
                <div className='div_stats_lista_c'>
                    <InfoCardLista autor={autor} likes={likes} dislikes={dislikes} num_peliculas={num_peliculas}></InfoCardLista>
                </div>

            </div>
        </div>
    )
}

export default ListaChica_Card;