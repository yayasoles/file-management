/* eslint-disable prettier/prettier */
// multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: 
  diskStorage({
    destination: './uploads', // Specify the upload directory
    filename: (req, file, cb) => {
      const randomName = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
