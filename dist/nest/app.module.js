var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { HealthController } from './health/health.controller.js';
import { EchoController } from './echo/echo.controller.js';
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "./http/http-exception.filter.js";
import { ConfigModule } from "@nestjs/config";
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env']
            })
        ],
        controllers: [HealthController, EchoController],
        providers: [
            { provide: APP_FILTER, useClass: HttpErrorFilter }
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map