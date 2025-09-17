import { Controller, Get, Header } from "@nestjs/common";

@Controller('health')
export class HealthController {
    @Get()
    @Header('Content-Type', 'application/json; charset=utf-8')
    getHealth(){
        return {status: 'ok'};
    }
}