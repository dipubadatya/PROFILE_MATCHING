require('dotenv').config()
const cloudinary=require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')

const multer = require('multer');

cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
api_key: process.env.CLOUD_API_KEY,
api_secret: process.env.CLOUD_SECRET,
secure: true,
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "bput_job__web",
      formats: ["png","jpg","jpeg"]
    },
  });


  module.exports={
    cloudinary,storage,
  }