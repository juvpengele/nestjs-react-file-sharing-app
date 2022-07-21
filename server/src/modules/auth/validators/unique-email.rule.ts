import { UserService } from './../../user/user.service';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'unique:email', async: true })
export class UniqueEmailRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    try {
      return !(await this.userService.exists('email', value));
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} you used already exists in the database`;
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'uniqueEmail',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueEmailRule,
    });
  };
}
