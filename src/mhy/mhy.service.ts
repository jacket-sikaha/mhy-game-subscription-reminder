import { Injectable } from '@nestjs/common';
import { Post, PostApiResponse } from './interfaces/post-data';
import dayjs from 'dayjs';
import { getShanghaiDate } from 'src/util/utils';
import { OcrService } from 'src/ocr/ocr.service';

@Injectable()
export class MhyService {
  constructor(private ocrService: OcrService) {}

  // 获取米友社官方账号最新帖子
  async getTheLatestPostOnTheOfficialAccountOfGenshin() {
    // const res = await fetch(
    //   'https://bbs-api.miyoushe.com/post/wapi/userPost?size=20&uid=75276550',
    // );
    const res = await fetch(
      'https://bbs-api.miyoushe.com/post/wapi/userPost?size=20&uid=75276539',
    );
    const data: PostApiResponse = await res.json();
    return data.data.list.map(({ post }) => post);
  }

  async getTheLatestPostOnTheOfficialAccountOfStarRail() {
    const res = await fetch(
      'https://bbs-api.miyoushe.com/post/wapi/userPost?size=20&uid=288909600',
    );
    const data: PostApiResponse = await res.json();
    return data.data.list.map(({ post }) => post);
  }

  getPreviewBroadcastData(posts: Post[]) {
    const target = posts.find(({ subject, created_at, images, content }) => {
      return subject.includes('前瞻特别节目预告'); //  '前瞻特别节目
    });
    return target;
  }

  isRecentPreviewBroadcast(target: Post) {
    const postTime = dayjs.unix(target.created_at);
    const liveTime = postTime.add(3, 'day');
    const current = getShanghaiDate();
    this.ocrService
      .parseImageURLByBD(target.cover)
      .then((res) => console.log(res && this.handleOCRResult(res)));
    return current.isSame(liveTime, 'day') || current.isBefore(liveTime, 'day');
  }

  handleOCRResult(data: string) {
    if (
      !(data.includes('月') && data.includes('日')) ||
      !data.includes('开启')
    ) {
      return null;
    }
    console.log('data', data);
    const res = data.match(/(\d+)月(\d+)日/g);
    return res?.[0];
  }

  // async handleCron() {
  //   const data = await this.getTheLatestPostOnTheOfficialAccountOfMiyouClub();
  //   const post = this.getPreviewBroadcastData(data);
  //   if (post && this.isRecentPreviewBroadcast(post)) {
  //     return this.dingdingService.prepareMsgBodyByMarddown(post, true);
  //   }
  //   return this.dingdingService.prepareMsgBodyByMarddown(post, false);
  // }
}
