import './Logro.css';

const Logro = (props) => {
    const {titulo, descripcion, logo} = props;

    return (
        <div className='Card_logro'>
            <div className='contenedor_imagen_logo'>
                <img src={logo} className='imagen_logro'/>
            </div>
            <div className='contenedor_info_logo'>
                <h2>{titulo}</h2>
            </div>

        </div>

    )
}

export default Logro;