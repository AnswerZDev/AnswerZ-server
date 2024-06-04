import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from 'express';
const path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://answerz.games', // Autoriser les requêtes depuis cette origine
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Autoriser ces méthodes HTTP
    allowedHeaders: 'Content-Type, Accept, Authorization, skip-cache, cache-control', // Autoriser ces en-têtes
  });

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

  // Configurer la limite de taille de chargement
  //app.use(express.json({ limit: '100mb' }));
  //app.use(express.urlencoded({ limit: '100mb', extended: true }));

  app.use(express.static('public'));

  await app.listen(3000);
}
bootstrap();
