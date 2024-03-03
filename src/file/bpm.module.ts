/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './services/file';
import { FileController } from './controllers/file';
import { FileEntity } from './entities/file.entity';
import { FolderEntity } from './entities/folder.entity';

// import { ServicePricingModule } from 'src/services/pricing/pricing.module';
// import { UserModule } from '../modules/user/user.module';
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
export class BpmModule {}
