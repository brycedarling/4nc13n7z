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

function renderPlayerBody(context, player) {
  const playerTorso = player.torso;

  var rowBodies = getRowBodies(playerTorso.bodies, 0);

  context.beginPath();

  var startVertex = rowBodies[0].vertices[14];

  context.moveTo(startVertex.x, startVertex.y);

  for (var i = 0; i < rowBodies.length; i++) {
    var vertex = rowBodies[i].vertices[14];
    context.lineTo(vertex.x, vertex.y);
    // context.fillStyle = 'red';
    // context.fillRect(vertex.x, vertex.y, 5, 5);
  }

  var columnBodies = getColumnBodies(playerTorso.bodies, 2);

  for (var i = 0; i < columnBodies.length; i++) {
    vertex = columnBodies[i].vertices[19];
    context.lineTo(vertex.x, vertex.y);
    // context.fillStyle = 'red';
    // context.fillRect(vertex.x, vertex.y, 5, 5);
  }

  rowBodies = getRowBodies(playerTorso.bodies, 5);

  for (var i = rowBodies.length - 1; i >= 0; i--) {
    var vertex = rowBodies[i].vertices[5];
    context.lineTo(vertex.x, vertex.y);
    // context.fillStyle = 'red';
    // context.fillRect(vertex.x, vertex.y, 5, 5);
  }

  columnBodies = getColumnBodies(playerTorso.bodies, 0);

  for (var i = columnBodies.length - 1; i >= 0; i--) {
    var vertex = columnBodies[i].vertices[10];
    context.lineTo(vertex.x, vertex.y);
    // context.fillStyle = 'red';
    // context.fillRect(vertex.x, vertex.y, 5, 5);
  }

  context.lineTo(startVertex.x, startVertex.y);

  const isAlien = player.race == 'alien';

  context.strokeStyle = isAlien ? ALIEN_COLOR : DINO_COLOR;
  context.stroke();
  context.fillStyle = isAlien ? ALIEN_COLOR : DINO_COLOR;
  context.fill();
}

// function renderPlayerArm(context, player) {
//
// }


// var canvas = render.canvas;
// var context = canvas.getContext('2d');
//
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
//

//
// (function render() {
//   window.requestAnimationFrame(render);
//
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
