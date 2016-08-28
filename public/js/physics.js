class Physics {
  constructor(game) {
    this.game = game;

    this.lastMouseX = null;
    this.lastMouseY = null;
    this.attractionCounter = 0;

    this.isPunchReady = true;
    this.punchCounter = 0;
    this.punchedAt = null;

    this.combatCounter = 0;

    const events = this.events = [];

    const afterUpdate = Matter.Events.on(game.engine, 'afterUpdate', e => {
      // this.attractHand();

      this.punchAttack();

      // TODO: syncEntityPositions();
    });

    const collisionStart = Matter.Events.on(game.engine, 'collisionStart', e => {
      this.handleCombat(e);
    });

    // const collisionActive = Matter.Events.on(game.engine, 'collisionActive', e => {
    //   console.log("COLLISION ACTIVE", e)
    // });
    //
    // const collisionEnd = Matter.Events.on(game.engine, 'collisionEnd', e => {
    //   console.log("COLLISION END", e)
    // });

    events.push(afterUpdate);
    events.push(collisionStart);
    // events.push(collisionActive);
    // events.push(collisionEnd);
  }

  handleCombat(e) {
    if (this.punchedAt == null) return;

    const game = this.game;

    const player = game.player;

    const playerId = player.id;

    e.pairs.forEach(pair => {
      // if ((pair.bodyA.isHand || pair.bodyB.isHand) && (pair.bodyA.isHead || pair.bodyB.isHead)) {
      // console.log('head or hand')
      // }

      if (this.punchedAt != null &&
        typeof pair.bodyA.playerId != 'undefined' &&
        typeof pair.bodyB.playerId != 'undefined' &&
        pair.bodyA.playerId != pair.bodyB.playerId) {
        if (pair.bodyA.playerId != playerId || pair.bodyB.playerId != playerId) {
          // if ((pair.bodyA.isHand || pair.bodyB.isHand) && (pair.bodyA.isHead || pair.bodyB.isHead)) {
          var victimId = pair.bodyA.playerId != playerId ? pair.bodyA.playerId : pair.bodyB.playerId;

          console.log("ATTACK!!!11", playerId, victimId)

          if (game && game.net && game.net.socket && game.net.socket.connected) {
            game.net.socket.emit('attack', {
              attacker: playerId,
              victim: victimId
            });
          }

          this.punchedAt = null;
          // }
        }
      }
    })
  }

  // attractHand() {
  //   const game = this.game;
  //
  //   const hand = game.player.hand;
  //
  //   if (!hand) return;
  //
  //   const mouse = game.mouse;
  //
  //   // every second reset mouse attraction
  //   if (this.attractionCounter >= 60 * 1) {
  //     // prevent if mouse hasn't moved in last second
  //     if (mouse.x == this.lastMouseX && mouse.y == this.lastMouseY) {
  //       return;
  //     } else {
  //       this.attractionCounter = 0;
  //       return;
  //     }
  //   }
  //
  //   this.lastMouseX = mouse.x;
  //   this.lastMouseY = mouse.y;
  //
  //   this.attractionCounter++;
  //
  //   const handPosition = hand.position;
  //   var handX = handPosition.x
  //   var handY = handPosition.y;
  //
  //   var impulseX = 0;
  //   var impulseY = 0;
  //
  //   var forceMagnitude = 0.005;
  //
  //   if (mouse.x > handX) {
  //     impulseX += forceMagnitude;
  //   } else if (mouse.x < handX) {
  //     impulseX -= forceMagnitude;
  //   }
  //
  //   if (mouse.y > handY) {
  //     impulseY += forceMagnitude;
  //   } else if (mouse.y < handY) {
  //     impulseY -= forceMagnitude;
  //   }
  //
  //   Matter.Body.applyForce(hand, handPosition, {
  //     x: impulseX,
  //     y: impulseY
  //   });
  // }

  punchAttack() {
    const game = this.game;

    if (!game) return;

    const player = game.player;

    if (!player) return;

    const arm = player.arm;

    if (!arm || !arm.bodies || !arm.bodies.length) return;

    const hand = player.arm.bodies[3]; // player.hand;

    if (!hand) return;

    const mouse = game.mouse;

    // every second reset punchability
    if (this.punchCounter >= 60 * 1) {
      this.punchCounter = 0;
      this.isPunchReady = true;
      this.punchedAt = null;
    }

    this.punchCounter++;

    if (!mouse.isPressed || !this.isPunchReady) {
      return;
    }

    console.log('PUNCH')

    this.isPunchReady = false;
    this.punchedAt = Date.now();

    const handPosition = hand.position;
    var handX = handPosition.x
    var handY = handPosition.y;

    var impulseX = 0;
    var impulseY = 0;

    var forceMagnitude = 0.5;

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

    if (impulseX != 0 || impulseY != 0) {
      if (game && game.net && game.net.socket && game.net.socket.connected) {
        game.net.socket.emit('punch', {
          id: player.id,
          x: impulseX,
          y: impulseY
        });
      }
    }
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
