export type Issue = {
    path: string;
    message: string;
    code: string;
};

export type ApiErrorCode =
  | 'invalid_json'
  | 'unsupported_media_type'
  | 'not_found'
  | 'method_not_allowed'
  | 'stream_error'
  | 'internal_error';

export type ApiError = {
  status: number;
  code: ApiErrorCode;
  message: string;
  issues?: Issue[]
}