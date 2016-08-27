class Game {
  constructor() {
    this.isRunning = false;

    // this.entities = {};
  }

  run() {
    this.isRunning = true;

    var socket = this.socket = io.connect();

    socket.on('add entities', this.addEntities.bind(this));

    socket.on('add entity', this.addEntity.bind(this));

    socket.on('remove entity', this.removeEntity.bind(this));

    socket.on('move entity', this.moveEntity.bind(this));

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  }

  addEntities(entities) {
    console.log('add entities', entities);

    entities.forEach(entity => {
      this.addEntity(entity);
    });
  }

  addEntity(entity) {
    console.log('add entity', entity);

    // var entity = {
    //   id: entityId,
    //   type: 'player',
    //   race: 'alien', // TODO: fix
    //   x: 0,
    //   y: 0
    // };

    var player = this.player = new Player();

    // this.entities[entity.id] = player;

    //   console.log("ADD ENTITY");
    //   this.entities[entity.id] = entity;
    //   console.log(this.entities)
  }

  removeEntity(entity) {
    console.log("REMOVE ENTITY")
    delete this.entities[entity.id];
    console.log(this.entities)
  }

  moveEntity(entity) {
    // TODO: find entity by id, then move it
    console.log('move entity', entity)

    var impulseX = entity.x || 0;
    var impulseY = entity.y || 0;

    game.player.legs.positionImpulse.x = impulseX;
    game.player.legs.positionImpulse.y = impulseY;
  }
}
