import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface ResponseFormat<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class SuccessExceptions<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    return next.handle().pipe(
      map((data) => {
        // 如果响应已经发送（如文件下载），直接返回原始数据
        if (response.headersSent) {
          return data;
        }

        // 如果响应类型不是 JSON，直接返回原始数据
        const contentType = response.getHeader('Content-Type');
        if (
          contentType &&
          !contentType.toString().includes('application/json')
        ) {
          return data;
        }
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data?.message || 'Success', // 支持自定义消息
          data: data?.message ? { ...data, message: undefined } : data, // 移除 message 字段
        };
      }),
    );
  }
}
