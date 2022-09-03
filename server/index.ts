import express, { Express, Request, Response } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
import { DuelConnection } from "./types";
import { generateSmallGuid, getParagraph } from "./utils";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

const duelRooms: DuelConnection[] = [];

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  app.get("/hello", async (_: Request, res: Response) => {
    res.send("Hello World");
  });

  io.on("connection", (socket: socketio.Socket) => {
    console.log("connection");
    socket.emit("status", "Hello from Socket.io");

    socket.on("generateDuelCode", () => {
      const duelcode = generateSmallGuid();
      duelRooms.push({
        players: [socket.id],
        code: duelcode,
      });

      socket.join(duelcode);

      socket.emit("duelCode", duelcode);
    });

    socket.on("joinDuel", (duelcode: string) => {
      const matchingRoom = duelRooms.find((room) => room.code === duelcode);
      if (matchingRoom && matchingRoom.players.length < 2) {
        socket.join(duelcode);
        matchingRoom.players.push(socket.id);
        socket.emit("joinedDuelResult", true);
        if (matchingRoom.players.length === 2) {
          io.to(duelcode).emit("duelStart", getParagraph());
        }
      } else {
        socket.emit("joinedDuelResult", false);
      }
    });

    socket.on("disconnect", () => {
      if (duelRooms.length > 0) {
        duelRooms.forEach((room) => {
          if (room.players.includes(socket.id)) {
            room.players.splice(room.players.indexOf(socket.id), 1);
            if (room.players.length === 0) {
              duelRooms.splice(duelRooms.indexOf(room), 1);
              console.log("removed room");
            }
          }
        });
      }
    });
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.info(`> Ready on http://localhost:${port}`);
  });
});
