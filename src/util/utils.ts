var dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone'); // dependent on utc plugi

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
  level = 'info',
  timestamp = new Date().toLocaleString(),
  source = 'sikara',
): messageResType => ({
  message: { ...message, _msg: JSON.stringify(message._msg) ?? '' },
  timestamp,
  level: level.toUpperCase(),
  source,
});

export const getShanghaiDate = () => dayjs().tz('Asia/Shanghai');
