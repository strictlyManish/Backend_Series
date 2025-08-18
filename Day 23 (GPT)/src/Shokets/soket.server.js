const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/User.model");
const Genraret_ai = require("../Service/Ai.service");
const messageModel = require("../Models/Message.model");

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
                // Save user message
                await messageModel.create({
                    chat: messagepayload.chat,
                    user: shoket.user._id,
                    content: messagepayload.content,
                    role: "user"
                });

                // Generate AI response
                const response = await Genraret_ai(messagepayload.content);

                // Save AI message
                await messageModel.create({
                    chat: messagepayload.chat,
                    user: shoket.user._id,       
                    content: response,
                    role: "ai"
                });

                
                shoket.emit("ai-response", {
                    content: response,
                    chat: messagepayload.chat
                });

            } catch (error) {
                console.error("Error generating AI response:", error);
            }
        });

    })
};
module.exports = shoketsSetup;