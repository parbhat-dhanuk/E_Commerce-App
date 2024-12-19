import multer from 'multer';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import {config} from 'dotenv';
config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

// File type validation
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extname) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid image type. Only JPEG, PNG, and GIF are allowed.')); // Reject the file
  }
};

const upload = multer({
  storage,
  fileFilter
})
.single('image') // Handling single image file uploads


export { upload,cloudinary }