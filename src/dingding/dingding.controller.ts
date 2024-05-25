import { Controller, Post } from "@nestjs/common";

@Controller("dingding")
export class DingdingController {
  constructor(private readonly dingdingService: DingdingService) {}

  @Post("sendDiyGroupMsg")
  async sendDiyGroupMsg() {
    try {
      await this.dingdingService.sendDiyGroupMsg();
    } catch (error) {
      console.error(error);
    }
  }
}
