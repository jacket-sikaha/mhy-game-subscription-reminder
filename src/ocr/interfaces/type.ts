export type OcrSpaceRes = {
  OCRExitCode: number;
  ErrorMessage?: string;
  ParsedResults: [
    {
      TextOverlay: {
        Lines: [
          {
            Words: [];
          },
        ];
      };
      ParsedText: string;
    },
  ];
};
export interface OauthRes {
  refresh_token: string;
  expires_in: number; // token有效期
  session_key: string;
  access_token: string;
  scope: string;
  session_secret: string;
  error?: string;
  error_description?: string;
}

export interface Words_result {
  words: string;
}

export interface BDOcrRes {
  log_id: number;
  words_result_num: number;
  words_result: Words_result[];
  error_msg: string;
  error_code: string;
}
