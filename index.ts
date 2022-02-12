import express from "express";
import path from "path";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

// App set up
const app = express();
const httpServer = createServer(app);

// Static files
app.use(express.static(path.join(__dirname, "public")));

httpServer.listen(5000, () => console.log("Listening on port 5000"));

// Socket setup
const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  console.log("Made socket connection", socket.id);

  // Listening
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
