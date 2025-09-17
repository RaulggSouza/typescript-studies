import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = Number(process.env.PORT) ?? 3000;
    await app.listen(port);
    const url = await app.getUrl();
    console.log(`${port} nest started at ${url}`);
}
bootstrap();
