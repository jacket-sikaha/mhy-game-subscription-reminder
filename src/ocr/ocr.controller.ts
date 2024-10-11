import { Controller, Get, Post } from '@nestjs/common';

@Controller('ocr')
export class OcrController {
  @Post('env')
  getENV(): string {
    return JSON.stringify({
      AK: process.env.BDAK,
      SK: process.env.BDSK,
    });
  }
}
