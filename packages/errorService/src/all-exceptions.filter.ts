import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Logger } from '@nestjs/common';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 如果异常响应是对象，则返回相应的 error 和 message
    const errorMessage =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : //@ts-ignore
          exceptionResponse['message'] || exceptionResponse;

    // 记录错误日志
    this.logger.error(`Error: ${errorMessage}`, exception.stack);

    // 格式化错误响应
    response.status(status).json({
      statusCode: status,
      error: 'Error',
      message: errorMessage,
    });
  }
}
