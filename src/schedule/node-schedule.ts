import schedule from "node-schedule";

// 定义任务
const task = schedule.scheduleJob("* * * * *", () => {
  console.log("任务正在执行...");
});
