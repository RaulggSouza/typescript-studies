export type Issue = {
  path: string;
  code: string;
  message: string;
};

export type ApiErrorCode =
  | "invalid_json"
  | "unsupported_media_type"
  | "not_found"
  | "method_not_allowed"
  | "stream_error"
  | "internal_error"
  | "validation_error"
  | "http_error"
  | "bad_request";

export type ApiError = {
  status: number;
  code: ApiErrorCode;
  message: string;
  issues?: Issue[];
};
