import express from "express";
import path from "path";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

// App set up
const app = express();

// Static files
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(5000, () => console.log("Listening on port 5000"));

// Socket setup
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server);

io.on("connection", (socket) => {
  console.log("Made socket connection", socket.id);
});
