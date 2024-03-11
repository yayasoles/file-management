/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './services/file';
import { FileController } from './controllers/file';
import { FileEntity } from 'src/entities/file.entity';
import { FolderEntity } from 'src/entities/folder.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileEntity,FolderEntity
    ]),
    
  ],
  exports: [ FileService],
  providers: [
    FileService,
  ],
  controllers: [
    FileController,
  ],
})
export class FileModule {}
