import { Injectable } from '@nestjs/common';
import { Post, PostApiResponse } from './interfaces/post-data';
import dayjs from 'dayjs';
import { getShanghaiDate } from 'src/util/utils';

@Injectable()
export class MhyService {
  // constructor(private dingdingService: DingdingService) {}

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
    const liveTime = postTime.add(2, 'day');
    const current = getShanghaiDate();
    return current.isSame(liveTime, 'day') || current.isBefore(liveTime, 'day');
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
