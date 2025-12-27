import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // ES 2015
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault('Asia/Shanghai');

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
