import {
  type ExceptionFilter,
  Catch,
  type ArgumentsHost,
  HttpException,
  Injectable,
  HttpStatus,
} from "@nestjs/common";
import { type Response } from "express";
import type { ApiError, ApiErrorCode, Issue } from "../echo/api-error.type.js";
import { isString } from "class-validator";

@Injectable()
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let issues: Issue[] | undefined;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: ApiErrorCode = "internal_error";
    let message = "Internal Server Error";

    if (exception instanceof SyntaxError) {
      const body: ApiError = {
        status: HttpStatus.BAD_REQUEST,
        code: "invalid_json",
        message: "Invalid JSON body",
      };
      return res.status(HttpStatus.BAD_REQUEST).json(body);
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const payload = exception.getResponse();

      if (status === HttpStatus.UNSUPPORTED_MEDIA_TYPE) {
        code = "unsupported_media_type";
        message = "Unsupported media type";
      } else if (status === HttpStatus.METHOD_NOT_ALLOWED) {
        code = "method_not_allowed";
        message = "Method not allowed";
      } else if (
        status === HttpStatus.BAD_REQUEST &&
        (payload as any).error === "validation_error"
      ) {
        code = "validation_error";
        message = "Validation error";
        issues = (payload as any).issues;
      } else if (status === HttpStatus.NOT_FOUND) {
        code = "not_found";
        message = "Route not found";
      } else if (status === HttpStatus.BAD_REQUEST) {
        code = "bad_request";
        message = typeof payload === "string" ? payload : "Bad Request";
      } else {
        code = "http_error";
        message = typeof payload === "string" ? payload : message;
      }
    }

    const body: ApiError = {
      status,
      code,
      message,
      ...(issues ? { issues } : {}),
    };

    res.status(status).json(body);
  }
}
