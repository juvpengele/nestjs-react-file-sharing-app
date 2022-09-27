import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Param,
  Post,
  HttpStatus,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() userPayload: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(userPayload);
      await this.authService.sendRegistrationEmail(createdUser);

      return plainToInstance(User, createdUser.toObject());
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('confirm/:token')
  async confirm(@Param('token') token: string, @Res() response: Response) {
    try {
      const isValidated = await this.authService.validateUserAccount(token);

      if (!isValidated) {
        throw new BadRequestException({ message: 'Invalid token' });
      }

      response.status(HttpStatus.OK).json({
        message: 'User has been validated successfully',
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
