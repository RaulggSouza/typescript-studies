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


type Issue = {
    path:string,
    message:string,
    code:string
}

export function issues_to_list(error:z.ZodError): Issue[]{
    return error.issues.map(i => ({
        path: i.path.join("."),
        message: i.message,
        code: i.code
    }));
}