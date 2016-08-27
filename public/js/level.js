// create ground
var ground = Bodies.rectangle(400, 610, 810, 60, {
  isStatic: true
});

// add ground to the world
World.add(world, [ground]);
