import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/services/mail/mail.service';
import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {}

  async sendRegistrationEmail(user: User) {
    const clientAppUrl = this.config.get('app.webClientUrl');
    const rememberTokenUrl = `${clientAppUrl}/auth/confirm/${user.rememberToken}`;

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Confirmation Email | File Share App',
      template: './email-confirmation',
      context: {
        userName: user.name,
        url: rememberTokenUrl,
      },
    });
  }

  async validateUser(rememberToken: string): Promise<boolean> {
    try {
      const isValid = await this.userService.exists({ rememberToken });
      if (!isValid) {
        return false;
      }

      return await this.userService.validateUser(rememberToken);
    } catch (error) {
      return false;
    }
  }
}
