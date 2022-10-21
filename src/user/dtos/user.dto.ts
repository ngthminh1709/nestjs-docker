import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto {
  id: string;
  @IsEmail() email: string;
  @Length(6) password: string;
  @IsNotEmpty() username: string;
}

export class LoginUserDto {
  @IsEmail() email: string;
  @Length(6) password: string;
}

export class LogoutUserDto {
  @IsNotEmpty() id: any;
}

export class JwtPayloadDto {
  id: string;
  role: string;
}

export class UserDto {
  email: string;
  username: string;
  password: string;
}
