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
const port=3002;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger config
  app.setGlobalPrefix('api');
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
      docExpansion: 'none',
    },
    customSiteTitle: 'IFHCRS',
  };
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('LM APIs')
    .setDescription('LM API Documentation')
    .setVersion('1.0')
    .setContact(
      'Tria Trading PLc',
      'http://peragosystems.com/',
      'perago@info.com',
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
  await app.listen(port).then(() => console.log(`app is running at port ${port}`));
}
bootstrap();
