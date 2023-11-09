const multer = require('multer');
const path = require('path')
const sharp = require("sharp");
const fs = require('fs');
const originalStorage = multer.memoryStorage();
const originalUpload = multer({storage: originalStorage});
const scaleFactor = 0.2;
const compressAndStore = async(file) => {
  const processedImage = sharp(file.buffer)
  .metadata().then((metadata) => {
    const newWidth = Math.round(metadata.width * scaleFactor);
    const newHeight = Math.round(metadata.height * scaleFactor);
    return sharp(file.buffer).resize(newWidth,newHeight).toBuffer();
  })

  const processedImageData = await processedImage;
  const compressedImageFilename = `compressed_${file.originalname}`;
  const compressedImagePath = path.join(__dirname, '../uploads/', compressedImageFilename);
 fs.writeFileSync(compressedImagePath, processedImageData);
  return compressedImageFilename;
}

module.exports = {originalUpload,compressAndStore};