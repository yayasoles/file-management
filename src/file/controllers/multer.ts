/* eslint-disable prettier/prettier */
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      let finalPath='./uploads'
      if(req.query?.path === null){
        const path=`${finalPath}/${req.query.path}`
        finalPath=path
      }
      
      cb(null, finalPath);
    },
    filename: (req, file, cb) => {
      const randomName = Date.now() + '-' + Math.round(Math.random() * 1E9);
      console.log(randomName)
      req.body.result = `${randomName}${extname(file.originalname)}`;
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
