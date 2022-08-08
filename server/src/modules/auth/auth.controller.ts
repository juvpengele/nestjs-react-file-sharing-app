import { AuthService } from './auth.service';
import { Body, Controller, Param, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() userPayload: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(userPayload);
      await this.authService.sendRegistrationEmail(createdUser);

      return createdUser;
    } catch (error) {
      return error;
    }
  }

  @Post('confirm/:token')
  async confirm(@Param('token') token: string, @Res() response: Response) {
    try {
      const isValidated = await this.authService.validateUser(token);

      if (!isValidated) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid token',
        });
      }

      response.status(HttpStatus.OK).json({
        message: 'User has been validated successfully',
      });
    } catch (error) {
      console.error(error);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}
