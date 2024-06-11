import React, { useState } from 'react';
import "./CrearCuenta.css";
import { FaEye, FaEyeSlash, FaExclamationCircle, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

/*Implementacion de la componente dinamica con ayuda de chat Gpt */

export const CrearCuenta = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [type, setType] = useState('password');

    // Estados de validación
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);

    const handleChange = (value) => {
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#\\$%\\^&\\*])');
        const length = new RegExp('(?=.{8,})');

        setNumberValidated(number.test(value));
        setSpecialValidated(special.test(value));
        setLengthValidated(length.test(value));
    };

    return (
        <div className='row'>
            <div className="col-md-5">
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
                            />
                        </div>
                        <div className='form-group'>
                            <label className='register-text-label'>Email</label>
                            <input
                                type='text'
                                id='email'
                                className='form-control'
                                placeholder='Ingresa tu correo'
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
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                                <div className='password-toggle-icon' onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {/* Tracker de validación */}
                            <div className='tracker-box'>
                                <div className={numberValidated ? 'validated' : 'not-validated'}>
                                    <span className='list-icon'>
                                        {numberValidated ? <FaCheckCircle className="green" /> : <FaRegCircle />}
                                    </span>
                                    Al menos un número
                                </div>
                                <div className={specialValidated ? 'validated' : 'not-validated'}>
                                    <span className='list-icon'>
                                        {specialValidated ? <FaCheckCircle className="green" /> : <FaRegCircle />}
                                    </span>
                                    Al menos un carácter especial
                                </div>
                                <div className={lengthValidated ? 'validated' : 'not-validated'}>
                                    <span className='list-icon'>
                                        {lengthValidated ? <FaCheckCircle className="green" /> : <FaRegCircle />}
                                    </span>
                                    Al menos 8 caracteres
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
                            />
                        </div>
                        <div className='form-group'>
                            <label className='register-text-label'>Foto perfil</label>
                            <input
                                type='text'
                                id='foto'
                                className='form-control'
                                placeholder='Campo para archivo img'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary form-control'>Registrarse</button>
                    </div>
                </div>
            </div>
            <div className="col-7">
                <div className='portada_img_register'></div>
            </div>
        </div>
    );
};

export default CrearCuenta;
