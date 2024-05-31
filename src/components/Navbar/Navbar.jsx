import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import logo from '../../../assets/Logo_horizontal_png.png'

export const Navbar = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [showLinks, setShowLinks] = useState(false);

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
      setShowLinks(true);
    } else setIcon("nav__toggler");
  };

  return (
    <header className="p-3 custom-navbar w-100">
        <div className="d-flex justify-content-between align-items-center nav-margins">
            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <img src={logo} alt="Logo" width="120" height="40" className="me-2 " />
            </Link>

            <ul className={active}>
                <li><Link to="/login" className="nav-link px-2 nav-link-yellow ">Iniciar Sesión</Link></li> 
                <li><Link to="/sign-up" className="nav-link px-2 nav-link-yellow">Crear Cuenta</Link></li>
                <li><Link to="/peliculas" className="nav-link px-2">Peliculas</Link></li>
                <li><Link to="/listas" className="nav-link px-2">Listas</Link></li>
                <li><Link to="/comunidad" className="nav-link px-2">Comunidad</Link></li>
                <li><Link to="/nosotros" className="nav-link px-2">Sobre nosotros</Link></li>
            </ul>

            <div onClick={navToggle} className={icon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>

            <div className={showLinks? "links-container show-links" : "links-container"}>
                <form className="col-12 col-lg-auto mb-1 mb-lg-0 me-lg-3 d-flex align-items-center" role="search">
                <div className="input-group">
                    <input type="search" className="form-control rounded-pill pl-4" style={{ fontFamily: 'Inter, sans-serif' }} placeholder="Buscar..." aria-label="Buscar" />
                </div>
                </form>
                <Link to="/instrucciones">
                <button className="button" data-text="Awesome">
                    <span className="actual-text">&nbsp;instrucciones&nbsp;</span>
                    <span aria-hidden="true" className="hover-text">&nbsp;instrucciones&nbsp;</span>
                </button>
                </Link>
            </div>
        </div>
    </header>
  );
};