import { type ExceptionFilter, Catch, type ArgumentsHost, HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { type Response } from "express";
import type { ApiError, ApiErrorCode, Issue } from "../echo/api-error.type.js";

@Injectable()
@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        
        let issues: Issue[] | undefined;
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let code: ApiErrorCode = 'internal_error';
        let message = 'Internal Server Error';

        if(exception instanceof HttpException){
            status = exception.getStatus();
            const payload = exception.getResponse();

            if (status === HttpStatus.UNSUPPORTED_MEDIA_TYPE){
                code = 'unsupported_media_type';
                message = 'Unsupported Media Type';
            } else if (status === HttpStatus.METHOD_NOT_ALLOWED){
                code = 'not_found';
                message = 'Route not found';
            } else if (status === HttpStatus.BAD_REQUEST && (payload as any).error === 'validation_error'){
                code = 'invalid_json';
                message = 'Invalid Json body';  
                issues = (payload as any).issues;
            }

        }

        const body: ApiError = {
            status,
            code,
            message,
            ...(issues ? {issues} : {})
        }

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(status).json(body);
    }
}