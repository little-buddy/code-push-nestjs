import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(msg: string) {
    super(msg || 'error.app', HttpStatus.OK);
  }
}
