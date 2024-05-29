import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour l'application NestJS
  app.enableCors();

  // Configurer CORS spécifiquement pour Socket.IO
  app.use(cors({
    origin:  "http://localhost:4200",
    credentials: true,
  }));

  await app.listen(3100);
}
bootstrap();
