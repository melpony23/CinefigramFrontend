import InfoCardLista from '../InfoCardLista/InfoCardLista';
import './ListaGrande-Card.css';

const ListaGrande_Card = (props) => {
    const { imagen, titulo, descripcion, autor, likes, dislikes, num_peliculas } = props;

    return (
        <div className='Card_lista_grande'>
            <div className='div_imagen_lista_g'>
                <img src={imagen} className='Imagen_lista' />
            </div>
            <div className='div_info_playlist_g'>
                <div className='div_titulo_lista_g'>
                    <h3>{titulo}</h3>
                </div>
                <div className='div_stats_lista_g'>
                    <InfoCardLista autor={autor} likes={likes} dislikes={dislikes} num_peliculas={num_peliculas}></InfoCardLista>
                </div>
                <div className='div_descripcion_lista_g'>
                    <h4> {descripcion}</h4>
                </div>

            </div>
        </div>
    )
}

export default ListaGrande_Card;