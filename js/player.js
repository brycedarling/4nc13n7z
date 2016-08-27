// create soft bodies
var particleOptions = {
  friction: 0.05,
  frictionStatic: 0.1,
  render: {
    visible: true,
    sprite: {
      texture: 'images/dino.png'
    }
  }
};

var columns = 3;
var rows = 6;
var columnGap = 0;
var rowGap = 0;
var particleRadius = 20;
var x = 250;
var y = 250;
var width = 120;
var height = 100;
var torsoHeight = rows * particleRadius;
var playerTorso = Composites.softBody(x, y, columns, rows, columnGap, rowGap, true, particleRadius, particleOptions);
var playerLegs = Bodies.rectangle(x + width / 2, 60 + (y + height) + torsoHeight, width, height, {
  isStatic: true
});
var playerHead = Bodies.circle(x + 58, y - 50, 50);

var constraint1 = Constraint.create({
  bodyA: playerTorso.bodies[playerTorso.bodies.length - 1],
  // pointA: { x: 400, y: 100 },
  bodyB: playerLegs,
  pointB: {
    x: -38,
    y: 0
  }
});

var constraint2 = Constraint.create({
  bodyA: playerTorso.bodies[playerTorso.bodies.length - 2],
  // pointA: { x: 400, y: 100 },
  bodyB: playerLegs,
  // pointB: {
  //   x: 0,
  //   y: 0
  // }
});

var constraint3 = Constraint.create({
  bodyA: playerTorso.bodies[playerTorso.bodies.length - 3],
  // pointA: { x: 400, y: 100 },
  bodyB: playerLegs,
  pointB: {
    x: 38,
    y: 0
  }
});

var constraint4 = Constraint.create({
  bodyA: playerTorso.bodies[playerTorso.bodies.length - 1],
  // pointA: { x: 400, y: 100 },
  bodyB: playerLegs,
  pointB: {
    x: 38,
    y: 0
  }
});

var constraint5 = Constraint.create({
  bodyA: playerTorso.bodies[playerTorso.bodies.length - 3],
  // pointA: { x: 400, y: 100 },
  bodyB: playerLegs,
  pointB: {
    x: -38,
    y: 0
  }
});

var headConstraint1 = Constraint.create({
  bodyA: playerTorso.bodies[1],
  // pointA: { x: 400, y: 100 },
  bodyB: playerHead,
  // pointB: {
  //   x: -38,
  //   y: 0
  // }
});

// var headConstraint2 = Constraint.create({
//   bodyA: playerTorso.bodies[2],
//   // pointA: { x: 400, y: 100 },
//   bodyB: playerHead,
//   // pointB: {
//   //   x: -38,
//   //   y: 0
//   // }
// });

var group = Body.nextGroup(true);

var n = 0;

var playerArm = Composites.stack(x + 50, y + 50, 3, 1, 10, 10, function(x, y) {
  return Bodies.rectangle(x, y, 60, 20, {
    collisionFilter: {
      group: group,
      category: 2 ** n++,
      mask: 2 ** n
    }
  });
});

Composites.chain(playerArm, 0.5, 0, -0.5, 0, {
  stiffness: 0.8,
  length: 2
});

Composite.add(playerArm, Constraint.create({
  bodyA: playerTorso.bodies[4],
  // pointA: {
  //   x: playerTorso.bodies[4].position.x,
  //   y: playerTorso.bodies[4].position.y,
  // },
  bodyB: playerArm.bodies[0],
  pointB: {
    x: -20,
    y: 0
  },
  stiffness: 0.8
}));

World.add(world, playerArm);

World.add(world, [
  playerTorso,
  playerLegs,
  playerHead,
  constraint1,
  constraint2,
  constraint3,
  constraint4,
  constraint5,
  headConstraint1,
  // headConstraint2
]);

var keys = {
  'left': 37,
  'right': 39
};

window.addEventListener('keydown', function(e) {
  var impulseX = 0;

  if (e.keyCode == keys.left) {
    impulseX -= 20;
  }

  if (e.keyCode == keys.right) {
    impulseX += 20;
  }

  playerLegs.positionImpulse.x = impulseX;
});

// window.addEventListener('keyup', function(e) {
// });
