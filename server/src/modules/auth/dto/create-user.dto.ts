import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UniqueEmail } from '../validators/unique-email.rule';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @UniqueEmail()
  email: string;

  @IsString({ message: 'password is required' })
  @IsNotEmpty()
  password: string;
}
