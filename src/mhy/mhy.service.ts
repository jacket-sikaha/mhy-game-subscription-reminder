import { Injectable } from '@nestjs/common';
import { Post, PostApiResponse } from './interfaces/post-data';
import dayjs, { Dayjs } from 'dayjs';
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

  /**
   *
   * 判断现在时间是否在 发版帖子日期推断的直播时间或ocr所得的直播时间 之前
   * @param {number} post_created_at
   * @param {Dayjs} [accurateTimeBYOcr]
   * @return {*}
   * @memberof MhyService
   */
  async isRecentPreviewBroadcast(
    post_created_at: number,
    accurateTimeBYOcr?: Dayjs,
  ) {
    try {
      const postTime = dayjs.unix(post_created_at);
      const liveTime = accurateTimeBYOcr ?? postTime.add(3, 'day');
      const current = getShanghaiDate();
      return (
        current.isSame(liveTime, 'day') || current.isBefore(liveTime, 'day')
      );
    } catch (error) {
      return false;
    }
  }
  async getAccurateTimeBYOcr(postCover?: string) {
    if (!postCover) return undefined;
    const res = await this.ocrService.parseImageURLByBD(postCover);
    if (!res) return undefined;

    const strArr = this.handleOCRResult(res);
    if (!strArr) return undefined;
    const [mon, date] = strArr;
    return getShanghaiDate()
      .month(+mon - 1)
      .date(+date);
  }

  handleOCRResult(data: string) {
    if (
      !(data.includes('月') && data.includes('日')) ||
      !data.includes('开启')
    ) {
      return null;
    }
    const res = data.match(/(\d+)月(\d+)日/g);
    if (!res) {
      return null;
    }
    return res?.[0].split(/[^\d]/);
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
