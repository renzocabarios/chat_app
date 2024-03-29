import "express-async-errors";
import express, { Express } from "express";
import connectDB from "./app/db";
import ENV from "./app/env/index.js";
import { addRoutes } from "./app/routes/index.js";
import { addMiddlewares } from "./app/middlewares/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { EVENT } from "./app/constants";
const app: Express = express();

//initialization
const start = () => {
  const server = createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(socket.id);

    io.to(socket.id).emit(EVENT.CLIENT_CONNECTED, {
      clientId: socket.id,
    });
  });

  app.use((req: any, res: any, next: any) => {
    req.io = io;
    return next();
  });
  addMiddlewares(app);
  addRoutes(app);

  app.use(function (err: any, req: any, res: any, next: any) {
    res.status(403);
    res.json({
      data: [],
      status: "fail",
      message: "Something wrong with the server",
    });
  });

  connectDB(ENV.MONGO_CON).then(() => {
    console.log(`Database connected to ${ENV.MONGO_CON}`);

    server.listen(ENV.PORT, () => {
      console.log(`Server started on port ${ENV.PORT}`);
    });
  });
};

start();
