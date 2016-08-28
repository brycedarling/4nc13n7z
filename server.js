'use strict';

const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const sockets = [];
const entities = {};
var entityId = 0;

app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/login', function(req, res) {
  var name = req.body.name;
  var race = req.body.race;

  if (name && race) {
    entityId++;

    var entity = {
      id: entityId,
      name: name,
      race: race
    };

    res.send(JSON.stringify(entity));

    return;
  }

  res.status(401);
  res.end();
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

io.on('connection', socket => {
  console.log('CLIENT CONNECTED');

  sockets.push(socket);

  // TODO: get entity id from connection

  var entity = {
    id: entityId,
    type: 'player',
    race: 'alien', // TODO: fix...
    x: 160, // TODO: un-hardcode
    y: 250 // TODO: un-hardcode
  };

  entities[entity.id] = entity;

  socket.emit('add entities', entities);

  socket.broadcast.emit('add entity', entity);

  socket.on('disconnect', () => {
    console.log('CLIENT DISCONNECT');

    sockets.splice(sockets.indexOf(socket), 1); // TODO: sockets by id as well?

    delete entities[entity.id];

    socket.broadcast.emit('remove entity', entity);
  });

  socket.on('move entity', entity => {
    console.log('move entity', entity);

    // TODO: predict on client... lol
    io.emit('move entity', entity);
  });

  socket.on('update player position', playerPosition => {
    console.log('update player position', playerPosition);

    var player = entities[playerPosition.id];

    player.x = playerPosition.x;
    player.y = playerPosition.y;

    socket.broadcast.emit('update player position', playerPosition);
  })
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
