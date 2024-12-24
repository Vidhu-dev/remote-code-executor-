import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { userJoin, getUser, userLeave } from "./socket/socket";
import codeRoutes from "./routes/code";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 1000,
  pingInterval: 3000,
});

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/code", codeRoutes);
app.get("/", (req: Request, res: Response) => {
  res.status(201).send("heyy!!!");
});

// Socket.io events
io.on("connection", (socket) => {
  let room: string | undefined;
  console.log("Socket is active to be connected");

  socket.on("joinRoom", (payload: { room: string; userName: string }) => {
    room = userJoin({
      socketId: socket.id,
      room: payload.room,
      username: payload.userName,
    });

    console.log(room);
    if (room) {
      socket.join(room);
      console.log("joinRoom payload", payload);
      io.to(room).emit("joinRoom", payload);
    }
  });

  socket.on("sendCode", (payload: any) => {
    const room = getUser(socket.id);
    if (room) {
      console.log("sendCode event triggered room: ", room);
      io.to(room).emit("sendCode", payload);
    }
  });

  socket.on("sendInput", (payload: any) => {
    const room = getUser(socket.id);
    if (room) {
      console.log("send Input event triggered", payload);
      io.to(room).emit("sendInput", payload);
    }
  });

  socket.on("sendLang", (payload: any) => {
    const room = getUser(socket.id);
    if (room) {
      console.log("send Lang event triggered", payload);
      io.to(room).emit("sendLang", payload);
    }
  });

  socket.on("sendOutput", (payload: any) => {
    const room = getUser(socket.id);
    if (room) {
      console.log("send Output event triggered", payload);
      io.to(room).emit("sendOutput", payload);
    }
  });

  socket.on("leaveRoom", (payload: any) => {
    const room = getUser(socket.id);
    const user = userLeave(socket.id);
    if (room) {
      console.log("disconnect event triggered", payload);
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
