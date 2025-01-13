import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import data from './test';

@Controller('aicode')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('containers')
  getContainers() {
    return this.appService.getContainers();
  }

  @Get()
  getHello(@Query('msg') msg: string) {
    return this.appService.getHello(msg);
  }

  @Get('generateIaCode')
  generateIaCode() {
    return this.appService.generateIaCode(
      '../../_projects/createProjectFile',
      data,
    );
  }
}
