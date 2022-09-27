import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User, UserDocument } from '../../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Str } from '../../utils/str';
import { Hash } from '../../utils/hash.utils';

export type FilterOptions = {
  [key: string]: string | boolean | number;
};

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async fetchOne(filters: FilterOptions) {
    return await this.userModel.findOne(filters);
  }

  async createUser(
    userPayload: CreateUserDto,
  ): Promise<HydratedDocument<UserDocument>> {
    const createdUser = new this.userModel({
      ...userPayload,
      password: await Hash.bcrypt(userPayload.password),
      rememberToken: await this.getUniqueRememberToken(),
      isActive: false,
      created: new Date(),
    });

    return createdUser.save();
  }

  async exists(filters: FilterOptions): Promise<boolean> {
    return !!(await this.userModel.findOne(filters));
  }

  async validateUser(rememberToken: string): Promise<boolean> {
    try {
      const response = await this.userModel.updateOne(
        { rememberToken },
        { rememberToken: null, isActive: true },
      );

      return !!(response.modifiedCount > 0);
    } catch (error) {
      throw error;
    }
  }

  private async getUniqueRememberToken(): Promise<string> {
    let rememberToken = '';

    do {
      rememberToken = Str.random(40);
    } while (await this.exists({ rememberToken }));

    return rememberToken;
  }
}
