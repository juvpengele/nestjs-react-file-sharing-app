import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseModel {
  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt: Date;
}
