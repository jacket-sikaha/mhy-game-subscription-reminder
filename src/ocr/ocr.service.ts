import { Injectable } from '@nestjs/common';
import { BDOcrRes, OauthRes, OcrSpaceRes } from './interfaces/type';

@Injectable()
export class OcrService {
  /**
   *
   * OcrSpace的免费识别图片服务
   * @param {string} imageURL
   * @return {*}
   * @memberof OcrService
   */
  async parseImageURL(imageURL: string) {
    try {
      const res = await fetch(
        `https://api.ocr.space/parse/imageurl?apikey=donotstealthiskey_ip1&url=${imageURL}&language=chs`,
      );
      const { OCRExitCode, ParsedResults, ErrorMessage }: OcrSpaceRes =
        await res.json();

      if (OCRExitCode > 2) {
        throw ErrorMessage;
      }
      return ParsedResults[0].ParsedText;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * 百度ocr服务
   *
   * @param {string} imageURL
   * @memberof OcrService
   */
  async parseImageURLByBD(imageURL: string) {
    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append('paragraph', 'false');
      urlencoded.append('probability', 'false');
      urlencoded.append('url', imageURL);
      const token = await this.getBDServiceAccessToken();

      const tmp = await fetch(
        'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=' +
          token,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlencoded,
        },
      );
      const res: BDOcrRes = await tmp.json();
      if (res.error_msg || res.error_code) {
        return undefined;
      }
      return res.words_result.map((item) => item.words).join(' ');
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * 使用 AK，SK 生成鉴权签名（Access Token）
   * @return string 鉴权签名信息（Access Token）
   */
  async getBDServiceAccessToken(AK = process.env.BDAK, SK = process.env.BDSK) {
    try {
      const tmp = await fetch(
        'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' +
          AK +
          '&client_secret=' +
          SK,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const res: OauthRes = await tmp.json();
      if (res.error) {
        return undefined;
      }
      return res.access_token;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
