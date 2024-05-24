import { Controller, Post } from '@nestjs/common';

@Controller('dingding')
export class DingdingController {
  @Post('sendDiyGroupMsg')
  async sendDiyGroupMsg() {
    try {
      await fetch(
        `https://oapi.dingtalk.com/robot/send?access_token=${1}&timestamp=${1}&sign=${1}`,
        { method: 'POST', body: JSON.stringify('') },
      );
    } catch (error) {
      console.error(error);
    }
  }
}
