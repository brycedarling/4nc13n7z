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

    socket.on('punch', this.punch.bind(this));

    socket.on('attack', this.attack.bind(this));
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

    var entity = this.game.entities[data.id];

    entity.removeBodies();

    delete this.game.entities[data.id];
  }

  moveEntity(data) {
    // console.log('move entity', data)

    var entity = this.game.entities[data.id];

    var impulseX = data.x || 0;
    var impulseY = data.y || 0;

    entity.move(impulseX, impulseY);

    if (data.isFacingRight) {
      entity.faceRight();
    } else {
      entity.faceLeft();
    }
  }

  punch(data) {
    var entity = this.game.entities[data.id];

    var impulseX = data.x || 0;
    var impulseY = data.y || 0;

    const hand = entity.arm.bodies[3]; // entity.hand

    Matter.Body.applyForce(hand, hand.position, {
      x: impulseX,
      y: impulseY
    });
  }

  attack(data) {
    const game = this.game;

    const victim = game.entities[parseInt(data.victim)];

    victim.health -= data.damage;

    if (victim.health <= 0) {
      console.log('play kill at', data.position)
      Matter.World.remove(game.world, victim.headConstraint);
    } else {
      console.log('play impact at', data.position)
    }
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
