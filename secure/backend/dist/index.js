"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Use CORS to allow frontend communication
app.use((0, cors_1.default)());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // In production, specify your frontend URL
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("user-message", (message) => {
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
