const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', async () => {
  console.log('Connected to server');

  socket.emit("WantAddToRoom", "ROOM_ID");
});

socket.on('roomId', (roomId) => {
  console.log('Room ID:', roomId);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
