import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(msg?: string) {
    super(msg || 'error.unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
