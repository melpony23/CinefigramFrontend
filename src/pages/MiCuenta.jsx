import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MiCuenta.css';
import Alert from '../components/Alert/Alert';
import VITE_BACKEND_URL from "/config";

export const MiCuenta = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState('');
    const [bannerType, setBannerType] = useState('');
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el token es válido
        const config = {
            method: 'get',
            url: `${VITE_BACKEND_URL}scope/protecteduser`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios(config)
            .then((response) => {
                console.log('Enviaste un token bueno y estas logueado');
                console.log(response);
            })
            .catch((error) => {
                console.log('Hubo un error, no estas logueado');
                console.log(error);
                setError(true);
                navigate('/login');
            });
    }, [token, navigate]);

    useEffect(() => {
        // Cargar los datos del localStorage al cargar el componente
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storedFotoPerfil = localStorage.getItem('fotoPerfil');
        const storedDescripcion = localStorage.getItem('descripcion');

        if (storedUsername) setUsername(storedUsername);
        if (storedEmail) setEmail(storedEmail);
        if (storedFotoPerfil) setFotoPerfil(storedFotoPerfil);
        if (storedDescripcion) setDescripcion(storedDescripcion);
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);
    };

    const handleFotoPerfilChange = (e) => {
        setFotoPerfil(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!email || !descripcion) {
            showBannerMessage('Por favor, complete todos los campos.', 'warning');
            return;
        }

        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showBannerMessage('El formato del correo electrónico no es válido.', 'error');
            return;
        }

        // Actualizar datos
        const config = {
            method: 'put',
            url: `${VITE_BACKEND_URL}users/${username}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                email,
                descripcion,
                fotoPerfil,
            },
        };

        try {
            await axios(config);
            // Actualizar localStorage con los nuevos valores
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('fotoPerfil', fotoPerfil);
            localStorage.setItem('descripcion', descripcion);

            showBannerMessage('Datos actualizados exitosamente', 'success');
            window.location.reload();
        } catch (error) {
            showBannerMessage('Error al actualizar los datos. Por favor, intente de nuevo.', 'error');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('¿Estás seguro que deseas borrar tu cuenta? Esta acción no se puede deshacer.')) {
            const config = {
                method: 'delete',
                url: `${VITE_BACKEND_URL}users/${username}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                await axios(config);
                localStorage.clear(); 
                showBannerMessage('Cuenta borrada exitosamente. Redirigiendo...', 'success');

                // Esperar 2 minutos (120,000 ms) antes de redirigir
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 3000); 

            } catch (error) {
                showBannerMessage('Error al intentar borrar la cuenta. Por favor, inténtelo de nuevo más tarde.', 'error');
            }
        }
    };

    const showBannerMessage = (message, type) => {
        setBannerMessage(message);
        setBannerType(type);
        setShowBanner(true);

        setTimeout(() => {
            setShowBanner(false);
        }, 3000); // 3 segundos para ocultar el banner
    };

    return (
        <div className='fondo-mi-cuenta'>
            <center>
                <h1 className='tittle-mi-cuenta'>Mi cuenta</h1>
            </center>
            <div className='mi-cuenta-contenedor'>
                {showBanner && <Alert message={bannerMessage} type={bannerType} />}
                {error && <div className="error-message">Hubo un error, no estás logueado.</div>}
                {!error && (
                    <form onSubmit={handleSubmit} className='form-mi-cuenta'>
                        <div className='form-group'>
                            <label>Username</label>
                            <input type='text' value={username} readOnly className='form-control' disabled />
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input 
                                type='email' 
                                value={email} 
                                onChange={handleEmailChange} 
                                className='form-control' 
                                placeholder='Ingrese su email'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Descripción</label>
                            <textarea 
                                value={descripcion} 
                                onChange={handleDescripcionChange} 
                                className='form-control' 
                                placeholder='Ingrese una descripción sobre usted'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Foto de Perfil (URL)</label>
                            <input 
                                type='text' 
                                value={fotoPerfil} 
                                onChange={handleFotoPerfilChange} 
                                className='form-control' 
                                placeholder='Ingrese la URL de su foto de perfil'
                            />
                            {fotoPerfil && (
                                <div className='preview-foto'>
                                    <img src={fotoPerfil} alt='Foto de perfil' className='img-preview' />
                                </div>
                            )}
                        </div>
                        <button type='submit' className='btn1 btn-primary'>Actualizar</button>
                        <br></br>
                        <button type='button' className='btn2 btn-danger' onClick={handleDeleteAccount}>Borrar Cuenta</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MiCuenta;
