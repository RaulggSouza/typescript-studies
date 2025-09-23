import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Injectable()
export class ContentTypeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const ct = (req.headers["content-type"] || "").toLowerCase();
    if (!ct.includes("application/json")) {
      throw new HttpException(
        { error: "unsupported_media_type" },
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
    return true;
  }
}
