import { MailModule } from './../../services/mail/mail.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule, MailModule],
  providers: [AuthService],
})
export class AuthModule {}
