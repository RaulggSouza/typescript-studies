export type Issue = {
    path: string;
    message: string;
    code: string;
};

export type ErrorCodeBase =
  | 'invalid_json'
  | 'unsupported_media_type'
  | 'not_found'
  | 'method_not_allowed'
  | 'stream_error';

export type EchoError =
  | { error: 'validation_error'; issues: Issue[] }
  | { error: ErrorCodeBase };