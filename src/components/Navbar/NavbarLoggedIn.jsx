import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios, { formToJSON } from 'axios'; // Importar Axios
import './Navbar.css';
import logo from '../../../assets/Logo_horizontal_png.png';

const NavbarLoggedIn = ({ navToggle, active, icon, showLinks }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null); // Estado para almacenar la URL de la imagen del perfil
    const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

    useEffect(() => {
        // Obtener el nombre de usuario del localStorage
        const username = localStorage.getItem('username');
        const fotoPerfil = localStorage.getItem('fotoPerfil');

        // Actualizar la imagen de perfil en el estado
        if (fotoPerfil) {
            setProfileImage(fotoPerfil);
        }

    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="p-3 custom-navbar w-100">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                        <Link to="/landing-user" className="d-flex align-items-center text-white text-decoration-none">
                            <img src={logo} alt="Logo" width="120" height="40" className="me-2" />
                        </Link>
                    </div>

                    <div className="col-auto">
                        <ul className={active}>
                            <li><Link to="/peliculas" className="nav-link px-2">Peliculas</Link></li>
                            <li><Link to="/listas" className="nav-link px-2">Listas</Link></li>
                            <li><Link to="/comunidad" className="nav-link px-2">Comunidad</Link></li>
                            <li><Link to="/nosotros" className="nav-link px-2">Sobre nosotros</Link></li>
                        </ul>
                    </div>

                    <div onClick={navToggle} className={icon}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>

                    <div className={`col-auto ${showLinks ? "show-links" : ""}`}>
                        <div className="d-flex align-items-center mb-1 mb-lg-0 me-lg-3">
                            <form className="input-group" role="search">
                                <input type="search" className="form-control rounded-pill pl-4" style={{ fontFamily: 'Inter, sans-serif' }} placeholder="Buscar..." aria-label="Buscar" />
                            </form>
                            <div className="dropdown text-end ms-3">
                                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" onClick={toggleDropdown} aria-expanded={dropdownOpen}>
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" width="32" height="32" className="rounded-circle" />
                                    ) : (
                                        <img src="https://tualquiler.cr/wp-content/uploads/2017/03/default-user.png" alt="Default Profile" width="32" height="32" className="rounded-circle" />
                                    )}
                                </a>
                                <ul className={dropdownOpen ? "dropdown-menu show" : "dropdown-menu"}>
                                    <li><a className="dropdown-item" href="#">New project...</a></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavbarLoggedIn;
