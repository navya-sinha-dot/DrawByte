import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new WebSocketServer({ port: 8081 });
import { prismaClient } from "@repo/db/clients";

interface Users {
  ws: WebSocket;
  userId: string;
  room: string[];
}

const users: Users[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string" || !decoded || !(decoded as JwtPayload).userId) {
      return null;
    }
    return (decoded as JwtPayload).userId as string;
  } catch (e) {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;

  if (!url) {
    return;
  }
  const queryparams = new URLSearchParams(url.split("?")[1]);
  const token = queryparams.get("token") || "";

  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return;
  }

  users.push({
    userId,
    room: [],
    ws,
  });

  ws.on("message", async function message(data) {
    let parsedData;
    try {
      if (typeof data !== "string") {
        parsedData = JSON.parse(data.toString());
      } else {
        parsedData = JSON.parse(data);
      }
    } catch (e) {
      return;
    }

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      if (user && !user.room.includes(parsedData.roomId)) {
        user.room.push(parsedData.roomId);
      }
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.room = user.room.filter((x) => x !== parsedData.roomId);
    }

    if (parsedData.type === "chat") {
      const roomId = Number(parsedData.roomId); // Ensure roomId is a number for Prisma
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          roomId, // number for Prisma
          Chat: message,
          userId: Number(userId),
        },
      });

      users.forEach((user) => {
        if (user.room.includes(String(roomId))) { // compare as string
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId: String(roomId), // send as string
            })
          );
        }
      });
    }
  });

  ws.on("close", function close() {
    // Remove user from users array on disconnect
    const idx = users.findIndex((u) => u.ws === ws);
    if (idx !== -1) {
      users.splice(idx, 1);
    }
  });
});
