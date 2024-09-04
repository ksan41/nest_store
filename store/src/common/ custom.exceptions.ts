import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplecatedException extends HttpException {
  constructor(message: ExceptionMessage) {
    super(message, HttpStatus.OK);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: ExceptionMessage) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export enum ExceptionMessage {
  USER_DUPLICATED = '중복된 사용자 아이디 입니다.',
  USER_NOT_FOUND = '사용자 정보를 찾을 수 없었습니다.',
}
