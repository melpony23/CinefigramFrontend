// socket.js
import io from 'socket.io-client';

// Usa la URL completa proporcionada por OnRender
const socket = io('https://amimir-backend.onrender.com', {
  path: '/socket.io', // Asegúrate de que este path coincida con el backend
  transports: ['websocket'], // Usa solo WebSocket para evitar el polling si no es necesario
});

export default socket;

// // socket.js

// import io from 'socket.io-client';

// const socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor WebSocket

// export default socket;