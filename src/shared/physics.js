const Matter = require('matter-js');

// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var ceiling = Bodies.rectangle(400, 0, 810, 60, { isStatic: true });
var leftWall = Bodies.rectangle(5, 305, 10, 40, { isStatic: true });

const bodies = [boxA, boxB, ground, ceiling];
// add all of the bodies to the world
World.add(engine.world, bodies);

// run the engine
setInterval(function() {
  Engine.update(engine, 1000 / 60);
}, 1000 / 60);

module.exports = { world: engine.world, playerObject: boxA };
