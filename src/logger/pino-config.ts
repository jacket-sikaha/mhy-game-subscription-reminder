import * as fs from "fs";
import pino, { multistream } from "pino";

// 创建一个追加模式的写入流
const logStream = fs.createWriteStream("./my-log.log", { flags: "a" });

const streams = [
  {
    stream: process.env.NODE_ENV === "production" ? logStream : process.stdout,
  },
  // { stream: process.stdout }, // 标准输出流（控制台）
].filter((v) => !!v);

// nextjs无法使用pino的transport
export const logger = pino(
  {
    browser: { asObject: true },
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  multistream(streams)
);
