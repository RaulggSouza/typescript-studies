import { z } from "zod";

export const EchoSchema = z.object({
    hello: z.string().trim().nonempty(),
    n: z.number().int().min(0)
}).strict();

export type ErrorCodeBase =
  | 'invalid_json'
  | 'unsupported_media_type'
  | 'not_found'
  | 'method_not_allowed'
  | 'stream_error';

export type EchoBody = z.infer<typeof EchoSchema>;

export type ErrorBody = 
    | {error:'validation_error'; issues: Issue[]}
    | {error: ErrorCodeBase}


export type Issue = {
    path:string,
    message:string,
    code:string
}