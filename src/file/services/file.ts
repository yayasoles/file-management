/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import { FileEntity } from 'src/entities/file.entity';
import { FolderEntity } from 'src/entities/folder.entity';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileResponsitory: Repository<FileEntity>,
    @InjectRepository(FolderEntity)
    private readonly folderResponsitory: Repository<FolderEntity>,
  ) {}
  async upload(file: Express.Multer.File, fileId: string) {
    const fieldname = file.fieldname;
    const originalname = file.originalname;
    const mimetype = file.mimetype.split('/');
    const fileEntity = new FileEntity();
    fileEntity.name = fieldname;
    fileEntity.type = mimetype[0];
    const path = fieldname + fileId;
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
    const folderPath = `./uploads/${path}`
    try {
      const files = await fs.promises.readdir(folderPath);
      console.log(files)
      return files
    } catch (err) {
      console.error('Error reading folder:', err);
    }
  }
}
