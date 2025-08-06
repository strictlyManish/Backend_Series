require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const genrate_response = require("./service/ai.service");
const { text } = require('stream/consumers');

const httpServer = createServer(app);
const io = new Server(httpServer, {

    cors: {
        origin: "http://localhost:5173", // Adjust 
    }

});

const chatHistory = [

]


io.on("connection", (socket) => {
    console.log("Connected to server");


    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });


    socket.on('ai-message', async (data) => {
        console.log("Ai message received:", data);

        chatHistory.push({
            role: "user",
            parts: [{ text: data }]
        });

        const mama = await genrate_response(chatHistory)

        chatHistory.push({
            role: "model",
            parts: [{ text: mama }]
        });

        socket.emit("ai-message-response", mama)

    })
});

httpServer.listen(3000, () => {
    console.log("Server runnig on port 3000")
});