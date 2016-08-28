class Physics {
  constructor(game) {
    this.game = game;

    const events = this.events = [];

    const afterUpdate = Matter.Events.on(game.engine, 'afterUpdate', e => {
      this.attractHand();

      // TODO: syncEntityPositions();
    });

    events.push(afterUpdate);
  }

  attractHand() {
    const game = this.game;

    const hand = game.player.hand;

    if (!hand) return;

    const mouse = game.mouse;

    mouse.attractionCounter += 1;

    // every sec reset mouse attraction
    if (mouse.attractionCounter >= 60 * 1) {
      mouse.x = null;
      mouse.y = null;
    }

    const handPosition = hand.position;
    var handX = handPosition.x
    var handY = handPosition.y;

    var impulseX = 0;
    var impulseY = 0;

    var forceMagnitude = 0.005;

    if (mouse.x > handX) {
      impulseX += forceMagnitude;
    } else if (mouse.x < handX) {
      impulseX -= forceMagnitude;
    }

    if (mouse.y > handY) {
      impulseY += forceMagnitude;
    } else if (mouse.y < handY) {
      impulseY -= forceMagnitude;
    }

    Matter.Body.applyForce(hand, handPosition, {
      x: impulseX,
      y: impulseY
    });
  }

  // TODO: syncEntityPositions() {
  //   for (var id in game.playerPositions) {
  //     if (!game.entities.hasOwnProperty(id)) return;
  //
  //     var playerPosition = game.playerPositions[id];
  //
  //     var player = game.entities[id];
  //
  //     if (player.legs.positionImpulse.x != 0 ||
  //       player.legs.positionImpulse.y != 0) return;
  //
  //     var impulseX = 0;
  //     var impulseY = 0;
  //
  //     if (player.legs.position.x < playerPosition.x) {
  //       impulseX += 1;
  //     } else if (player.legs.position.x > playerPosition.x) {
  //       impulseX -= 1;
  //     }
  //
  //     if (player.legs.position.y < playerPosition.y) {
  //       impulseY += 1;
  //     } else if (player.legs.position.y > playerPosition.y) {
  //       impulseY -= 1;
  //     }
  //
  //     player.move(impulseX, impulseY);
  //   }
  // }
}
