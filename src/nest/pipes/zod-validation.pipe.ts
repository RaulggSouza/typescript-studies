import { HttpException, Injectable, type PipeTransform, type ArgumentMetadata, HttpStatus } from "@nestjs/common";
import { issues_to_list } from "../util/zodToIssues.js";
import { type ZodType } from "zod";

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform{
    constructor(private readonly schema: ZodType<T>) {}

    async transform(value: unknown, metadata: ArgumentMetadata): Promise<T> {
        const parsed = await this.schema.safeParseAsync(value);
        if(!parsed.success){
            const issues = issues_to_list(parsed.error);
            throw new HttpException(
                {error: 'validation_error', issues},
                HttpStatus.BAD_REQUEST
            );
        }
        return parsed.data;
    }
}