// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

// create an engine
var engine = Engine.create();
var world = engine.world;

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine
});

// create ground
var ground = Bodies.rectangle(400, 610, 810, 60, {
  isStatic: true
});

// add ground to the world
World.add(world, [ground]);

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

var headConstraint2 = Constraint.create({
  bodyA: playerTorso.bodies[2],
  // pointA: { x: 400, y: 100 },
  bodyB: playerHead,
  // pointB: {
  //   x: -38,
  //   y: 0
  // }
});

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

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

window.addEventListener('keydown', function(e) {
  var impulseX = 0;
  if (e.keyCode == 37) {
    impulseX -= 20;
  }
  if (e.keyCode == 39) {
    impulseX += 20;
  }
  playerLegs.positionImpulse.x = impulseX;
});

var canvas = render.canvas;
var context = canvas.getContext('2d');

// function getXMinMaxVertex(vertices) {
//   var minVertex = vertices[0];
//   var maxVertex = vertices[0];
//   vertices.forEach(function(v) {
//     if (v.x < minVertex.x) {
//       minVertex = v;
//     }
//     if (v.x > maxVertex.x) {
//       maxVertex = v;
//     }
//   });
//   return {
//     min: minVertex,
//     max: maxVertex
//   };
// }

function getColumnBodies(bodies, columnIndex) {
  var column = [];
  for (var i = columnIndex; i < bodies.length; i += 3) {
    column.push(bodies[i]);
  }
  return column;
}

function getRowBodies(bodies, rowIndex) {
  var row = [];
  for (var i = rowIndex * 3; i < rowIndex * 3 + 3; i++) {
    row.push(bodies[i]);
  }
  return row;
}
//
// (function render() {
//
//   window.requestAnimationFrame(render);
//   //
//   context.fillStyle = '#eee';
//   context.fillRect(0, 0, canvas.width, canvas.height);
//
//   var bodies = Composite.allBodies(engine.world);
//
//   context.beginPath();
//
//   for (var i = 0; i < bodies.length; i++) {
//     var vertices = bodies[i].vertices;
//
//     context.moveTo(vertices[0].x, vertices[0].y);
//
//     for (var j = 1; j < vertices.length; j++) {
//       context.lineTo(vertices[j].x, vertices[j].y);
//     }
//
//     context.lineTo(vertices[0].x, vertices[0].y);
//   }
//
//   context.lineWidth = 2;
//   context.fillStyle = 'blue';
//   context.fill();
//   context.strokeStyle = '#999';
//   context.stroke();
//
//   var rowBodies = getRowBodies(playerTorso.bodies, 0);
//
//   context.beginPath();
//
//   var startVertex = rowBodies[0].vertices[14];
//
//   context.moveTo(startVertex.x, startVertex.y);
//
//   for (var i = 0; i < rowBodies.length; i++) {
//     var vertex = rowBodies[i].vertices[14];
//     context.lineTo(vertex.x, vertex.y);
//     // context.fillStyle = 'red';
//     // context.fillRect(vertex.x, vertex.y, 5, 5);
//   }
//
//   var columnBodies = getColumnBodies(playerTorso.bodies, 2);
//
//   for (var i = 0; i < columnBodies.length; i++) {
//     vertex = columnBodies[i].vertices[19];
//     context.lineTo(vertex.x, vertex.y);
//     // context.fillStyle = 'red';
//     // context.fillRect(vertex.x, vertex.y, 5, 5);
//   }
//
//   rowBodies = getRowBodies(playerTorso.bodies, 5);
//
//   for (var i = rowBodies.length - 1; i >= 0; i--) {
//     var vertex = rowBodies[i].vertices[5];
//     context.lineTo(vertex.x, vertex.y);
//     // context.fillStyle = 'red';
//     // context.fillRect(vertex.x, vertex.y, 5, 5);
//   }
//
//   columnBodies = getColumnBodies(playerTorso.bodies, 0);
//
//   for (var i = columnBodies.length - 1; i >= 0; i--) {
//     var vertex = columnBodies[i].vertices[10];
//     context.lineTo(vertex.x, vertex.y);
//     // context.fillStyle = 'red';
//     // context.fillRect(vertex.x, vertex.y, 5, 5);
//   }
//
//   context.lineTo(startVertex.x, startVertex.y);
//
//   context.strokeStyle = 'green';
//   context.stroke();
//   context.fillStyle = 'pink';
//   context.fill();
// })();
