var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Body, Header, HttpException, HttpStatus } from "@nestjs/common";
let EchoController = class EchoController {
    postEcho(body) {
        return body;
    }
    notAllowed() {
        throw new HttpException({ error: 'method_not_allowed' }, HttpStatus.METHOD_NOT_ALLOWED);
    }
};
__decorate([
    Post(),
    Header('Content-Type', 'application/json; charset=utf-8'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EchoController.prototype, "postEcho", null);
__decorate([
    Get(),
    Header('Allow', 'POST'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EchoController.prototype, "notAllowed", null);
EchoController = __decorate([
    Controller('echo')
], EchoController);
export { EchoController };
