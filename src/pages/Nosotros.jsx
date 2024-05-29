import React from 'react'
import "./Nosotros.css"
import {ImgLeft} from "../components/AboutUs-Cards/ImgLeft-Cards"
import {ImgRight} from "../components/AboutUs-Cards/ImgRight-Cards"
import logo from "../assets/Logo_png.png"
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
            <div className='separador'><h2>s</h2></div>
            <div className=''>
                <ImgLeft imgUrl = {logo} integrante="¿Quienes Somos?" descripcion="Somos un grupo de estudiantes de la universidad catolica de chile, amantes de las peliculas y la programacion.
                Este sitio web es nuestro proyecto para el curso IIC2513, consiste en una red social para fanaticos del cine, donde los usuarios puedan compartir sus opiniones sobre películas, rankearlas, 
                crear playlists de películas e incluso crear parties para ver películas con sus amigos."/>
            </div>
            <div className='fade-in'>
                <ImgRight imgUrl = {imgPrueba} integrante="Kate" descripcion="HOLAKJKHSAFKJFKAJHSJAGJHGFKYGJYGEKFUEYAGKYFGA
                sdddssssssssssssssssssssssssssssssss\n"/>
            </div>
            <div className='fade-in'>
                <ImgRight imgUrl = {imgPrueba} integrante="Mel" descripcion="HOLAKJKHSakdhfalksjdflkdjhladfkalksdjfalksdjfaklsjd.
                hfakdsjfhalksjlkdfhasdk.fkjashdlkajsfhlakjh.ajfhkshfkad.
                skjdfalksdjfaslkjdfaslkdjalsdjflaksdjfalksdfjlaksdjfalsk"/>
            </div>
            <div className='fade-in'>
                <ImgRight imgUrl = {imgPrueba} integrante="Vice" descripcion="HOLAKJKHSakdhfalksjdflkdjhladfkalksdjfalksdjfaklsjd
                ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"/>
            </div>

        </div>
    );
};

export default Nosotros;
