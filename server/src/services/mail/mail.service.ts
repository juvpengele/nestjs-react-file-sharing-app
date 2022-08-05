import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export type MailOptions = {
  to: string;
  subject: string;
  template: string;
  context: object;
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mailOptions: MailOptions) {
    await this.mailerService.sendMail(mailOptions);
  }
}
