import { getShanghaiDate } from "@/logger/util";
import { a, e, job } from "@/schedule/cron";

export async function POST(request: Request) {
  a();
  return Response.json({
    date: getShanghaiDate(),
  });
}
