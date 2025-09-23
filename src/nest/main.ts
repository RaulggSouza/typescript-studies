import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ConfigService } from "@nestjs/config";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { validation_errors_to_list } from "./util/validation-errors-to-issues.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          error: "validation_error",
          issues: validation_errors_to_list(errors),
        });
      },
    }),
  );

  const port = config.get<number>("PORT") ?? 3000;
  await app.listen(port);
}

bootstrap();
