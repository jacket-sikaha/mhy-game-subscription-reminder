// https://open.dingtalk.com/document/orgapp/custom-bot-send-message-type?spm=ding_open_doc.document.0.0.798e56caDu1Etf
export interface MsgBody {
  msgtype: "text" | "link" | "markdown" | "actionCard" | "feedCard";

  text?: {
    title: string;
    text: string;
  };
  link?: {
    title: string;
    text: string;
  };
  markdown?: {
    title: string;
    text: string;
  };
  actionCard?: {
    title: string;
    text: string;
  };
  feedCard?: {
    title: string;
    text: string;
  };

  at?: {
    // 被@人的手机号。
    //  在text内容里要有@人的手机号，只有在群内的成员才可被@，非群内成员手机号会被脱敏。
    atMobiles?: string[];

    atUserIds?: string[]; // 被@人的用户userId。

    isAtAll?: boolean; // 是否@所有人。
  };
}

export type structured_content = {
  insert: string | { image: string };
  attributes?: { link?: string; color?: string };
};
