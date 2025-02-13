import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ErrorService } from '@uno/nestjs-common-filter';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly errorService: ErrorService,
  ) {}
  @Post('login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    const user = await this.authService.validateUser(
      authCredentialsDto.username,
      authCredentialsDto.password,
    );
    if (user) {
      return this.authService.login(user);
    } else {
      this.errorService.throwError('Invalid credentials', 401);
    }
  }
}
