const postModel = require("../models/post.model");
const genrateCaption = require("../service/ai.service");




async function creatPostcontroller(req, res) {
    const file = req.file;
    console.log("File received:", file);

    const base64Image = new Buffer.from(file.buffer).toString('base64');

    const caption = await genrateCaption(base64Image);

    res.json({
        caption
    })
};


module.exports = creatPostcontroller;