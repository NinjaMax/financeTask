'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');
const router = require("./routes/index");
const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;
const getQuotes = require("./controller/quotes");
  
const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    optionSuccessStatus: 200,
    credentials: true,
    transports:["websocket", "polling"],
  }
});

app.use('/', router);

socketServer.on('connection', (socket) => {
  getQuotes(socket);
  
  const timer = setInterval(() => {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on("disconnect", () => {
    clearInterval(timer);
  });
  const datas = " ...tickers are online...";
  socket.emit("online", datas);
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
