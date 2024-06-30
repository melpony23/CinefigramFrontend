import PropTypes from 'prop-types';
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

// Definir PropTypes para las propiedades esperadas
Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
};

export default Alert;
