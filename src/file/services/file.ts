/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';
import * as fs from 'fs';
import * as path from 'path';
import { FolderEntity } from '../entities/folder.entity';
import { Response } from 'express';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileResponsitory: Repository<FileEntity>,
    @InjectRepository(FolderEntity)
    private readonly folderResponsitory: Repository<FolderEntity>,
  ) {}
  async upload(file: Express.Multer.File, filePath: string) {
    const fieldname = file.fieldname;
    const originalname = file.originalname;
    const mimetype = file.mimetype.split('/');
    const fileEntity = new FileEntity();
    fileEntity.name = fieldname;
    fileEntity.type = mimetype[0];
    const path = fieldname + filePath;
    fileEntity.fileId = path;
    fileEntity.size = file?.size.toString();
    const result = await this.fileResponsitory.insert(fileEntity);
    return result;
  }
  async createFile(name: string) {
    try {
      const folderPath = `./uploads/${name}`;

      fs.mkdir(folderPath, { recursive: true }, async (err) => {
        if (err) {
          console.error('Error creating folder:', err);
          return;
        }
        const folderEntity = new FolderEntity();
        folderEntity.name = name;
        folderEntity.createdAt = new Date();
        const res = await this.folderResponsitory.save(folderEntity);
        return res;
      });
    } catch (error) {
      throw error;
    }
  }
  async getFile(fileId:string,@Res() res:Response) {
    try {
      const filePath = path.join(__dirname, '..', 'uploads', fileId);
      const contentType = 'image/png'
      res.setHeader('Content-Type', contentType);
      const fileContent = fs.readFileSync(`uploads/${fileId}`);
      return res.send(fileContent);
    } catch (err) {
      console.error('Error reading folder:', err);
    }
  }
  async getAllFiles(path:string) {
    const folderPath = `./${path}`

    try {
      const files = await fs.promises.readdir(folderPath);
      console.log(files)
      return files
    } catch (err) {
      console.error('Error reading folder:', err);
    }
  }
}
