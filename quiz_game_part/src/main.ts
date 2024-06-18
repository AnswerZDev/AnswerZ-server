import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour l'application NestJS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Answerz API")
    .setDescription("The AnswerZ API description")
    .setVersion("1.0")
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token', // C'est ici que vous définissez le nom du Bearer Token
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document, {
    swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: "alpha",
    },
  });

  // Configurer CORS spécifiquement pour Socket.IO
  app.use(cors({
    origin:  "http://localhost:4200",
    credentials: true,
  }));

  app.use(express.static('public'));

  await app.listen(3100);
}
bootstrap();
