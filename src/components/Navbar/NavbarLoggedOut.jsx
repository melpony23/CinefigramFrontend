import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import logo from '../../../assets/Logo_horizontal_png.png';

export const NavbarLoggedOut = ({ navToggle, active, icon, showLinks }) => {
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

                <div className={showLinks ? "links-container show-links" : "links-container"}>
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

// Define propTypes para las props
NavbarLoggedOut.propTypes = {
    navToggle: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    showLinks: PropTypes.bool.isRequired,
};

export default NavbarLoggedOut;
