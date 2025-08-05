const postModel = require("../models/post.model");
const genrateCaption = require("../service/ai.service");
const pictureUpload = require("../service/image.service");
const { v4: uuidv4 } = require('uuid');


async function creatPostcontroller(req, res) {
    const file = req.file;
   
    const base64Image = new Buffer.from(file.buffer).toString('base64');
    const caption = await genrateCaption(base64Image);
    const response = await pictureUpload(file.buffer,`${uuidv4()}`)


    const post = await postModel.create({
        image:response.url,
        caption:caption,
        user:req.user._id
    })


    res.status(201).json({
        post
    })
};


module.exports = creatPostcontroller;