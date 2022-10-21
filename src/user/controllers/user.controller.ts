import {Body, Controller, HttpCode, HttpStatus, Post, UseFilters, UseGuards} from '@nestjs/common';
import {UserService} from "../services/user.service";
import {RegisterUserDto} from "../dtos/user.dto";
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }
}
