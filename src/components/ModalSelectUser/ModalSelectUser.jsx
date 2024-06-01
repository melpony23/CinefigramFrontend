// UserSelectModal.jsx ayuda chat gpt
import React from 'react';
import './ModalSelectUser.css';
import SearchBar from '../SearchBar/SearchBar';

const ModalSelectUser = ({ users, onClose, onSelectUser }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <SearchBar />
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => onSelectUser(user)}>
                <img src={user.imageUrl} alt={user.name} className="user-image" />
                {user.name}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalSelectUser;
