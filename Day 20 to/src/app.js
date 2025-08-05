const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); 
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start listening
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

module.exports = app;
