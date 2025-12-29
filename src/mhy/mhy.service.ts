import { Injectable } from '@nestjs/common';
import { Post, PostApiResponse } from './interfaces/post-data';
import dayjs, { Dayjs } from 'dayjs';
import { getShanghaiDate } from 'src/util/utils';
import { OcrService } from 'src/ocr/ocr.service';
import { postTemplate } from 'src/util';

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

  async getTheLatestPostZZZ() {
    const res = await fetch(
      'https://bbs-api.miyoushe.com/post/wapi/userPost?size=20&uid=152039148',
      // 'https://bbs-api.miyoushe.com/post/wapi/userPost?size=50&uid=152039148&offset=70601716',
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

  async sendZZZMarkdownMsg(): Promise<
    { title: string; text: string; haveLive?: boolean } | undefined
  > {
    const data = (await this.getTheLatestPostZZZ()).map((item) => {
      return {
        id: item.post_id,
        title: item.subject,
        content: item.content,
        image: item.images?.[0] || '',
        createTime: dayjs
          .unix(Number(item.created_at))
          .format('YYYY-MM-DD HH:mm:ss'),
      };
    });
    const livePost = data.find((item) =>
      item.title.includes('前瞻特别节目预告'),
    );
    const liveTimeStr = livePost?.content
      .replace(/\s/g, '')
      .match(/\d{1,2}月\d{1,2}日\d{1,2}:\d{1,2}/)?.[0];
    const postCreateTime = dayjs(livePost?.createTime);
    const tmp = dayjs(liveTimeStr, 'M D HH:mm', 'zh-cn').year(
      postCreateTime.year(),
    );
    if (tmp.isBefore(postCreateTime)) {
      tmp.add(1, 'year');
    }
    const liveTime = tmp.format('YYYY-MM-DD HH:mm');
    const isBeforeLiveTime = dayjs().isBefore(dayjs(liveTime));
    const isSameDay = dayjs().isSame(dayjs(liveTime), 'day');
    const isBeforeOrSameDay = isBeforeLiveTime || isSameDay;

    if (!livePost || !liveTimeStr || !isBeforeOrSameDay) {
      return {
        title: `官方帖子消息`,
        text: `## 最新几条官方帖子消息  
          ${data.map((item) => postTemplate(item.title, '', item.createTime, item.image)).join('')}
          `,
      };
    }
    return {
      title: `${livePost.title}`,
      text: `
        ${postTemplate(livePost.title, livePost.content.replace('[图片]', ''), livePost.createTime, livePost.image)}

- 大概开始时间：2025-11-14 19:30
- **记得使用兑换码！！！！！！**
`,
      haveLive: true,
    };
  }
}
