import { type ExceptionFilter, Catch, type ArgumentsHost, HttpException, Injectable } from "@nestjs/common";
import type { Response } from "express";

@Injectable()
@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        let status = 500;
        let body: any = {error: 'internal_error'};

        if(exception instanceof HttpException){
            status = exception.getStatus();
            const response = exception.getResponse();

            if(typeof response === 'object'){
                body = response;
            } else {
                body = { error: String(response)};
            }
        }

        if (
            exception instanceof HttpException &&
            exception.getStatus() === 400 &&
            String(exception.getResponse()).includes('Unexpected token')
        ) {
            status = 400;
            body = { error: 'invalid_json' };
        }

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(status).json(body);
    }
}