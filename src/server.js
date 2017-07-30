const WebSocket = require('ws');
const _ = require('lodash');
const Resurrect = require('resurrect-js');
const Matter = require('matter-js');
const express = require('express');
const config = require('config');
const Player = require('shared/player');

global.HTMLElement = () => {};
const { world, playerObject } = require('./shared/physics');
const PORT = config.port;

const server = express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new WebSocket.Server({server});
var clients = [];

wss.on('connection', function connection(ws) {
  const newClient = { ws, isAlive: true, body: Player.createNewPlayer(world, {x: 100, y: 100}) }
  ws.on('pong', () => { newClient.isAlive = true });

  clients = clients.concat(newClient);

  ws.on('message', (message) => {
    console.log(message)
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


const interval = setInterval(function ping() {
  const deadClients = _.remove(clients, client => !client.isAlive);
  deadClients.forEach(client => {
    client.ws.terminate()
    Matter.Composite.remove(world, client.body);
  });

  clients.forEach(client => {
    client.isAlive = false;
    client.ws.ping('', false, true);
  });
}, 2000);
