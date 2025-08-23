const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");

function initSocketServer(httpServer) {
    const io = new Server(httpServer, {});

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        if (!cookies.token) {
            return next(new Error("Authentication error: No token provided"));
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.id);
            socket.user = user;
            next();
        } catch (err) {
            next(new Error("Authentication error: Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        socket.on("ai-message", async (messagePayload) => {
            try {
                // Save user message
                const message = await messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: messagePayload.content,
                    role: "user"
                });

                // Generate vector + query memory in parallel (independent)
                const [vectors, chatHistory] = await Promise.all([
                    aiService.generateVector(messagePayload.content),
                    messageModel.find({ chat: messagePayload.chat })
                        .sort({ createdAt: -1 })
                        .limit(20)
                        .lean()
                        .then(docs => docs.reverse())
                ]);

                // Query memory after vectors are ready
                const memoryPromise = queryMemory({
                    queryVector: vectors,
                    limit: 3,
                    metadata: { user: socket.user._id }
                });

                // Create memory entry in parallel
                const createMemoryPromise = createMemory({
                    vectors,
                    messageId: message._id,
                    metadata: {
                        chat: messagePayload.chat,
                        user: socket.user._id,
                        text: messagePayload.content
                    }
                });

                const [memory] = await Promise.all([memoryPromise, createMemoryPromise]);

                // Prepare structured messages
                const stm = chatHistory.map(item => ({
                    role: item.role,
                    parts: [{ text: item.content }]
                }));

                const ltm = [{
                    role: "user",
                    parts: [{
                        text: `
                        these are some previous messages from the chat, use them to generate a response
                        ${memory.map(item => item.metadata.text).join("\n")}
                        `
                    }]
                }];

                // Generate AI response
                const response = await aiService.generateResponse([...ltm, ...stm]);

                // Save model response + generate vectors in parallel
                const responseMessage = await messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: response,
                    role: "model"
                });

                const responseVectors = await aiService.generateVector(response);

                await createMemory({
                    vectors: responseVectors,
                    messageId: responseMessage._id,
                    metadata: {
                        chat: messagePayload.chat,
                        user: socket.user._id,
                        text: response
                    }
                });

                // Emit response to client
                socket.emit("ai-response", {
                    content: response,
                    chat: messagePayload.chat
                });

            } catch (error) {
                console.error("Error in ai-message handler:", error);
                socket.emit("ai-response", {
                    content: "⚠️ Sorry, something went wrong.",
                    chat: messagePayload.chat
                });
            }
        });
    });
}

module.exports = initSocketServer;
