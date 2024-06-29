// socket.js (cliente)
import { io } from 'socket.io-client';

// Conexión sin token de acceso
const socket = io('wss://amimir-backend.onrender.com', {
  withCredentials: true // Solo si necesitas enviar cookies de sesión o similares
});

socket.on('connect', () => {
  console.log('Conexión establecida con el servidor WebSocket');
});

socket.on('message', (data) => {
  console.log('Nuevo mensaje recibido:', data);
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor WebSocket');
});

export default socket;


// export default socket;

// import io from 'socket.io-client';

// const socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor WebSocket

// export default socket;