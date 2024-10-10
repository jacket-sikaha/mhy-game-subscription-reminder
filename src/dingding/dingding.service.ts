import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { Post } from 'src/mhy/interfaces/post-data';
import dayjs from 'dayjs';
import { MhyService } from 'src/mhy/mhy.service';
import {
  MsgBody,
  MsgResponsive,
  StructuredContent,
} from './interfaces/msg-body';
import { GameType } from 'src/mhy/interfaces/game-type';

@Injectable()
export class DingdingService {
  constructor(private mhyService: MhyService) {}

  async sendDiyGroupMsg(type: GameType) {
    let data: Post[];
    switch (type) {
      case GameType.Genshin:
        data =
          await this.mhyService.getTheLatestPostOnTheOfficialAccountOfGenshin();
        break;
      case GameType.StarRail:
        data =
          await this.mhyService.getTheLatestPostOnTheOfficialAccountOfStarRail();
        break;
      default:
        return;
    }
    const post = this.mhyService.getPreviewBroadcastData(data);
    let body: MsgBody;
    if (post && (await this.mhyService.isRecentPreviewBroadcast(post))) {
      body = this.prepareMsgBodyByMarddown(post);
    } else {
      body = this.prepareMsgBodyByMarddown(data);
    }
    const { sign, timestamp } = this.getSign();
    const res = await fetch(
      `https://oapi.dingtalk.com/robot/send?access_token=${'dee451641816c0729c6d76b407010b3bf29baf1fe193fb9b0e570632458e0af8'}&timestamp=${timestamp}&sign=${sign}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log('body', body);
    const msgResponsive: MsgResponsive = await res.json();
    if (msgResponsive.errcode === '0' || msgResponsive.errmsg === 'ok') {
      return msgResponsive;
    }
    return Promise.reject(msgResponsive);
  }

  prepareMsgBodyByMarddown(data: Post | Post[]): MsgBody {
    if (Array.isArray(data)) {
      const content = data.map(({ subject }) => `- ${subject}`).join('\n');
      return {
        msgtype: 'markdown',
        markdown: {
          title: '资讯信息',
          text: `# 资讯信息\n ${content}`,
        },
      };
    }
    const { subject, structured_content, created_at } = data;
    const contents: StructuredContent[] = JSON.parse(structured_content);
    const content = contents.reduce((pre: string, cur) => {
      const { insert, attributes } = cur;
      if (typeof insert === 'string') {
        pre += insert;
      } else if (insert.image) {
        pre += `![${insert.image}](${insert.image})`;
      } else if (attributes && attributes.link) {
        pre += `[${insert}](${attributes.link})`;
      }
      return pre;
    }, '');

    const postDate = dayjs.unix(created_at).format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs
      .unix(created_at)
      .add(2, 'day')
      .format('YYYY-MM-DD HH:mm:ss');
    return {
      msgtype: 'markdown',
      markdown: {
        title: `重要活动提醒---${subject}`,
        text: `# 重要活动提醒\n ### ${subject}\n${content}  \n---\n\n- 发帖时间：${postDate}\n- 大概结束时间：${endDate}\n\n### 记得使用兑换码！！！！！！\n\n---`,
      },
      at: { isAtAll: true },
    };
  }

  getSign() {
    const timestamp = Date.now();
    const secret =
      'SECa8bdd79c83aeb0931aa9340ef4993d61a1f08d6afdc6059aa53a8d80aade03a0';
    const stringToSign = timestamp + '\n' + secret;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(stringToSign, 'utf-8');
    const sign = hmac.digest('base64');
    return { sign, timestamp };
  }
}
