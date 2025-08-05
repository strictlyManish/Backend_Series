const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


async function pictureUpload(file,fileName) {
  const response = await  imagekit.upload({
        file:file,
        fileName:fileName,
        folder:"ai_caption/localdatabase"
    })

    return response
};



module.exports = pictureUpload;