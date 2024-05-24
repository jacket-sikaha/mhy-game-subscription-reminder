import { Injectable } from '@nestjs/common';
import { Post, PostApiResponse } from './interfaces/post-data';
import dayjs from 'dayjs';
import { getShanghaiDate } from 'src/util/utils';
import { DingdingService } from 'src/dingding/dingding.service';

@Injectable()
export class MhyService {
  constructor(private dingdingService: DingdingService) {}

  // 获取米友社官方账号最新帖子
  async getTheLatestPostOnTheOfficialAccountOfMiyouClub() {
    const res = await fetch(
      'https://bbs-api.miyoushe.com/post/wapi/userPost?size=20&uid=75276550',
    );
    const data: PostApiResponse = await res.json();
    return data.data.list.map(({ post }) => post);
  }

  getPreviewBroadcastData(posts: Post[]) {
    const target = posts.find(({ subject, created_at, images, content }) => {
      return subject.includes('前瞻特别节目'); // 前瞻特别节目预告
    });
    return target;
  }

  async isRecentPreviewBroadcast(target: Post) {
    // const target = await this.getPreviewBroadcastData();
    const postTime = dayjs(target.created_at);
    const liveTime = postTime.add(2, 'day');
    const current = getShanghaiDate();
    return current.isBefore(liveTime);
  }

  async handleCron() {
    const data = await this.getTheLatestPostOnTheOfficialAccountOfMiyouClub();
    const post = this.getPreviewBroadcastData(data);
    if (this.isRecentPreviewBroadcast(post)) {
      return this.dingdingService.prepareMsgBody();
    }
    return [];
  }
}
