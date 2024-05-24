export interface PostApiResponse {
  retcode: number;
  message: string;
  data: PostData;
}

// 帖子数据
interface PostData {
  list: PostItem[]; // 帖子列表
  is_last: boolean; // 表示这是否是最后一批帖子，用于分页
  next_offset: string; // 下一批帖子的偏移或识别码
}

// 帖子列表中的每项
export interface PostItem {
  post: Post; // 详情参见 Post 接口
  forum: Forum; // 论坛信息接口
  topics: Topic[]; // 主题列表
  user: User; // 发帖用户信息接口
  self_operation: Selfoperation; // 当前用户对这个帖子的操作状态
  stat: Stat; // 帖子相关的统计数据
  help_sys: null; // 未使用或无信息时返回null
  cover: null; // 未使用或无信息时返回null
  image_list: Imagelist[]; // 帖子中包含的图片列表
  is_official_master: boolean; // 是否是官方管理员
  is_user_master: boolean; // 是否是用户管理员
  hot_reply_exist: boolean; // 是否存在热门回复
  vote_count: number; // 投票计数
  last_modify_time: number; // 最后修改时间
  recommend_type: string; // 推荐类型
  collection: null; // 收藏信息，未使用或无信息时返回null
  vod_list: any[]; // 视频列表，具体结构未给出需进一步确认
  is_block_on: boolean; // 是否开启屏蔽
  forum_rank_info: null; // 论坛等级信息，未使用或无信息时返回null
  link_card_list: any[]; // 链接卡片列表，具体结构未给出需进一步确认
  news_meta: null; // 新闻元数据，未使用或无信息时返回null
  recommend_reason: null; // 推荐原因，未使用或无信息时返回null
  villa_card: null; // Villa卡信息，未使用或无信息时返回null
  is_mentor: boolean; // 是否是指导者或导师
  villa_room_card: null; // Villa房间卡信息，未使用或无信息时返回null
  reply_avatar_action_info: null; // 回复头像操作信息，未使用或无信息时返回null
  challenge: null; // 挑战信息，未使用或无信息时返回null
  hot_reply_list: any[]; // 热门回复列表，具体结构未给出需进一步确认
  villa_msg_image_list: any[]; // Villa信息图片列表，具体结构未给出需进一步确认
}

interface Imagelist {
  url: string;
  height: number;
  width: number;
  format: string;
  size: string;
  crop: null;
  is_user_set_cover: boolean;
  image_id: string;
  entity_type: string;
  entity_id: string;
  is_deleted: boolean;
}

// 论坛信息
interface Forum {
  id: number; // 论坛的唯一标识符
  name: string; // 论坛的名称，如"官方"
  icon: string; // 论坛的图标URL
  game_id: number; // 论坛关联的游戏ID
  forum_cate: null; // 论坛的分类信息（当前为空）
}

// 用户信息
interface User {
  uid: string; // 用户唯一标识符
  nickname: string; // 用户昵称
  introduce: string; // 用户签名或个人介绍
  avatar: string; // 用户头像的代号
  gender: number; // 用户性别
  certification: Certification; // 用户认证信息，如认证类型和标签
  level_exp: Levelexp; // 用户等级和经验值
  is_following: boolean; // 当前登录用户是否关注该用户
  is_followed: boolean; // 该用户是否已被当前登录用户关注
  avatar_url: string; // 用户头像的URL
  pendant: string; // 用户挂件的URL
  certifications: Certification[]; // 用户的认证信息数组
  is_creator: boolean; // 用户是否为创建者
  avatar_ext: Avatarext; // 用户头像扩展信息
}

// 帖子统计数据
interface Stat {
  view_num: number; // 帖子的查看数
  reply_num: number; // 帖子的回复数
  like_num: number; // 帖子的点赞数
  bookmark_num: number; // 帖子的收藏数
  forward_num: number; // 帖子的转发数
  original_like_num: number; // 原始点赞数（可能与like_num有所区别）
  post_upvote_stat: Postupvotestat[]; // 包含帖子点赞的详细统计信息，不同的点赞类型和数量
}

interface Certification {
  type: number; // 认证类型
  label: string; // 认证标签
}

interface Levelexp {
  level: number; // 用户等级
  exp: number; // 用户经验值
}

interface Avatarext {
  avatar_type: number; // 头像类型
  avatar_assets_id: string; // 头像资源ID
  resources: any[]; // 头像资源数组
  hd_resources: any[]; // 高清头像资源数组
}

interface Postupvotestat {
  upvote_type: number; // 点赞类型
  upvote_cnt: number; // 点赞数量
}

interface Postupvotestat {
  upvote_type: number;
  upvote_cnt: number;
}

interface Selfoperation {
  attitude: number;
  is_collected: boolean;
  upvote_type: number;
}

interface Topic {
  id: number;
  name: string;
  cover: string;
  is_top: boolean;
  is_good: boolean;
  is_interactive: boolean;
  game_id: number;
  content_type: number;
}

export interface Post {
  game_id: number; // 关联的游戏ID
  post_id: string; // 帖子的唯一标识
  f_forum_id: number; // 帖子所属的论坛ID
  uid: string; // 发帖用户的唯一ID
  subject: string; // 帖子标题
  content: string; // 帖子内容
  cover: string; // 帖子的封面图片URL
  view_type: number; // 帖子的查看类型标志
  created_at: number; // 创建时间的时间戳
  images: string[]; // 帖子中包含的图片URL列表
  post_status: Poststatus; // 帖子的状态信息，如是否置顶等
  topic_ids: number[]; // 帖子相关的主题ID列表
  view_status: number; // 帖子的可见状态
  max_floor: number; // 帖子内的最大楼层号
  is_original: number; // 是否为原创帖子的标志
  republish_authorization: number; // 再发布授权的状态
  reply_time: string; // 最后回复的时间
  is_deleted: number; // 帖子是否已被删除的标志
  is_interactive: boolean; // 帖子是否可交互的标志
  structured_content: string; // 帖子的结构化内容
  structured_content_rows: any[];
  review_id: number;
  is_profit: boolean;
  is_in_profit: boolean;
  updated_at: number;
  deleted_at: number;
  pre_pub_status: number;
  cate_id: number;
  profit_post_status: number;
  audit_status: number;
  meta_content: string;
  is_missing: boolean;
  block_reply_img: number;
  is_showing_missing: boolean;
  block_latest_reply_time: number;
  selected_comment: number;
  is_mentor: boolean;
}

interface Poststatus {
  is_top: boolean; // 是否置顶
  is_good: boolean; // 是否加精
  is_official: boolean; // 是否官方发布
  post_status: number; // 帖子状态码
}
