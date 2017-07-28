import _ from 'lodash';
import * as Matter from 'matter-js';

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

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

(function render() {
  var bodies = Composite.allBodies(engine.world);

  window.requestAnimationFrame(render);

  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();

  bodies.forEach(body => {
    const vertices = body.vertices;
    context.moveTo(vertices[0].x, vertices[0].y);

    vertices.slice(1, vertices.length).forEach(vertex => {
      context.lineTo(vertex.x, vertex.y);
    });

    context.lineTo(vertices[0].x, vertices[0].y);

    context.lineWidth = 1;
    context.strokeStyle = '#FFF';
    context.stroke();
  });
})();

const addKeyListener = (letter, downFunction, upFunction) => {
  window.addEventListener('keydown', (keyDownEvent) => {
    if (keyDownEvent.key === letter) {
      downFunction();
    }
  });
  window.addEventListener('keyup', (keyUpEvent) => {
    if (keyUpEvent.key === letter) {
      upFunction();
    }
  });
}


addKeyListener("a",
  () => {
    Matter.Body.setVelocity(boxA, {x: -1, y: 0})
  },
  () => Matter.Body.setVelocity(boxA, {x: 0, y: 0})
);

addKeyListener("d",
  () => {
    Matter.Body.setVelocity(boxA, {x: 1, y: 0})
  },
  () => Matter.Body.setVelocity(boxA, {x: 0, y: 0})
);
