require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const genrate_response = require("./service/ai.service");


const httpServer = createServer(app);
const io = new Server(httpServer);


io.on("connection", (socket) => {
    console.log("Connected to server");


    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });


    socket.on("ai-response", async (data) => {
        try {
            console.log("Received AI message:", data.prompt);
            const response = await genrate_response(data.prompt);
            console.log("AI Response:", response);
            socket.emit("ai-message-response", { response });
        } catch (error) {
            console.error("AI Service Error:", error.message);
            socket.emit("ai-message-response", { error: "AI service failed." });
        }
    });

});



httpServer.listen(3000, () => {
    console.log("Server runnig on port 3000")
});