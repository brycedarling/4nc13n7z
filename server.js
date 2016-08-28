'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const World = require('./world');
const world = new World();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/login', function(req, res) {
  const name = req.body.name;
  const race = req.body.race;

  if (name && race) {
    const player = {
      id: ++world.playerId,
      name: name,
      race: race
    };

    res.send(JSON.stringify(player));
  } else {
    res.status(401);
    res.end();
  }
});

io.use(function(socket, next) {
  socket.playerId = socket.request._query['id'];
  socket.playerName = socket.request._query['name']
  socket.playerRace = socket.request._query['race'];

  next();
});

io.on('connection', socket => {
  world.onConnection(io, socket);
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
