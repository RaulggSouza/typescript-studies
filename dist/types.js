import { z } from "zod";
export const EchoSchema = z.object({
    hello: z.string().trim().nonempty(),
    n: z.number().int().min(0)
}).strict();
export function issues_to_list(error) {
    return error.issues.map(i => ({
        path: i.path.join("."),
        message: i.message,
        code: i.code
    }));
}
