import { logger } from "@/logger/pino-config";
import { getShanghaiDate } from "@/logger/util";
import myCronJob, { a, e, job, s } from "@/schedule/cron";

export async function GET(request: Request) {
  // const { a } = await request.json();
  console.log(getShanghaiDate());
  console.log(myCronJob);
  if (myCronJob.running) {
    myCronJob.e();
  } else {
    myCronJob.s();
  }
  return Response.json({
    date: getShanghaiDate(),
  });
}
