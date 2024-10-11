import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  console.log({
    AK: process.env.BDAK,
    SK: process.env.BDSK,
  });
  await app.listen(3000);
}
bootstrap();
