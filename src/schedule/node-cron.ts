import { logger } from "@/logger/pino-config";
import cron from "node-cron";

logger.info("定时任务开始运行。。。");
// 创建定时任务
export const task = cron.schedule(
  "*/5 * * * * *",
  async () => {
    const data = await fetch("http://localhost:3000/api/log", {
      method: "post",
    });
    return await data.json();
  },
  {
    scheduled: false,
    timezone: "Asia/Shanghai",
  }
);

// export const job = schedule.scheduleJob("*/5 * * * * *", async () => {
//   // 在客户端代码中，使用/api/log 请求的 URL 是相对于http://localhost:3000的路径，即根路径。
//   // 服务器端 无法直接使用该路径，相对的根路径不一样
//   const data = await fetch("http://localhost:3000/api/log", { method: "post" });
//   return await data.json();
// });
