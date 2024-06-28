import io from 'socket.io-client';

const socket = io('https://amimir-backend.onrender.com', {
  path: '/socket.io', // Asegúrate de que el path coincida con el configurado en el backend
  transports: ['websocket'], // Usa solo WebSocket para evitar el polling si no es necesario
});

export default socket;
