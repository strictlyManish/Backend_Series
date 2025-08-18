const { Server } = require("socket.io");


function shoketsSetup(httpServer) {

    const io = new Server(httpServer, {})

    io.on("connection", (socket) => {
        console.log("A user conected")

        socket.on("disconected", () => {
            console.log("A user disconcted")
        })
    })
};
module.exports = shoketsSetup;