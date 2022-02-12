const express = require("express");
const path = require("path");
const socket = require("socket.io");

// App set up
const app = express();

// Static files
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(5000, () => console.log("Listening on port 5000"));

// Socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Made socket connection", socket.id);

  // Listening
  socket.on("chat", (data) => {
    console.log(data);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
