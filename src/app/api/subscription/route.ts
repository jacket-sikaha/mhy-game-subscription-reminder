import { logger } from "@/logger/pino-config";
import { getShanghaiDate } from "@/logger/util";
import myCronJob, { a, e, job, s } from "@/schedule/cron";

export async function POST(request: Request) {
  // const { a } = await request.json();
  console.log(getShanghaiDate());
  if (myCronJob.running) {
    myCronJob.e();
  } else {
    myCronJob.s();
  }
  console.log(myCronJob.running);
  return Response.json({
    date: getShanghaiDate(),
  });
}
