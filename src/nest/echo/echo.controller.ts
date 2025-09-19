import { All, Controller, Post, Body, Header, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { ContentTypeGuard } from "../http/content-type.guard.js";
import { EchoDto } from './echo.dto.js'


@Controller('echo')
export class EchoController {
    @Post()
    @UseGuards(ContentTypeGuard)
    @Header('Content-Type', 'application/json; charset=utf-8')
    postEcho(@Body() body: EchoDto){
        return body;
    }

    @All()
    @Header('Allow', 'Post')
    notAllowed(){
        throw new HttpException(
            {error : 'method_not_allowed'},
            HttpStatus.METHOD_NOT_ALLOWED,
        );
    }
}