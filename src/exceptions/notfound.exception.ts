import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(msg?: string) {
    super(msg || 'error.notfound', HttpStatus.NOT_FOUND);
  }
}
