const dotenv = require('dotenv').config();
const cloudinaryModule = require('cloudinary');

//halkaan hoose hubi setappka in v2 ay sidaas tahay iyo inay is badashay iyo xitaa in update jiro cloudinary
const cloudinary = cloudinaryModule.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = cloudinary;
