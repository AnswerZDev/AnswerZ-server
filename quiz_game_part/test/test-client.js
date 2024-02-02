const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connexion établie avec le serveur');
  socket.emit('chat', 'Hi, serv!');
});

// Écoutez l'événement 'message' du serveur
socket.on('message', (message) => {
  console.log('Message du serveur :', message);
});

// Écoutez l'événement de déconnexion
socket.on('disconnect', () => {
  console.log('Déconnexion du serveur');
});
