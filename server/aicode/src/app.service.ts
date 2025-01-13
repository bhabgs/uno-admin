import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import DockerService from './docker/index.service';

const modelsPlan = [
  {
    id: 'deepseek-chat',
    key: 'sk-6e0a8514616a4caf923e983ac9808510',
    baseURL: 'https://api.deepseek.com',
    model: 'deepseek-chat',
  },
  {
    id: 'nn-chat',
    key: 'sk-fastgpt',
    baseURL: 'http://10.39.59.3:3001/v1',
  },
];

const client = new OpenAI({
  apiKey: modelsPlan[0].key,
  baseURL: modelsPlan[0].baseURL,
});

@Injectable()
export class AppService {
  constructor() {}
  DockerService = new DockerService();
  model = ['deepseek-chat', 'gpt-4o', 'gpt-4o-turbo'];

  getContainers() {
    return this.DockerService.getContainers();
  }
  // 组装提示词
  generatePrompt(msg: string) {
    return `
    根据以下描述生成项目代码内容：
    描述：${msg}
    代码要求：组件化、易于2次开发
    如果是前端代码请使用vite脚手架搭建开发框架，其他语言如果没有给出明确的框架的话就使用最稳定的框架，并在跟目录的Readme中给出使用方法
    请以 JSON 格式返回整个项目的目录结构和文件内容，保证所生成的代码能够使用
    示例格式：
    {
      "": { // 根目录
        "index.html": "..."
        // 其他文件
      },
      "src": {
        "main.tsx": "...",
        "App.tsx": "...",
        // 其他 src 下的文件...
      },
      // 其他目录和文件
    }
    
  `;
  }
  async getHello(s: string) {
    const completion = await client.chat.completions.create({
      messages: [
        { role: 'system', content: '你是一个非常厉害的程序员' },
        {
          role: 'user',
          content: this.generatePrompt(s),
        },
      ],
      model: this.model[0],
      temperature: 0.0,
    });
    try {
      const codes = JSON.parse(
        completion.choices[0].message.content
          .replace(/```json|```/g, '')
          .trim(),
      );
      // const msg = this.generateIaCode(
      //   '../../_projects/createProjectFile',
      //   codes,
      // );
      return {
        codes,
        // msg,
      };
    } catch (error) {
      console.log('error', error);

      return completion.choices[0].message.content;
    }
  }
  // 创建容器
  createContainer(url: string) {
    this.DockerService.createContainer(url);
  }
  // 本地安装项目依赖和打包
  loationBuild(url: string) {
    exec('pnpm i', { cwd: url }, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行失败: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`错误输出: ${stderr}`);
        return;
      }
      // 如果 stdout 里面包含 Done 那么说明执行结束
      console.log(`执行结果: ${stdout}`);
    });
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
