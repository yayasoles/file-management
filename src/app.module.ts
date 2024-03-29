/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Module } from '@nestjs/common';
import { FileModule } from './file/bpm.module';
import { FormioModule } from './formio/formio.module';
import { HttpModule } from '@nestjs/axios';
@ApiTags('Users')
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [config],
    //   isGlobal: true,
    // }),
    // MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yaya@1984',
      database: 'file',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    FileModule,
    FormioModule,
    HttpModule
  ],
  controllers: [],
 
})
export class AppModule { }
