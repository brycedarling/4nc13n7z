'use strict';

const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;
const sockets = [];
const entities = [];
var id = 0;

app.use(express.static('public'));

app.post('/login', function(req, res) {
  res.send('hello world');
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

io.on('connection', socket => {
  console.log('CLIENT CONNECTED');

  sockets.push(socket);

  var entityId = id++;

  var entity = {
    id: entityId,
    type: 'player',
    race: 'alien', // TODO: fix
    x: 0,
    y: 0
  };

  entities.push(entity);

  socket.emit('add entities', entities);

  // TODO: emit broadcast add entity

  socket.on('disconnect', () => {
    console.log('CLIENT DISCONNECT');

    sockets.splice(sockets.indexOf(socket), 1);

    entities.splice(entities.indexOf(entity), 1);

    // TODO: emit remove entity
  });

  socket.on('move entity', entity => {
    console.log('move entity', entity);

    // TODO: predict on client lol
    io.emit('move entity', entity);
  });
});

// setInterval(() => {
//   sockets.forEach(socket => {
//     console.log('player move')
//     socket.emit('player move', {
//       id: 1,
//       x: 1
//     });
//   });
// }, 1000);
