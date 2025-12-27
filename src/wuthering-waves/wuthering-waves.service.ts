import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { postTemplate } from 'src/util';
import { WWResponse } from './interfaces/post-data';

export const LIVE_TITLE_KEYWORDS = ['前瞻特别通讯预告', '前瞻通讯预告'];
export const LIVE_CONTENT_KEYWORDS = '正式播出';

@Injectable()
export class WutheringWavesService {
  async getOfficialPostData() {
    const urlencoded = new URLSearchParams();
    urlencoded.append('searchType', '1');
    urlencoded.append('type', '2');
    urlencoded.append('otherUserId', '10012001');
    urlencoded.append('pageIndex', '1');
    urlencoded.append('pageSize', '15');
    const response = await fetch('https://api.kurobbs.com/forum/getMinePost', {
      method: 'POST',
      body: urlencoded,
    });
    const { data } = (await response.json()) as WWResponse;
    return data.postList;
  }

  async sendMarkdownMsg(): Promise<
    { title: string; text: string; haveLive?: boolean } | undefined
  > {
    const data = (await this.getOfficialPostData()).map((item) => {
      return {
        id: item.postId,
        title: item.postTitle,
        content: item.postContent,
        image: item.imgContent?.[0]?.url || '',
        createTime: dayjs(Number(item.createTimestamp)).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
      };
    });
    const livePost = data.find(
      (item) =>
        LIVE_TITLE_KEYWORDS.every((keyword) => item.title.includes(keyword)) ||
        item.content.includes(LIVE_CONTENT_KEYWORDS),
    );
    const liveTimeStr = livePost?.content
      .replace(/\s/g, '')
      .match(/\d{4}年\d{1,2}月\d{1,2}日\d{1,2}:\d{1,2}/)?.[0];
    const liveTime = dayjs(liveTimeStr, 'YYYY M D HH:mm', 'zh-cn').format(
      'YYYY-MM-DD HH:mm',
    );
    const isBeforeLiveTime = dayjs('2025-12-12 19:00').isBefore(
      dayjs(liveTime),
    );
    const isSameDay = dayjs('2025-12-12 19:00').isSame(dayjs(liveTime), 'day');
    const isBeforeOrSameDay = isBeforeLiveTime || isSameDay;

    if (!livePost || !liveTime || !isBeforeOrSameDay) {
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
      ${postTemplate(livePost.title, livePost.content, livePost.createTime, livePost.image)}

      - 大概开始时间：${liveTime}
      - **记得使用兑换码！！！！！！**
      `,
      haveLive: true,
    };
  }
}
