import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User, UserDocument } from '../../entities/user.entity';
import { Str } from '../../utils/str';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hash } from '../../utils/hash.utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userPayload: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...userPayload,
      password: await Hash.bcrypt(userPayload.password),
      rememberToken: Str.random(30),
      isActive: false,
    });

    return createdUser.save();
  }

  async exists(filters: {
    [key: string]: string | boolean | number;
  }): Promise<boolean> {
    return !!(await this.userModel.findOne(filters));
  }

  private async getUniqueRememberToken(): Promise<string> {
    let rememberToken = Str.random(40);

    while (
      await this.exists({
        rememberToken,
      })
    ) {
      rememberToken = Str.random(40);
    }

    return rememberToken;
  }
}
