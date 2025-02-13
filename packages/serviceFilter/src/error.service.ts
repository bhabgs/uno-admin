// src/errors/error.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ErrorService {
  throwError(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    throw new HttpException(
      {
        statusCode,
        error:
          statusCode >= 400 && statusCode < 500
            ? 'Bad Request'
            : 'Internal Server Error',
        message,
      },
      statusCode,
    );
  }
}
