# game-live-time-reminder

基于nestjs开发，借助相关接口数据和钉钉机器人API设计mhy游戏活动订阅提醒功能

#### 体验群

sikara邀请你加入钉钉群聊sikara，点击进入查看详情https://h5.dingtalk.com/ecologicalOrg/index.html?code=v1%2Ck1%2CDxta%2Fq986Cx06JfI%2F%2BWRrg0C4NO4%2F41qYgERCpcT3Lc%3D&origin=11&dd_darkmode=true&dd_mini_app_id=5000000005018615&dtaction=os#/inviteOutsideJoin

#### 开发日志

- 2025-12-29 添加绝区零直播提醒
- 2025-12-27 添加鸣潮直播提醒
- 2025-1-11 初始版本，支持genshin和starrail活动订阅提醒

# 测试接口

- /dingding/sendDiyGroupMsg
  body: {type:number}

- /dingding/mc-msg
- /dingding/zzz-msg

```ts
// 支持type如下
export enum GameType {
  Genshin = 2,
  StarRail = 6,
}
```

# 推荐vscode插件 Document This

选中方法，按两下Ctrl+Alt+D触发
