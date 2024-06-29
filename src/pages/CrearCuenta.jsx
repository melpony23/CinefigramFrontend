import React, { useState } from 'react';
import axios from 'axios';
import "./CrearCuenta.css";
import { FaEye, FaEyeSlash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import Alert from '../components/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import VITE_BACKEND_URL from "/config";

export const CrearCuenta = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState('');
    const [bannerType, setBannerType] = useState('');

    const navigate = useNavigate();

    // Validación de contraseña
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);

    const handleChangePassword = (value) => {
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#\\$%\\^&\\*])');
        const length = new RegExp('(?=.{8,})');

        setNumberValidated(number.test(value));
        setSpecialValidated(special.test(value));
        setLengthValidated(length.test(value));
        setPassword(value);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validaciones
        if (!username || !email || !password || !descripcion || !fotoPerfil) {
            showBannerMessage('Por favor, complete todos los campos.', 'warning');
            return;
        }

        if (!numberValidated || !specialValidated || !lengthValidated) {
            showBannerMessage('La contraseña no cumple con los requisitos.', 'error');
            return;
        }

        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showBannerMessage('El formato del correo electrónico no es válido.', 'error');
            return;
        }

        // Envío de datos al servidor
        try {
            const response = await axios.post(`${VITE_BACKEND_URL}signup`, {
                username,
                email,
                contraseña: password,
                descripcion,
                fotoPerfil
            });

            showBannerMessage('Registro exitoso. Redirigiendo...', 'success');
            setTimeout(() => {
                navigate('/login');
                window.location.reload();
            }, 2000); // Retraso antes de redirigir

        } catch (error) {
            console.error('Error al registrar:', error);
            if (error.response && error.response.data) {
                showBannerMessage(error.response.data, 'error');
            } else {
                showBannerMessage('Error al registrar. Por favor, intente de nuevo.', 'error');
            }
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
        <div className='row'>
            {showBanner && <Alert message={bannerMessage} type={bannerType} />}
            <div className="col-md-5">
                <form onSubmit={handleSubmit}>
                    <div className='form-register'>
                        <div className='header-register'>
                            <h1 className='register-text-header'>Registrar usuario</h1>
                        </div>
                        <div className='inputs-register'>
                            <div className='form-group'>
                                <label className='register-text-label'>Usuario</label>
                                <input
                                    type='text'
                                    id='usuario'
                                    className='form-control'
                                    placeholder='Crea tu usuario'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='register-text-label'>Email</label>
                                <input
                                    type='text'
                                    id='email'
                                    className='form-control'
                                    placeholder='Ingresa tu correo'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='register-text-label'>Contraseña</label>
                                <div className='password-input'>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        id='password'
                                        className='form-control password-field'
                                        placeholder='Crea tu contraseña'
                                        value={password}
                                        onChange={(e) => handleChangePassword(e.target.value)}
                                    />
                                    <div className='password-toggle-icon' onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                {/* Tracker de validación */}
                                <div className='tracker-box'>
                                    <p>Tu Contraseña debe tener al menos:</p>
                                    <div className={numberValidated ? 'validated' : 'not-validated'}>
                                        <span className='list-icon'>
                                            {numberValidated ? <FaCheckCircle className="green" /> : <FaRegCircle />}
                                        </span>
                                        Un número
                                    </div>
                                    <div className={specialValidated ? 'validated' : 'not-validated'}>
                                        <span className='list-icon'>
                                            {specialValidated ? <FaCheckCircle className="green" /> : <FaRegCircle />}
                                        </span>
                                        Un carácter especial
                                    </div>
                                    <div className={lengthValidated ? 'validated' : 'not-validated'}>
                                        <span className='list-icon'>
                                            {lengthValidated ? <FaCheckCircle className="green" /> : <FaRegCircle />}
                                        </span>
                                        Ocho caracteres
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='register-text-label'>Descripción</label>
                                <input
                                    type='text'
                                    id='descripcion'
                                    className='form-control'
                                    placeholder='¡Preséntate con la comunidad!'
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='register-text-label'>Foto perfil</label>
                                <input
                                    type='text'
                                    id='foto'
                                    className='form-control'
                                    placeholder='(ingresa una url por el momento)'
                                    value={fotoPerfil}
                                    onChange={(e) => setFotoPerfil(e.target.value)}
                                />
                            </div>
                            <button type='submit' className='btn btn-primary form-control'>Registrarse</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-7">
                <div className='portada_img_register'></div>
            </div>
        </div>
    );
};

export default CrearCuenta;