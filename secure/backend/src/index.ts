import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);


app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("user-message", (message: string) => {
        console.log("Message received:", message);
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log(`Server Started at PORT:${PORT}`);
});
