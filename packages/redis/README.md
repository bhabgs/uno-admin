# NestJS Common 异常错误处理

## Installation

> 后期在正式推入npm，目前只需要在项目利用即可

```bash
pnpm install @uno/nestjs-common-errors
```

## 微服务使用(nestjs)

### 1. main.ts

```ts
import { AllExceptionsFilter } from '@uno/nestjs-common-errors';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
```

### 2. 微服务的某个service

```ts
import { ErrorService } from '@your-org/nestjs-common-errors';

@Injectable()
export class SomeService {
  constructor(private readonly errorService: ErrorService) {}

  someMethod() {
    this.errorService.throwError(
      'Something went wrong!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
```
