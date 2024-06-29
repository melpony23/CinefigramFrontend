import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CommentCard.css';
import axios from 'axios';
import VITE_BACKEND_URL from "/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";


export const CommentCard = (props) => {
    const navigate = useNavigate();
    const id = props.id
    const fecha = props.fecha
    const userId = props.userId
    const estado = props.estado
    const text = props.text
    const [user_info, setUser_info] = useState([]);
    const [gotUser_info, setGot] = useState(false);

    useEffect(() => {
        const getUser_info = async () => {
            try {
                const userResponse = await axios.get(`${VITE_BACKEND_URL}userPublic/${userId}`);
                setUser_info(userResponse.data);
                setGot(true);
            } catch (error) {
                console.log(error);
            }
        }

        if (userId && !gotUser_info) {
            getUser_info();
            }
        }, [userId, gotUser_info]);

    const handleDeleteClick = () => {
        props.deletefunction(props.id); //ESTA EN CommentPage
    };



      const handleEditClick = () => {
        if (userId == localStorage.getItem("userId")) {
            navigate(`/comment/edit/${id}`);
        } else {
            alert("Solo puedes editar Comentarios tuyas");
        }
    };




    return (
    <div className="comment-container" >
        <div className="comment-content">
            <div className="comment-header">
                <img src={user_info.fotoPerfil} alt="User" className="user-image" />
                <h4 className="user-name">{user_info.username} ha comentado lo siguiente:</h4>
            </div>
            <div className="comment-text">
                {text}
            </div>
            <div className="comment-footer">
                <div className="edit-section">
                    <div className="fecha-container">
                        {estado}
                        {fecha}
                    </div>
                    <div className="comment-botones">
                        <div className="flex-item">
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={handleEditClick}
                                style={{ cursor: "pointer", color: "#000", marginRight: "10px" }}
                            />
                            <p className="number-like">Editar</p>
                            </div>
                            <div className="flex-item">
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={handleDeleteClick}
                                style={{ cursor: "pointer", color: "#000" }}
                            />
                            <p className="number-like">Delete</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    );
};
