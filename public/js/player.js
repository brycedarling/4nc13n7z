class Player {
  constructor(game, options) {
    this.game = game;

    options = options || {};

    this.id = options.id;
    this.name = options.name;
    this.race = options.race;

    this.health = 1000;

    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isJumping = false;
    this.isFacingRight = false;

    this.bodies = this.createBodies(options);
  }

  createBodies(options) {
    const playerId = options.id;

    var bodies = [];

    const isAlien = this.race == 'alien';

    // create soft bodies
    var particleOptions = {
      friction: 0.05,
      frictionStatic: 0.1,
      render: {
        fillStyle: isAlien ? ALIEN_COLOR : DINO_COLOR,
        strokeStyle: isAlien ? ALIEN_COLOR : DINO_COLOR
      }
    };

    var columns = 3;
    var rows = 6;
    var columnGap = 0;
    var rowGap = 0;
    var particleRadius = 20;
    var x = options.x || 0;
    var y = options.y || 0;
    var width = 120;
    var height = 100;
    var torsoHeight = rows * particleRadius;

    var constraintOptions = {
      render: {
        visible: false
      }
    };

    var torso = this.torso = Matter.Composites.softBody(x, y, columns, rows, columnGap, rowGap, true, particleRadius, particleOptions, constraintOptions);

    torso.bodies.forEach(body => {
      body.playerId = playerId;
    });

    var legs = this.legs = Matter.Bodies.rectangle(x + width / 2, 60 + (y + height) + torsoHeight, width, height, {
      isStatic: true,
      // density: 0.0001,
      render: {
        sprite: {
          // texture: isAlien ?
          // '/images/Sprite_AlienLegs1.png' : '/images/Sprite_DinoLegs1.png'
          sheet: isAlien ? alienWalkSprite : dinoWalkSprite
        }
      }
    });

    legs.playerId = playerId;

    var head = this.head = Matter.Bodies.circle(x + 58, y - 50, 50, {
      // collisionFilter: {
      //   // group: 2 ** 22,
      //   category: 2 ** 22,
      //   mask: 2 ** 22
      // },
      inertia: 100000,
      render: {
        sprite: {
          texture: isAlien ?
            '/images/Sprite_AlienHead1.png' : '/images/Sprite_DinoHead1.png',
          xScale: 0.25,
          yScale: 0.25
        }
      }
    });

    head.isHead = true;
    head.playerId = playerId;

    var torsoLegConstraint1 = Matter.Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 1],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      pointB: {
        x: -38,
        y: 0
      },
      render: {
        visible: false
      }
    });

    var torsoLegConstraint2 = Matter.Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 2],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      // pointB: {
      //   x: 0,
      //   y: 0
      // }
      render: {
        visible: false
      }
    });

    var torsoLegConstraint3 = Matter.Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 3],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      pointB: {
        x: 38,
        y: 0
      },
      render: {
        visible: false
      }
    });

    var torsoLegConstraint4 = Matter.Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 1],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      pointB: {
        x: 38,
        y: 0
      },
      render: {
        visible: false
      }
    });

    var torsoLegConstraint5 = Matter.Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 3],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      pointB: {
        x: -38,
        y: 0
      },
      render: {
        visible: false
      }
    });

    var headConstraint = this.headConstraint = Matter.Constraint.create({
      bodyA: torso.bodies[1],
      // pointA: {
      //   x: 0,
      //   y: -100
      // },
      bodyB: head,
      // pointB: {
      //   x: 0,
      //   y: -100
      // }
      render: {
        visible: false
      }
    });

    // var headConstraint2 = Matter.Constraint.create({
    //   bodyA: torso.bodies[1],
    //   pointA: {
    //     x: 0,
    //     y: 0
    //   },
    //   bodyB: head,
    //   pointB: {
    //     x: 0,
    //     y: 0
    //   }
    // });

    var group = Matter.Body.nextGroup(true);

    var category = 0;

    var i = 0;

    var arm = this.arm = Matter.Composites.stack(x + 50, y + 50, 4, 1, 10, 10, function(x, y) {
      var render = {
        fillStyle: isAlien ? ALIEN_ARM_COLOR : DINO_ARM_COLOR,
        strokeStyle: isAlien ? ALIEN_ARM_COLOR : DINO_ARM_COLOR
      };

      if (i == 3) {
        render.sprite = {
          texture: isAlien ? '/images/Sprite_AlienHand1.png' : '/images/Sprite_DinoHand1.png',
          xScale: 0.25,
          yScale: 0.25,
          yOffset: -0.3
        };
      }

      var body = Matter.Bodies.rectangle(x, y, 50, 20, {
        collisionFilter: {
          group: group,
          category: 2 ** category++,
          mask: 2 ** category
        },
        render: render
      });

      if (i == 3) {
        body.isHand = true;
      }
      body.playerId = playerId;

      i++;

      return body;
    });

    Matter.Composites.chain(arm, 0.5, 0, -0.5, 0, {
      stiffness: 0.8,
      length: 2,
      render: {
        fillStyle: isAlien ? ALIEN_ARM_COLOR : DINO_ARM_COLOR,
        strokeStyle: isAlien ? ALIEN_ARM_COLOR : DINO_ARM_COLOR
      }
    });

    Matter.Composite.add(arm, Matter.Constraint.create({
      bodyA: torso.bodies[4],
      // pointA: {
      //   x: torso.bodies[4].position.x,
      //   y: torso.bodies[4].position.y,
      // },
      bodyB: arm.bodies[0],
      pointB: {
        x: -20,
        y: 0
      },
      stiffness: 0.8,
      render: {
        fillStyle: isAlien ? ALIEN_ARM_COLOR : DINO_ARM_COLOR,
        strokeStyle: isAlien ? ALIEN_ARM_COLOR : DINO_ARM_COLOR,
        lineWidth: 10
      }
    }));

    // var hand = this.hand = Matter.Bodies.circle(
    //   arm.bodies[2].position.x + 50,
    //   torso.bodies[4].position.y,
    //   30, {
    //     collisionFilter: {
    //       group: group,
    //       category: 2 ** category++,
    //       mask: 2 ** category
    //     },
    //     render: {
    //       sprite: {
    //         texture: '/images/Sprite_AlienHand1.png',
    //         xScale: 0.25,
    //         yScale: 0.25
    //       }
    //     }
    //   });

    // Matter.Composite.add(arm, Matter.Constraint.create({
    //   bodyA: arm.bodies[2],
    //   pointA: {
    //     x: 20,
    //     y: 0
    //   },
    //   bodyB: hand,
    //   // pointB: {
    //   //   x: -20,
    //   //   y: 0
    //   // },
    //   stiffness: 0.8
    // }));

    var bodies = [
      torso,
      legs,
      head,
      arm,
      // hand,
      torsoLegConstraint1,
      torsoLegConstraint2,
      torsoLegConstraint3,
      torsoLegConstraint4,
      torsoLegConstraint5,
      headConstraint
    ];

    Matter.World.add(this.game.world, bodies);

    return bodies;
  }

  removeBodies() {
    Matter.World.remove(this.game.world, this.bodies);
  }

  move(impulseX, impulseY) {
    this.legs.positionImpulse.x = impulseX;
    this.legs.positionImpulse.y = impulseY;
  }

  faceRight() {
    this.isFacingRight = true;
    this.head.render.sprite.facingRight = true;
    this.legs.render.sprite.facingRight = true;
    this.arm.bodies[3].render.sprite.facingUp = true;
  }

  faceLeft() {
    this.isFacingRight = false;
    this.head.render.sprite.facingRight = false;
    this.legs.render.sprite.facingRight = false;
    this.arm.bodies[3].render.sprite.facingUp = false;
  }
}
