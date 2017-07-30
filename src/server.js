const WebSocket = require('ws');
const _ = require('lodash');
const Resurrect = require('resurrect-js');
const Matter = require('matter-js');

global.HTMLElement = () => {};
const { world, playerObject } = require('./shared/physics');

const wss = new WebSocket.Server({ port: process.env.PORT || '8080' });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    resetPlayerObject();
  });
});

const broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const necro = new Resurrect();
setInterval(function() {
  const serializedState = necro.stringify(world);
  broadcast(serializedState);
}, 1000 / 30);

const resetPlayerObject = () => {
  console.log("reset");
  Matter.Body.setPosition(playerObject, { x: 400, y: 200 });
}
