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
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded == "string") {
    return null;
  }

  if (!decoded || decoded.userId) {
    return null;
  }
  return decoded.userId;
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
    if(typeof data !=="string"){
      parsedData=JSON.parse(toString());
    }
    else{
      parsedData=JSON.parse(data);
    }

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.room.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.room = user?.room.filter((x) => x === parsedData.room);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          roomId,
          Chat: message,
          userId: Number(userId),
        },
      });

      users.forEach((user) => {
        if (user.room.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});
