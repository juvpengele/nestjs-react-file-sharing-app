import { Injectable } from '@nestjs/common';
import {User} from "../../entities/user.entity";

@Injectable()
export class AuthService {
  sendRegistrationEmail(user: User) {
    console.log('Send email to ...' + user.name);
  }
}
