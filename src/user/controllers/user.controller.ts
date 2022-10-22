import {
    Body,
    Controller, Get,
    HttpCode,
    HttpStatus, Param,
    Post, Render, Res,
    UploadedFile, UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "../services/user.service";
import {RegisterUserDto} from "../dtos/user.dto";
import {AnyFilesInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {ImageService} from "../upload.producer.service";
import {Response} from "express";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private  readonly imageService: ImageService,
        @InjectQueue('image-queue') private imageQueue: Queue
    ) {
    }

    @Get('')
    @Render('queue')
    index() {
        return this.userService.index()
    }

    @Get('/info')
    index2() {
        return this.userService.index()
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto);
    }

    @Get('/upload/:id')
    async getJobResult(@Res() response: Response, @Param('id') id: string) {
        const job = await this.imageQueue.getJob(id);
        const files = await job.data.files;

        if (!job) {
            return response.sendStatus(404);
        }

        return response.json({
            success: true,
            message: 'Uploaded!',
            data: files
        })
    }

    @Post('/upload')
    @UseInterceptors(AnyFilesInterceptor())
    upload(@Body() body: any, @UploadedFiles() files: Array<Express.Multer.File>) {
        this.imageService.upload(body, files)
        return {
            message: 'Uploading!',
            success: '...'
        };
        // return this.userService.upload(body, files);
    }
}
