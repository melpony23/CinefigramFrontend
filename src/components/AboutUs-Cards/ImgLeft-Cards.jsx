import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './cards.css';
import './responsive.css';


export const ImgLeft = (props) => {
    const imgUrl = props.imgUrl
    const integrante = props.integrante
    const descripcion = props.descripcion
    return (
        <div className="Presentation-Card">
            <div className="ContenedorImg">
                <img src={imgUrl} alt=""></img>
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
