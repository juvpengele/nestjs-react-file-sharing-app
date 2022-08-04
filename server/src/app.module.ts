import { UniqueEmailRule } from './modules/auth/validators/unique-email.rule';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './services/mail/mail.module';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database.uri'),
      }),
    }),
    AuthModule,
    MailModule,
    FileModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueEmailRule],
})
export class AppModule {}
