import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller.js";
import { EchoController } from "./echo/echo.controller.js";
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "./http/http-exception.filter.js";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
  ],
  controllers: [HealthController, EchoController],
  providers: [{ provide: APP_FILTER, useClass: HttpErrorFilter }],
})
export class AppModule {}
