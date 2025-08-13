const { Server } = require('socket.io');
const genrate_response = require("../service/ai.service");


const conectShokets = (httpServer) => {
    const io = new Server(httpServer, {})


    io.on("connection", async (socket) => {
        console.log("A user conected")

        socket.on("ai-message", async (message) => {
            const result = await genrate_response(message)

            socket.emit("ai-message-response", result)

        })

        socket.on('disconnect', () => {
            console.log("A user disconnected");
        });
    })
};





module.exports = conectShokets;
