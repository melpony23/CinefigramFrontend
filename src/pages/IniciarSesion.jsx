import React, { useState } from 'react';
import "./IniciarSesion.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

/*Referencias: GreatStack. (2023, August 14). How to make sign in & sign up form using REACT JS 
| ReactJS Login & Registration Form [Video]. YouTube. https://www.youtube.com/watch?v=8QgQKRcAUvM

Y chat Gpt para ayudarme a manejar los estilos y formatos de cada campo, ademas de manejar el estilo del 
boton de ocultar y ver password*/

export const IniciarSesion = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='row'>
            <div className="col-7">
                <div className='portada_img_login'></div>
            </div>
            <div className="col-md-5">
                <div className='form-login'>
                    <div className='header-login'>
                        <h1 className='login-text-header'>Iniciar Sesión</h1>
                    </div>
                    <div className='inputs-login'>
                        <div className='form-group'>
                            <label className='login-text-label'>Usuario</label>
                            <input type='text' id='usuario' className='form-control' placeholder='Ingrese su usuario'/>
                        </div>
                        <div className='form-group'>
                            <label className='login-text-label'>Contraseña</label>
                            <div className='password-input'>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id='password'
                                    className='form-control password-field' // añadir una clase para el campo de contraseña
                                    placeholder='Ingrese su contraseña'
                                />
                                <div className='password-toggle-icon' onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary form-control'>Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IniciarSesion;
