import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import logo from '../../assets/Logo_horizontal_png.png'; // Asegúrate de que la ruta sea correcta

export const Navbar = () => {
    return (
        <header className="p-3 custom-navbar">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/home" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img src={logo} alt="Logo" width="120" height="40" className="me-2" />
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/login" className="nav-link px-2 nav-link-yellow ">Iniciar Sesión</Link></li> 
                        <li><Link to="/sign-up" className="nav-link px-2 nav-link-yellow">Crear Cuenta</Link></li>
                        <li><Link to="/peliculas" className="nav-link px-2">Peliculas</Link></li>
                        <li><Link to="/listas" className="nav-link px-2">Listas</Link></li>
                        <li><Link to="/comunidad" className="nav-link px-2">Comunidad</Link></li>
                        <li><Link to="/nosotros" className="nav-link px-2">Sobre nosotros</Link></li>
                    </ul>
                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex align-items-center" role="search">
                        <div className="input-group">
                            <input type="search" className="form-control rounded-pill pl-4" style={{ fontFamily: 'Inter, sans-serif' }} placeholder="Buscar..." aria-label="Buscar" />
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
};
