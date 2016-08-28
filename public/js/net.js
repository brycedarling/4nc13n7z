class Net {
  constructor(game) {
    this.game = game;

    this.socket = null;

    // TODO: for periodic syncing
    // this.playerPositions = {};
  }

  connect() {
    const socket = this.socket = io.connect({
      query: $.param(this.game.player)
    });

    socket.on('add entities', this.addEntities.bind(this));

    socket.on('add entity', this.addEntity.bind(this));

    socket.on('remove entity', this.removeEntity.bind(this));

    socket.on('move entity', this.moveEntity.bind(this));
  }

  addEntities(entities) {
    console.log('add entities', entities);

    for (var id in entities) {
      this.addEntity(entities[id]);
    }
  }

  addEntity(data) {
    console.log('add entity', data);

    var player = new Player(this.game, {
      id: data.id,
      x: data.x,
      y: data.y
    });

    if (player.id == this.game.player.id) {
      this.game.player = player;
    }

    this.game.entities[player.id] = player;
  }

  removeEntity(data) {
    console.log("remove entity")

    delete this.game.entities[data.id];

    // TODO: actually remove from game world
  }

  moveEntity(data) {
    // console.log('move entity', data)

    var entity = this.game.entities[data.id];

    var impulseX = data.x || 0;
    var impulseY = data.y || 0;

    entity.move(impulseX, impulseY);
  }

  // TODO: for periodic syncing
  // updatePlayerPosition(playerPosition) {
  //   this.playerPositions[playerPosition.id] = playerPosition;
  // }

  // sync() {
  // socket.on('update player position', this.updatePlayerPosition.bind(this));

  // var previousX = -1;
  // var previousY = -1;

  // setInterval(() => {
  //   if (!this.player) return;
  //
  //   var x = this.player.legs.position.x;
  //   var y = this.player.legs.position.y;
  //
  //   if (x == previousX && y == previousY) return;
  //
  //   previousX = x;
  //   previousY = y;
  //
  //   var playerPosition = {
  //     id: this.player.id,
  //     x: x,
  //     y: y
  //   };
  //
  //   // console.log('update player position', playerPosition);
  //
  //   socket.emit('update player position', playerPosition);
  // }, 1000);
  // }
}
