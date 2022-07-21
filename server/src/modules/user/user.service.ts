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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      password: await Hash.bcrypt(createUserDto.password),
      rememberToken: Str.random(30),
      isActive: false,
    });
    return createdUser.save();
  }

  async exists(key: string, value: string): Promise<boolean> {
    return !! await this.userModel.findOne({ [key]: value });
  }
}
