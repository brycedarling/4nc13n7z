function handAttraction() {
  if (mouseX == null || mouseY == null) return;

  if (!game.player) return;

  var hand = game.player.hand;
  var handX = hand.position.x
  var handY = hand.position.y;

  var impulseX = 0;
  var impulseY = 0;

  var forceMagnitude = 0.005;

  if (mouseX > handX) {
    impulseX += forceMagnitude;
  } else if (mouseX < handX) {
    impulseX -= forceMagnitude;
  }

  if (mouseY > handY) {
    impulseY += forceMagnitude;
  } else if (mouseY < handY) {
    impulseY -= forceMagnitude;
  }

  Body.applyForce(hand, hand.position, {
    x: impulseX,
    y: impulseY
  });
}

// var explosion = function(engine) {
//   var bodies = Composite.allBodies(engine.world);
//
//   for (var i = 0; i < bodies.length; i++) {
//     var body = bodies[i];
//
//     if (!body.isStatic && body.position.y >= 500) {
//       var forceMagnitude = 0.05 * body.mass;
//
//     }
//   }
// };
//
// var timeScaleTarget = 1,
var mouseAttractionCounter = 0;

// var sceneEvents = [];

// sceneEvents.push(
Events.on(engine, 'afterUpdate', function(e) {
  handAttraction();

  // tween the timescale for bullet time slow-mo
  // engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;

  mouseAttractionCounter += 1;

  // every 2 sec reset mouse attraction
  if (mouseAttractionCounter >= 60 * 1) {
    mouseX = null;
    mouseY = null;
  }
  //
  //   // flip the timescale
  //   if (timeScaleTarget < 1) {
  //     timeScaleTarget = 1;
  //   } else {
  //     timeScaleTarget = 0.05;
  //   }
  //
  //   // create some random forces
  //   explosion(engine);
  //
  //   // reset counter
  //   counter = 0;
  // }
});
// );
