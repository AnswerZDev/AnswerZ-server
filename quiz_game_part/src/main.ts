// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketModule } from './socket/socket.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();