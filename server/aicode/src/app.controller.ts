import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import data from './test';
import path from 'path';

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
    const baseUrl = '../../../_projects/createProjectFile';
    // 生成代码
    this.appService.generateIaCode(baseUrl, data.codes);
    // 安装依赖
    this.appService.loationBuild(path.resolve(baseUrl));
    return '完成';
    // return this.appService.createContainer(path.resolve(baseUrl));
  }
}
