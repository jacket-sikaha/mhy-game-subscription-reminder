# mhy-game-subscription-reminder

基于nestjs开发，借助相关接口数据和钉钉机器人API设计mhy游戏活动订阅提醒功能

# 测试接口

/dingding/sendDiyGroupMsg

body: {type:number}

```ts
// 支持type如下
export enum GameType {
  Genshin = 2,
  StarRail = 6,
}
```

# 推荐vscode插件 Document This

选中方法，按两下Ctrl+Alt+D触发
