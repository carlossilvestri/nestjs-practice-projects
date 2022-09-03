import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Si el usuario no envia la data necesaria le manda error (Configurada en los DTOS)
      forbidNonWhitelisted: true, // Habilita que le mande error el usuario si manda data no necesaria (Configurada en los DTOS)
    }),
  );
  await app.listen(3000);
}
bootstrap();
