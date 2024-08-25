const multer = require('multer');
const SharpMulter  =  require("sharp-multer");

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const newFileName = (og_filename, options) => {
  const newname = Date.now()+"."+options.fileFormat;
  return newname;
};

const storage =  
 SharpMulter ({
              destination:(req, file, callback) =>callback(null, "images"),
              imageOptions:{
              fileFormat: "png",
               quality: 80,
               resize: { width: 200, height: 200 },
                 },
              filename: newFileName
           });
module.exports = multer({storage: storage}).single('image');