import { Injectable } from '@nestjs/common';

@Injectable()
export class MhyService {
  isChanged = 1;

  setIsChanged() {
    this.isChanged = ++this.isChanged;
    return this.isChanged;
  }

  getIsChanged() {
    return this.isChanged;
  }

  // 获取米友社官方账号最新帖子
  async getTheLatestPostOnTheOfficialAccountOfMiyouClub() {
    // const res = await fetch(
    //   'https://bbs-api.miyoushe.com/post/wapi/userPost?size=20&uid=75276550',
    // );
    // return res.json();
    return 1;
  }
}
