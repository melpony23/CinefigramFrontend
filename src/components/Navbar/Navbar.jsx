import { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import NavbarLoggedOut from './NavbarLoggedOut';
import NavbarLoggedIn from './NavbarLoggedIn';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";

export const Navbar = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [showLinks, setShowLinks] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${VITE_BACKEND_URL}scope/protecteduser`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios(config).then((response) => {
      console.log("Enviaste un token bueno y estás logueado");
      console.log(response);
      setIsAuthenticated(true); 
    }).catch((error) => {
      console.log("Hubo un error, no estás logueado");
      console.log(error);
      console.log(token);
      setIsAuthenticated(false); 
    });
  }, [token]); // Añade token como dependencia

  const navToggle = () => {
    setActive(prevActive => prevActive === "nav__menu" ? "nav__menu nav__active" : "nav__menu");
    setIcon(prevIcon => prevIcon === "nav__toggler" ? "nav__toggler toggle" : "nav__toggler");
    setShowLinks(prevShowLinks => !prevShowLinks);
  };

  return (
    <>
      {isAuthenticated ? (
        <NavbarLoggedIn navToggle={navToggle} active={active} icon={icon} showLinks={showLinks} />
      ) : (
        <NavbarLoggedOut navToggle={navToggle} active={active} icon={icon} showLinks={showLinks} />
      )}
    </>
  );
};

export default Navbar;
