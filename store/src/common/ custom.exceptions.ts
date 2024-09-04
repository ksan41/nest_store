import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplecatedException extends HttpException {
  constructor(message: ExceptionMessage) {
    super(message, HttpStatus.OK);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export enum ExceptionMessage {
  USER_DUPLICATED = '중복된 사용자 아이디 입니다.',
}
