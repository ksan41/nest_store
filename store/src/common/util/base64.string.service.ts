import { TypeCheck } from './type.check.service';
import { ExceptionMessage, IncorrectValueException } from '../ custom.exceptions';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Base64StringService {
  encode(plainStr: string) {
    if (!TypeCheck.isEmpty(plainStr)) {
      return Buffer.from(plainStr).toString('base64');
    } else throw new IncorrectValueException(ExceptionMessage.VALUE_IS_EMPTY);
  }

  decode(encodedStr: string) {
    if (!TypeCheck.isEmpty(encodedStr)) {
      return Buffer.from(encodedStr, 'base64').toString('utf-8');
    } else throw new IncorrectValueException(ExceptionMessage.VALUE_IS_EMPTY);
  }
}
