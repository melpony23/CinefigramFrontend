// socket.js

import io from 'socket.io-client';

const socket = io('https://amimir-backend.onrender.com/'); // Utiliza la URL de tu servidor WebSocket

export default socket;
