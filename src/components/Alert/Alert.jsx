// Alert.jsx
// Componente alert con ayuda de chat GPT

import React from 'react';
import { FaCheckCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa'; 
import './Alert.css';

const Alert = ({ message, type }) => {
    let icon;
    switch (type) {
        case 'success':
            icon = <FaCheckCircle className="custom-alert-icon" />;
            break;
        case 'error':
            icon = <FaTimes className="custom-alert-icon" />;
            break;
        case 'warning':
            icon = <FaExclamationTriangle className="custom-alert-icon" />;
            break;
        default:
            icon = null;
    }

    return (
        <div className={`custom-alert custom-alert-${type}`}>
            {icon}
            <div className="custom-alert-message">
                {message}
            </div>
        </div>
    );
};

export default Alert;
