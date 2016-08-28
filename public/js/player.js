class Player {
  constructor(options) {
    options = options || {};

    this.id = options.id;

    // states
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isJumping = false;

    this.createBodies(options)
  }

  createBodies(options) {
    // create soft bodies
    var particleOptions = {
      friction: 0.05,
      frictionStatic: 0.1,
      render: {
        visible: true
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

    var torso = this.torso = Composites.softBody(x, y, columns, rows, columnGap, rowGap, true, particleRadius, particleOptions);

    var legs = this.legs = Bodies.rectangle(x + width / 2, 60 + (y + height) + torsoHeight, width, height, {
      isStatic: true,
      render: {
        sprite: {
          texture: '/images/Sprite_AlienLegs1.png' // 128 x 128 cells
        }
      }
    });

    var head = this.head = Bodies.circle(x + 58, y - 50, 50, {
      // collisionFilter: {
      //   // group: 2 ** 22,
      //   category: 2 ** 22,
      //   mask: 2 ** 22
      // },
      inertia: 100000,
      render: {
        sprite: {
          texture: '/images/Sprite_AlienHead1.png',
          xScale: 0.25,
          yScale: 0.25
        }
      }
    });

    var torsoLegConstraint1 = Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 1],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      pointB: {
        x: -38,
        y: 0
      }
    });

    var torsoLegConstraint2 = Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 2],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      // pointB: {
      //   x: 0,
      //   y: 0
      // }
    });

    var torsoLegConstraint3 = Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 3],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      pointB: {
        x: 38,
        y: 0
      }
    });

    var torsoLegConstraint4 = Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 1],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      pointB: {
        x: 38,
        y: 0
      }
    });

    var torsoLegConstraint5 = Constraint.create({
      bodyA: torso.bodies[torso.bodies.length - 3],
      // pointA: { x: 400, y: 100 },
      bodyB: legs,
      pointB: {
        x: -38,
        y: 0
      }
    });

    var headConstraint1 = Constraint.create({
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
    });

    // var headConstraint2 = Constraint.create({
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

    var group = Body.nextGroup(true);

    var category = 0;

    var arm = this.arm = Composites.stack(x + 50, y + 50, 3, 1, 10, 10, function(x, y) {
      return Bodies.rectangle(x, y, 50, 20, {
        collisionFilter: {
          group: group,
          category: 2 ** category++,
          mask: 2 ** category
        }
      });
    });

    Composites.chain(arm, 0.5, 0, -0.5, 0, {
      stiffness: 0.8,
      length: 2
    });

    Composite.add(arm, Constraint.create({
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
      stiffness: 0.8
    }));

    var hand = this.hand = Bodies.circle(
      arm.bodies[2].position.x + 50,
      torso.bodies[4].position.y,
      30, {
        collisionFilter: {
          group: group,
          category: 2 ** category++,
          mask: 2 ** category
        },
        render: {
          sprite: {
            texture: '/images/Sprite_AlienHand1.png',
            xScale: 0.25,
            yScale: 0.25
          }
        }
      });

    Composite.add(arm, Constraint.create({
      bodyA: arm.bodies[2],
      pointA: {
        x: 20,
        y: 0
      },
      bodyB: hand,
      // pointB: {
      //   x: -20,
      //   y: 0
      // },
      stiffness: 0.8
    }));

    World.add(world, [
      torso,
      legs,
      head,
      arm,
      hand,
      torsoLegConstraint1,
      torsoLegConstraint2,
      torsoLegConstraint3,
      torsoLegConstraint4,
      torsoLegConstraint5,
      headConstraint1,
      // headConstraint2
    ]);
  }

  move(impulseX, impulseY) {
    this.legs.positionImpulse.x = impulseX;
    this.legs.positionImpulse.y = impulseY;
  }
}
