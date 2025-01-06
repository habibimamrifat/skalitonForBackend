import { v2 as cloudinary } from 'cloudinary';
import config from '../../config';
import multer from 'multer';
import path from 'path';

export const sendPhotoToCloudinary = async (name: string, path: string) => {
  cloudinary.config({
    cloud_name: 'dvda0vxlb',
    api_key: '547158753897734',
    api_secret: config.cludnaryApiSecret,
  });

  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: name,
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
