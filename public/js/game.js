class Game {
  constructor() {
    this.isRunning = false;

    this.entities = {};

    this.playerPositions = {};
  }

  run() {
    this.isRunning = true;

    var socket = this.socket = io.connect();

    socket.on('add entities', this.addEntities.bind(this));

    socket.on('add entity', this.addEntity.bind(this));

    socket.on('remove entity', this.removeEntity.bind(this));

    socket.on('move entity', this.moveEntity.bind(this));

    // TODO: do this periodic syncing stuff
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

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  }

  addEntities(entities) {
    console.log('add entities', entities);

    for (var id in entities) {
      this.addEntity(entities[id]);
    }
  }

  addEntity(data) {
    console.log('add entity', data);

    var entity = new Player({
      id: data.id,
      x: data.x,
      y: data.y
    });

    if (entity.id == game.playerId) {
      this.player = entity;
    }

    this.entities[entity.id] = entity;
  }

  removeEntity(data) {
    console.log("REMOVE ENTITY")

    delete this.entities[data.id];
  }

  moveEntity(data) {
    // console.log('move entity', data)

    var entity = this.entities[data.id];

    var impulseX = data.x || 0;
    var impulseY = data.y || 0;

    entity.move(impulseX, impulseY);
  }

  updatePlayerPosition(playerPosition) {
    this.playerPositions[playerPosition.id] = playerPosition;
  }
}
