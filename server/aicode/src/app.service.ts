import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { viteDockerService, OpenAi } from './utils';

@Injectable()
export class AppService {
  constructor() {}
  DockerService = new viteDockerService();
  OpenAi = new OpenAi({
    id: 'deepseek-chat',
  });

  getContainers() {
    return this.DockerService.getContainers();
  }

  async getHello(s: string) {
    const codes = await this.OpenAi.sendMsg(s);
    return {
      codes,
    };
  }
  // 生成ia代码文件
  async generateIaCode(baseDir: string = './createProjectFile', filesObj: any) {
    for (const [name, content] of Object.entries(filesObj)) {
      const currentPath = path.join(baseDir, name);
      if (typeof content === 'object') {
        // 如果内容是对象，则递归创建文件夹
        fs.mkdirSync(currentPath, { recursive: true });
        this.generateIaCode(currentPath, content);
      } else {
        // 写入文件内容
        fs.writeFileSync(currentPath, content as string);
      }
    }

    return 'IA代码生成成功:预览地址 http://localhost:5173';
  }
}
