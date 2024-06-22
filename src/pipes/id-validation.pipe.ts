import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ID_VALIDATION_ERROR } from 'src/constants/global.constants';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }
    //  if (!Types.objectId.isValid(value)) Mongo id check
    try {
      return parseInt(value, 10);
    } catch (error) {
      throw new BadRequestException(ID_VALIDATION_ERROR);
    }
  }
}
