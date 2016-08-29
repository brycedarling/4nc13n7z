'use strict';

class World {
  constructor() {
    this.entities = {};

    this.playerId = 0;

    this.spawnPoint = 0;

    this.spawnPoints = [{
      x: 150,
      y: 230
    }, {
      x: 300,
      y: 230
    }, {
      x: 450,
      y: 230
    }];
  }

  getNextSpawnPoint() {
    return this.spawnPoints[this.spawnPoint++ % this.spawnPoints.length];
  }

  onConnection(io, socket) {
    const spawnPoint = this.getNextSpawnPoint();

    const player = {
      id: socket.playerId,
      name: socket.playerName,
      race: socket.playerRace,
      x: spawnPoint.x,
      y: spawnPoint.y
    };

    console.log('CONNECTED', player.id);

    this.entities[player.id] = player;

    socket.on('disconnect', () => {
      console.log('DISCONNECTED', player.id);

      delete this.entities[player.id];

      socket.broadcast.emit('remove entity', player);
    });

    socket.emit('add entities', this.entities);

    socket.broadcast.emit('add entity', player);

    socket.on('move entity', entity => {
      // console.log('move entity', entity);

      // TODO: predict on client... lol
      io.emit('move entity', entity);
    });

    socket.on('punch', data => {
      io.emit('punch', data);
    });

    socket.on('attack', data => {
      io.emit('attack', data);
    });

    // TODO: for periodic syncing
    // socket.on('update player position', playerPosition => {
    //   console.log('update player position', playerPosition);
    //
    //   var player = entities[playerPosition.id];
    //
    //   player.x = playerPosition.x;
    //   player.y = playerPosition.y;
    //
    //   socket.broadcast.emit('update player position', playerPosition);
    // });
  }
}

module.exports = World;

// setInterval(() => {
//   sockets.forEach(socket => {
//     console.log('player move')
//     socket.emit('player move', {
//       id: 1,
//       x: 1
//     });
//   });
// }, 1000);
