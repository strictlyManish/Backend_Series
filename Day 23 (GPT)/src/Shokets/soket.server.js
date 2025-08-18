const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/User.model");
const Genraret_ai = require("../Service/Ai.service");

function shoketsSetup(httpServer) {

    const io = new Server(httpServer, {})

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        if (!cookies) {
            next(new Error("Authentication error : no token provided"))
        };


        try {
            const decode = jwt.verify(cookies.token, process.env.JWT_KEY);
            const user = await userModel.findById(decode.id);
            socket.user = user;
            next();
        } catch (error) {
            next(new Error("Authentication error : invalid token"))

        }
    })

    io.on("connection", async (shoket) => {

        shoket.on("ai-message", async (messagepayload) => {
            try {
                const response = await Genraret_ai(messagepayload.content);

                shoket.emit("ai-response", {
                    content: response,
                    chat: messagepayload.chat
                });

                console.log("Received:", messagepayload);
                console.log("AI Response:", response);
            } catch (error) {
                console.error("Error generating AI response:", error);
            }
        });
    })
};
module.exports = shoketsSetup;