import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    return value;
  }
}
