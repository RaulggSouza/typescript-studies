var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
let ContentTypeGuard = class ContentTypeGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const ct = (req.headers['content-type'] || '').toLowerCase();
        if (!ct.includes('application/json')) {
            throw new HttpException({ error: 'unsupported_media_type' }, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
        return true;
    }
};
ContentTypeGuard = __decorate([
    Injectable()
], ContentTypeGuard);
export { ContentTypeGuard };
//# sourceMappingURL=content-type.guard.js.map