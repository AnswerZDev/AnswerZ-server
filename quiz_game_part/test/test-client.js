const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', async () => {
  console.log('Connected to server');
});

socket.on('roomId', (roomId) => {
  console.log('Room ID:', roomId);
  // Vous pouvez utiliser l'ID de la room comme vous le souhaitez ici
});

socket.on('roomUsers', (users) => {
  console.log('Users in the room:', users);
});

socket.on('chat', (message) => {
  console.log('Message from server:', message);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
