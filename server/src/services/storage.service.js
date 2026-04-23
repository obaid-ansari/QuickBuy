const ImageKit = require("@imagekit/nodejs");
const config = require("../config/env");

const uploadPorductImage = async (buffer) => {
  try {
    var imagekit = new ImageKit({
      privateKey: config.IMAGE_KIT_PRIVATE_KEY,
    });

    const result = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName: "image.jpg",
      folder: "QuickBuy/Products",
    });

    const imageUrl = result.url;

    return imageUrl;
  } catch (error) {
    console.log(`Imagekit error: `, error.message);
  }
};

module.exports = uploadPorductImage;
