import { z } from "zod";
import type { Issue } from "../../types.js";

export function issues_to_list(error:z.ZodError): Issue[]{
    return error.issues.map(i => ({
        path: i.path.join("."),
        message: i.message,
        code: i.code
    }));
}