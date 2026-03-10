import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data) => {
    console.log("Data from client:", data.toString());

    ws.send("Thanks buddy!");
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});