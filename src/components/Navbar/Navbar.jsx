import React, { useState, useEffect, useContext } from "react";
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

  const config = {
      'method' : 'get',
      'url': `${VITE_BACKEND_URL}scope/protecteduser`,
      'headers': {
          'Authorization' : `Bearer ${token}`
      }
  }

  useEffect(() => {
      axios(config).then((response) => {
          console.log("Enviaste un token bueno y estas logueado");
          console.log(response)
          setIsAuthenticated(true);  // Usuario está autenticado
      }).catch((error) => {
          console.log("Hubo un error, no estas logueado");
          console.log(error);
          console.log(token);
          setIsAuthenticated(false);  // Token no válido o error en la autenticación

      })
  }, [])

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