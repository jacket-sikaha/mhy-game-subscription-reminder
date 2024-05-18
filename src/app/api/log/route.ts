import { getShanghaiDate } from "@/logger/util";
import { a, e, job, s } from "@/schedule/cron";

export async function POST(request: Request) {
  console.log(getShanghaiDate());
  return Response.json({
    date: getShanghaiDate(),
  });
}
