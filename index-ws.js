const express = require("express");
const server = require("http").createServer();
const app = express();
const PORT = 3000;
const WebSocket = require("ws");

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);

server.listen(PORT, function () {
  console.log("Listening on " + PORT);
});

// begin WebSocket server

const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ server: server });

wss.on("connection", function connection(ws) {
  const numClients = wss.clients.size;
  console.log(`clients connected:  `, numClients);

  wss.brodacast(`Current versiots: ${numClients}`);

  if (ws.readyState === WebSocket.OPEN) {
    ws.send("Welcome to the server!");
  }

  wss.on("close", function close() {
    wss.brodacast(`Current versiots: ${numClients}`);
    console.log("Client disconnected!");
  });
});

wss.brodacast = function brodacast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
