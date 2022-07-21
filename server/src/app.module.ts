import { UniqueEmailRule } from './modules/auth/validators/unique-email.rule';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './services/mail/mail.module';
import { MailService } from './mail/services/mail/mail.service';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    MailModule,
    FileModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService, UniqueEmailRule],
})
export class AppModule {}
