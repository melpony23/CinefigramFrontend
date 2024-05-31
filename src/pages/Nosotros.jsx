import React from 'react'
import "./Nosotros.css"
import {ImgLeft} from "../components/AboutUs-Cards/ImgLeft-Cards"
import {ImgRight} from "../components/AboutUs-Cards/ImgRight-Cards"
import fotoMel from "../assets/Foto_Mel.jpg"
import fotoKate from "../assets/Foto_kate.jpg"
import fotoVice from "../assets/Foto_vice.jpg"
import logo from "../../assets/Logo_png.png"

export const Nosotros = () => {
    //Aca hay que poner las imagenes
    const imgPrueba = "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
    //Codigo para la animacion de aparicion
    window.addEventListener('scroll', function() {
        var components = document.querySelectorAll(".fade-in");
        for (var i = 0; i < components.length; i++) {
          var windowHeight = window.innerHeight;
          var top = components[i].getBoundingClientRect().top;
          var trigger = 25;
          if (top < windowHeight - trigger) {
            components[i].classList.add("visible");
          }
          else{
            components[i].classList.remove("visible");
          }
        }
      });
    return (
        <div className='ContenedorCards'>
            <br></br>
            <div className=''>
                <ImgLeft imgUrl = {logo} integrante="¿Quienes Somos?" descripcion="Somos un grupo de estudiantes de la universidad catolica de chile, amantes de las peliculas y la programacion.
                Este sitio web es nuestro proyecto para el curso IIC2513, consiste en una red social para fanaticos del cine, donde los usuarios puedan compartir sus opiniones sobre películas, rankearlas, 
                crear playlists de películas e incluso crear parties para ver películas con sus amigos."/>
            </div>
            <div className='fade-in'>
                <ImgRight imgUrl = {fotoKate} integrante="Kate" descripcion="Hola soy Kate. Estoy en el major de de software 
                con Minor en data science y soy de la generacion 2021. No tengo una pelicula favorita y soy Tauro."/>
            </div>
            <div className='fade-in'>
                <ImgRight imgUrl = {fotoMel} integrante="Mel" descripcion="Hola soy Mel. Estoy en el major de de software 
                y en el Minor de data science. Soy de la generacion 2021, mi pelicula favorita es flipped y soy Picsis."/>
            </div>
            <div className='fade-in'>
                <ImgRight imgUrl = {fotoVice} integrante="Vice" descripcion="Hola soy Vice. Estoy en el major de software y en el minor de
                de fundamentos de la computación. Soy de la generacion 2021, y no tengo pelicula favorita pero en su tiempo me gustaba mucho
                Manchester by the sea, tambien soy tauro.  "/>
            </div>

        </div>
    );
};

export default Nosotros;
