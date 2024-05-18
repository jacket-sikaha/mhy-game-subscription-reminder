import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

export type messageType = {
  msg: string;
  user: string;
  _msg?: unknown;
};

export type messageResType = {
  message: { msg: string; user: string; _msg: string };
  timestamp: string;
  level: string;
  source: string;
};

export const constructLog = (
  message: messageType,
  level = "info",
  timestamp = new Date().toLocaleString(),
  source = "sikara"
): messageResType => ({
  message: { ...message, _msg: JSON.stringify(message._msg) ?? "" },
  timestamp,
  level: level.toUpperCase(),
  source,
});

export const getShanghaiDate = () =>
  dayjs().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");

console.log(888888);
