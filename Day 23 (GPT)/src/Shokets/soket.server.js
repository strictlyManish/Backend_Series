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

                // Fetch chat history
                const chatHistory = (await messageModel.find({
                    chat: messagepayload.chat
                }).sort({ createdAt: -1 }).limit(20).lean()).reverse()

                // Generate AI response
                const response = await Genraret_ai(chatHistory.map(item => {
                    return {
                        role: item.role,
                        parts: [{ text: item.content }]
                    }
                }));

                // Save AI message
                await messageModel.create({
                    chat: messagepayload.chat,
                    user: null, // AI is not a user
                    content: response,
                    role: "ai"
                });

                // Send AI response back to client
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