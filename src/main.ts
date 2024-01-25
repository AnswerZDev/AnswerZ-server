import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
