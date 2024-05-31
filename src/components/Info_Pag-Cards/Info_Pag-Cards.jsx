import { useState } from "react";
import "./Info_Pag-Cards.css";

const Info_Page_Card = ({imagen, nombre_pag, texto_pag}) => {

    return (
        <div className="Info_pag">
            <div className="Imagen_container">
                <img className="Imagen_pag" src={imagen}></img>
            </div>
            <div className= "Info_container"> 
                <h3 className="Nombre_pag">{nombre_pag}</h3>
                <div className="mini_separador"></div>
                <p className="Texto_pag">{texto_pag}</p>
            </div>

        </div>
    )
}

export default Info_Page_Card;