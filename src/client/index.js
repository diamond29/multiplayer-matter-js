import Resurrect from 'resurrect-js';
import config from 'config';

const ws = new WebSocket(config.gameServerAddress);
const necro = new Resurrect()

ws.onopen = function open(message) {
};

var world = null;

ws.onmessage = function incoming(incomingMessage) {
  world = necro.resurrect(incomingMessage.data)
};

var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

(function render() {
  window.requestAnimationFrame(render);

  if (world) {
    var bodies = world.bodies;

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
  }
})();

const addKeyListener = (letter) => {
  window.addEventListener('keydown', (keyDownEvent) => {
    ws.send(keyDownEvent);
  });
  window.addEventListener('keyup', (keyUpEvent) => {
    ws.send(keyUpEvent);
  });
}


addKeyListener("w");
addKeyListener("a");
addKeyListener("s");
addKeyListener("d");
