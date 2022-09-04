import express, { Express, Request, Response } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
import getRandomParagraph from "../utils/paragraphs";
import { DuelConnection } from "./types";
import { generateSmallGuid, getUserProgress } from "./utils";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

const duelRooms: DuelConnection[] = [];

async function startDuel(io: socketio.Server, room: DuelConnection) {
  const players = room.players;
  const player1 = players[0];
  const player2 = players[1];

  io.to(room.code).emit("matchFound", room.para);

  io.to(player1.id).emit("duelStart", {
    opponent: player2,
  });

  io.to(player2.id).emit("duelStart", {
    opponent: player1,
  });

  for (let i = 5; i >= 0; i--) {
    io.to(room.code).emit("Countdown", i);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

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
        players: [{ id: socket.id, input: "" }],
        para: getRandomParagraph(),
        code: duelcode,
      });

      socket.join(duelcode);

      socket.emit("duelCode", duelcode);
    });

    socket.on("joinDuel", (duelcode: string) => {
      const matchingRoom = duelRooms.find((room) => room.code === duelcode);
      if (matchingRoom && matchingRoom.players.length < 2) {
        socket.join(duelcode);
        matchingRoom.players.push({ id: socket.id, input: "" });
        socket.emit("joinedDuelResult", true);
        if (matchingRoom.players.length === 2) {
          // io.to(duelcode).emit("duelStart", getParagraph());
          startDuel(io, matchingRoom);
        }
      } else {
        socket.emit("joinedDuelResult", false);
      }
    });

    socket.on("userInput", (input: string) => {
      const room = duelRooms.find((room) =>
        room.players.find((player) => player.id === socket.id)
      );
      if (room) {
        room.players.find((player) => player.id === socket.id)!.input = input;
      }
      const player1Progress = getUserProgress(
        room!.players[0].input,
        room!.para
      );
      const player2Progress = getUserProgress(
        room!.players[1].input,
        room!.para
      );

      io.to(room!.code).emit("duelProgress", {
        player1: player1Progress,
        player2: player2Progress,
      });
    });

    socket.on("disconnect", () => {
      if (duelRooms.length > 0) {
        duelRooms.forEach((room) => {
          if (room.players.includes({ id: socket.id, input: "" })) {
            room.players = room.players.filter(
              (player) => player.id !== socket.id
            );
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
