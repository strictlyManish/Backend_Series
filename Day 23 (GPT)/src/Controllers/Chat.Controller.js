const ChatModel = require("../Models/Chat.model");

async function ChatController(req, res) {

    const { title } = req.body;
    const user = req.user;

    const chat = await ChatModel.create({
        user: user._id,
        title
    });

    res.status(201).json({
        message: "Chat created successfully",
        chat: {
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }
    });

};



module.exports = ChatController;