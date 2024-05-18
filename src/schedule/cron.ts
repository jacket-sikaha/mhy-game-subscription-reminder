import { CronJob } from "cron";

export const job = new CronJob(
  "*/5 * * * * *", // cronTime
  async function () {
    const data = await fetch("http://localhost:3000/api/log", {
      method: "post",
    });
    return await data.json();
  }, // onTick
  null, // onComplete
  false, // start
  "Asia/Shanghai" // timeZone
);
console.log(123123);
export const a = () => console.log(job);
export const s = () => job.start();
export const e = () => job.stop();

class MyCronJob {
  job: CronJob<null, CronJob<null, null>>;
  running: boolean = false;
  constructor() {
    this.job = new CronJob(
      "*/5 * * * * *", // cronTime
      async function () {
        const data = await fetch("http://localhost:3000/api/log", {
          method: "post",
        });
        return await data.json();
      }, // onTick
      null, // onComplete
      false, // start
      "Asia/Shanghai" // timeZone
    );
  }

  s() {
    this.running = true;
    this.job.start();
  }

  e() {
    this.running = false;
    this.job.stop();
  }
}
const myCronJob = new MyCronJob();
export default myCronJob;
