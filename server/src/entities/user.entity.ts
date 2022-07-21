import { BaseModel } from './base-model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User extends BaseModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  rememberToken?: string;

  @Prop({ required: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
