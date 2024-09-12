import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

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

export class IncorrectValueException extends BadRequestException {
  constructor(message: ExceptionMessage) {
    super(message);
  }
}

export enum ExceptionMessage {
  INVALID_TOKEN = '잘못된 토큰 형식입니다.',
  EXPIRED_TOKEN = '만료된 토큰입니다.',
  EXPIRED_USER_INFO = '만료된 사용자 정보입니다. 다시 로그인해주세요.',
  INVALID_USER_INFO = '사용자 아이디 혹은 비밀번호가 일치하지 않습니다.',

  USER_DUPLICATED = '중복된 사용자 아이디 입니다.',
  USER_NOT_FOUND = '사용자 정보를 찾을 수 없었습니다.',

  VALUE_IS_EMPTY = '값이 없습니다. (null or undefined)',

  INVALID_FILE_TYPE = '이미지 파일만 업로드 가능합니다.',
}
