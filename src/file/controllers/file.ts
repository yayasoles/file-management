/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/file';
import { multerConfig } from './multer';
import { Request, Response } from 'express';

@Controller('Files')
// @ApiTags('Files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('createFolder/:name')
  async upload(@Param('name') name: string) {
    const res=await this.fileService.createFile(name)
    return {message:"Successesfully created"};
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req:Request) {
    console.log(req.body)
    const fileId=req.body.result
    const res = await this.fileService.upload(file, fileId);
    return {fileId:fileId}
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
