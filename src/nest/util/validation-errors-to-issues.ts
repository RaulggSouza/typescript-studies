import type { ValidationError } from "@nestjs/common";
import type { Issue } from "../echo/echo-error.type.js";

export function validation_errors_to_list(errors: ValidationError[]): Issue[]{
    const walk = (e: ValidationError, parent = ''): Issue[] => {
        const path = parent ? `${parent}.${e.property}` : e.property;

        const current = 
            e.constraints
                ? Object.entries(e.constraints).map(([code, message]) => ({
                    path,
                    code,
                    message,
                }))
                : [];
        const children = e.children?.length ? e.children.flatMap(c => walk(c, path)) : [];
        return [...current, ...children];
    };

    return errors.flatMap(err => walk(err));
}