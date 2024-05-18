import { getShanghaiDate } from "@/logger/util";
import dayjs from "dayjs";

export const revalidate = 0; //默认是false，这种情况下生产环境下get方法好像全都是缓存的不会重新验证更新
export async function GET(request: Request) {
  try {
    // throw new Error(JSON.stringify({ msg: "test Error" }));
    const d = new Date();
    return Response.json({
      time: dayjs().format(),
      t: d.toUTCString(),
      h: d.getUTCHours(),
    });
  } catch (error: any) {
    // logger.error(error);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(error);
      }, 3000);
    });
    return Response.json(
      {
        msg: JSON.stringify(error?.message),
        date: getShanghaiDate(),
      },
      { status: 500 }
    );
  }
}
