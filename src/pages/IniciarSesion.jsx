import React, { useContext, useState } from 'react';
import "./IniciarSesion.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Alert from '../components/Alert/Alert'; // Asegúrate de que la ruta sea correcta
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import VITE_BACKEND_URL from "/config";

export const IniciarSesion = () => {
    const { setToken } = useContext(AuthContext); // No es necesario obtener el token aquí
    const [username, setUsername] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState('');
    const [bannerType, setBannerType] = useState(''); // 'success', 'error', etc.
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setContraseña(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !contraseña) {
            showBannerMessage('Por favor, complete todos los campos.', 'warning');
            return;
        }

        try {
            const response = await axios.post(`${VITE_BACKEND_URL}login`, { username, contraseña });
            const accessToken = response.data.access_token;
            setToken(accessToken);

            try {
                const userResponse = await axios.get(`${VITE_BACKEND_URL}users/${username}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                // Almacenar datos del usuario en localStorage
                localStorage.setItem('username', userResponse.data.username);
                localStorage.setItem('fotoPerfil', userResponse.data.fotoPerfil);
                localStorage.setItem('descripcion', userResponse.data.descripcion);
                localStorage.setItem('verificacion', userResponse.data.verificacion);
                localStorage.setItem('email', userResponse.data.email);

                showBannerMessage('Inicio de sesión exitoso', 'success');
                setTimeout(() => {
                    navigate('/landing-user'); // Redirigir utilizando navigate
                    window.location.reload();
                }, 1000); // Retraso antes de redirigir

            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                showBannerMessage('Error al obtener datos del usuario.', 'error');
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            showBannerMessage('Error al iniciar sesión. Por favor, intente de nuevo.', 'error');
        }
    };

    const showBannerMessage = (message, type) => {
        setBannerMessage(message);
        setBannerType(type);
        setShowBanner(true);

        setTimeout(() => {
            setShowBanner(false);
        }, 5000); // El banner se oculta después de 5 segundos
    };

    return (
        <div>
            {showBanner && <Alert message={bannerMessage} type={bannerType} />}
            <div className='row'>
                <div className="col-7">
                    <div className='portada_img_login'></div>
                </div>
                <div className="col-md-5">
                    <form onSubmit={handleSubmit}>
                        <div className='form-login'>
                            <div className='header-login'>
                                <h1 className='login-text-header'>Iniciar Sesión</h1>
                            </div>
                            <div className='inputs-login'>
                                <div className='form-group'>
                                    <label className='login-text-label'>Usuario</label>
                                    <input 
                                        type='text' 
                                        id='usuario' 
                                        className='form-control' 
                                        placeholder='Ingrese su usuario'
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='login-text-label'>Contraseña</label>
                                    <div className='password-input'>
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            id='password'
                                            className='form-control password-field'
                                            placeholder='Ingrese su contraseña'
                                            value={contraseña}
                                            onChange={handlePasswordChange}
                                        />
                                        <div className='password-toggle-icon' onClick={togglePasswordVisibility}>
                                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className='btn btn-primary form-control'>Iniciar Sesión</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default IniciarSesion;
