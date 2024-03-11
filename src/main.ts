/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import axios from 'axios';
import { AxiosInterceptor } from './formio/interceptors/axios.interceptor';
const port=9000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const axiosInstance = axios.create({
    timeout: 120000, // Specify the timeout value in milliseconds (e.g., 5 seconds)
  });
  // swagger config
  app.setGlobalPrefix('api');
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
      docExpansion: 'none',
    },
    customSiteTitle: 'File',
  };
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('File APIs')
    .setDescription('File API Documentation')
    .setVersion('1.0')
    .setContact(
      'Noka Trading PLc',
      'http://Noka.com/',
      'yayasoles@info.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  app.use('/assets', express.static('assets'));
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtAuthGuard(reflector));
  SwaggerModule.setup('/', app, document, customOptions);
  app.enableCors({
    origin: '*',
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.useGlobalInterceptors(new AxiosInterceptor(axiosInstance));
  await app.listen(port).then(() => console.log(`app is running at port ${port}`));
}
bootstrap();
