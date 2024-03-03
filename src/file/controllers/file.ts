/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/file';
import { multerConfig } from './multer';
import { Response } from 'express';

@Controller('Files')
// @ApiTags('business-processes')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('createFolder/:name')
  async upload(@Param('name') name: string) {
    const res=await this.fileService.createFile(name)
    return {message:"Successesfully created"};
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const res = await this.fileService.upload(file, file.filename);
    return res
  }
  @Get('get-file/:fileId')
  async getFiles(@Param('fileId')fileId:string,@Res() res:Response) {
    return await this.fileService.getFile(fileId,res);
  }
  @Get('get-all-files/:path')
  async getAllFiles(@Param('path')path:string) {
    return await this.fileService.getAllFiles(path);
  }
}
