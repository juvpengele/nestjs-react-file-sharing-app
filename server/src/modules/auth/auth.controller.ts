import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
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
}
