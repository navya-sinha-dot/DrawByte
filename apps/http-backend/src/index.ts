import express from "express";
import { CreateUserSchema, roomSchema, SigninSchema } from "@repo/common/types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/clients";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const Parseddata = CreateUserSchema.safeParse(req.body);

  if (!Parseddata.success) {
    res.json({
      message: "not correct input",
      error: Parseddata.error,
    });
    return;
  }
  try {
    const user = await prismaClient.users.create({
      data: {
        email: Parseddata.data?.email,
        password: Parseddata.data?.password,
        username: Parseddata.data?.username,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.json({
      message: "user already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
  const userId = 1;

  const Parseddata = SigninSchema.safeParse(req.body);

  if (!Parseddata.success) {
    res.json({
      message: "not correct input",
      error: Parseddata.error,
    });
    return;
  }
  const user = await prismaClient.users.findFirst({
    where: {
      username: Parseddata.data.username,
      password: Parseddata.data.password,
    },
  });

  if (!user) {
    res.json({
      message: "user doesnt exist",
    });
  }
  const token = jwt.sign({ userId: user?.id }, JWT_SECRET);
  res.json({
    token,
  });
});

app.post("/room", middleware, async (req, res) => {
  //db call
  const Parseddata = roomSchema.safeParse(req.body);

  if (!Parseddata.success) {
    res.json({
      message: "not correct input",
      error: Parseddata.error,
    });
    return;
  }

  //@ts-ignore
  const userId = req.userId;
  const room = await prismaClient.room.create({
    data: { slug: Parseddata.data.name, adminId: userId },
  });
  res.json({
    roomId: room.id,
  });
});

app.get("/chat/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  try {
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 1000,
    });

    res.json({
      messages,
    });
  } catch (e) {
    console.log(e);
    res.json({
      messages: [],
    });
  }
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });
  res.json({
    room,
  });
});



app.listen(3001, () => {
  console.log("server is listenning on 3001");
});
