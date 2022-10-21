import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { BodyDto } from './dtos/bodyDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return this.appService.getHello();
  }

  @Get('get-value')
  @Render('getValue')
  getValue() {
    return this.appService.getHello();
  }

  @Post()
  saveToRedis(@Body() body: BodyDto) {
    return this.appService.saveToRedis(body);
  }

  @Post('get-value')
  getRedisValue(@Body() body: any) {
    return this.appService.getRedisValue(body);
  }
}
