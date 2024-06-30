import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes para la validación de tipos
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/Logo_horizontal_png.png';
import { AuthContext } from '../../auth/AuthContext';
import Alert from '../Alert/Alert';

const NavbarLoggedIn = ({ navToggle, active, icon, showLinks }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [id, setId] = useState(null);
    const [bannerMessage, setBannerMessage] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fotoPerfil = localStorage.getItem('fotoPerfil');
        if (fotoPerfil) {
            setProfileImage(fotoPerfil);
        }
        const StoredId = localStorage.getItem('id');
        if (StoredId) {
            setId(StoredId);
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        logout();
        showBannerMessage('Cierre de sesión exitoso', 'success');
        navigate('/');
        window.location.reload();
    };

    const showBannerMessage = (message) => {
        setBannerMessage(message);
        setShowBanner(true);

        setTimeout(() => {
            setShowBanner(false);
        }, 3000);
    };

    return (
        <header className="p-3 custom-navbar w-100">
            {showBanner && (
                <Alert message={bannerMessage} type="success" />
            )}
            <div className="d-flex justify-content-between align-items-center nav-margins">
                <Link to="/landing-user" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src={logo} alt="Logo" width="120" height="40" className="me-2" />
                </Link>

                <ul className={`nav-links ${active}`}>
                    <li><Link to="/peliculas" className="nav-link px-2">Peliculas</Link></li>
                    <li><Link to="/listas" className="nav-link px-2">Listas</Link></li>
                    <li><Link to="/comunidad" className="nav-link px-2">Comunidad</Link></li>
                    <li><Link to="/chats" className="nav-link px-2">Chats</Link></li>
                    <li><Link to="/nosotros" className="nav-link px-2">Sobre nosotros</Link></li>
                </ul>

                <div className="d-flex align-items-center">
                    <div onClick={navToggle} className={icon}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>

                    <div className={`links-container ${showLinks ? "show-links" : ""} d-flex align-items-center`}>
                        <div className="dropdown text-end ms-3">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" onClick={toggleDropdown} aria-expanded={dropdownOpen}>
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" width="32" height="32" className="rounded-circle" />
                                ) : (
                                    <img src="https://tualquiler.cr/wp-content/uploads/2017/03/default-user.png" alt="Default Profile" width="32" height="32" className="rounded-circle" />
                                )}
                            </a>
                            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                                <li><a className="dropdown-item" href="#">Notificaciones</a></li>
                                <li><a className="dropdown-item" href="#">Historial de peliculas</a></li>
                                <li><Link to={`/listas-user/${id}`} className='dropdown-item'>Mis listas </Link></li>
                                <li><Link to={`/perfil-propio/${id}`} className='dropdown-item'>Perfil</Link></li>
                                <li><Link to="/mi-cuenta" className='dropdown-item'>Mi cuenta</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" onClick={handleLogout}>Cerrar Sesion</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Validación de tipos para las props
NavbarLoggedIn.propTypes = {
    navToggle: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    showLinks: PropTypes.bool.isRequired,
};

export default NavbarLoggedIn;
