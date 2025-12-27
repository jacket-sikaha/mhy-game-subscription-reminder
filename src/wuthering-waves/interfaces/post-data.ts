export interface CoverImage {
  imgHeight: number;
  imgWidth: number;
  index: number;
  pointOffsetX: number;
  pointOffsetY: number;
  sourceUrl: string;
  url: string;
}

export interface ImgContent {
  imgHeight: number;
  imgWidth: number;
  url: string;
}

export interface Topic {
  postId: string;
  topicId: number;
  topicName: string;
}

export interface WWPost {
  browseCount: string;
  commentCount: number;
  coverImages: CoverImage[];
  createTimestamp: string;
  gameForumId: number;
  gameId: number;
  gameName: string;
  identifyClassify: number;
  identifyNames: string;
  imgContent: ImgContent[];
  imgCount: number;
  ipRegion: string;
  isElite: number;
  isFollow: number;
  isLike: number;
  isLock: number;
  isOfficial: number;
  isPublisher: number;
  lastEditIpRegion: string;
  likeCount: number;
  newIdentifyNames: string[];
  postContent: string;
  postId: string;
  postTitle: string;
  postType: number; // 1=普通帖子，2=特别公告
  publishType: number;
  reviewStatus: number;
  showRange: number;
  showTime: string;
  topicList: Topic[];
  userHeadUrl: string;
  userId: string;
  userLevel: number;
  userName: string;
}

export interface WWData {
  viewList: any[];
  postList: WWPost[];
  hasNext: number;
}

export interface WWResponse {
  code: number;
  data: WWData;
  msg: string;
  success: boolean;
}
