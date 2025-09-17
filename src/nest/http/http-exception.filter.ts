import { type ExceptionFilter, Catch, type ArgumentsHost, HttpException, Injectable } from "@nestjs/common";
import { response, type Response } from "express";

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
        console.log('error' in response)
        if (
            exception instanceof HttpException && 
            typeof exception.getResponse() === 'object' &&
            response !== null &&
            exception.getStatus() === 404
            ){
                status = 404;
                body = {error: 'not_found'}
            }

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(status).json(body);
    }
}