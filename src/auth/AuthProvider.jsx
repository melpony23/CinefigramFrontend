import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from 'prop-types'; // Importa PropTypes

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    function logout() {
        localStorage.clear(); // Borra todo el localStorage
        setToken(null); // Resetea el estado del token
    }

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Añade la validación de propiedades
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
