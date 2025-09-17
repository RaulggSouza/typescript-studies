import { All, Controller, Post, Get, Body, Header, HttpException, HttpStatus, UseGuards, UsePipes } from "@nestjs/common";
import { ContentTypeGuard } from "../http/content-type.guard.js";
import { ZodValidationPipe } from "../pipes/zod-validation.pipe.js";
import { type EchoBody, EchoSchema } from "../../types.js";

@Controller('echo')
export class EchoController {
    @Post()
    @UseGuards(ContentTypeGuard)
    @UsePipes(new ZodValidationPipe<EchoBody>(EchoSchema))
    @Header('Content-Type', 'application/json; charset=utf-8')
    postEcho(@Body() body: EchoBody){
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