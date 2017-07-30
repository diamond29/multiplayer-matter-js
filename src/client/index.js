import Resurrect from 'resurrect-js';
import config from 'config';

const ws = new WebSocket(config.gameServerAddress);
const necro = new Resurrect()

ws.onopen = function open(message) {
};

var world = null;
var playerBodyId = null;

ws.onmessage = function incoming(incomingMessage) {
  const deserializedMessage = necro.resurrect(incomingMessage.data);
  if (deserializedMessage.type === 'world') {
    world = deserializedMessage.data
  } else if (deserializedMessage.type === 'connection') {
    playerBodyId = deserializedMessage.data.bodyId
  }
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


    bodies.forEach(body => {
      context.beginPath();
      const vertices = body.vertices;
      context.moveTo(vertices[0].x, vertices[0].y);

      vertices.slice(1, vertices.length).forEach(vertex => {
        context.lineTo(vertex.x, vertex.y);
      });

      context.lineTo(vertices[0].x, vertices[0].y);

      context.lineWidth = 1;
      context.strokeStyle = body.id === playerBodyId ? 'red' : '#FFF';

      context.stroke();
      context.closePath();
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
