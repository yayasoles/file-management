/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormioService } from './services/formio.service';
import { FormioController } from './controllers/formio.controller';
import { FormEntity } from 'src/entities/form.entity';

@Module({  
    imports: [
    TypeOrmModule.forFeature([ FormEntity
    ]),
    
  ],
  exports: [ FormioService],
  providers: [
    FormioService,
  ],
  controllers: [
    FormioController,
  ],})
export class FormioModule {}
