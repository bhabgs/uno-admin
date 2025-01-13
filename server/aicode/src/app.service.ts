import { Injectable } from '@nestjs/common';
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
    代码要求：组件化、易于2次开发、代码尽可能的丰富不要太简陋

    请以 JSON 格式返回项目的目录结构和文件内容，每个文件应包含：
    - 路径（例如：/src/index.tsx）
    - 生成的代码将会在vite项目中运行
    - main.ts 文件是项目的入口文件
    - 如果生成的是react项目那么index.html script标签引入的js文件应该是main.tsx
    - 如果生成的是vue项目那么index.html script标签引入的js文件应该是main.ts
    - vite.config.ts 的基础内容是：import { defineConfig } from "vite";
      import vue from "@vitejs/plugin-vue";
      import react from "@vitejs/plugin-react";
      import vueJsx from "@vitejs/plugin-vue-jsx";

      // https://vite.dev/config/
      export default defineConfig({
        base: "./",
        plugins: [vue(), react(), vueJsx()], // 根据项目需求选择插件
        server: {
          host: "0.0.0.0",
          port: 5173,
        },
      });
    - 返回 src 目录下的文件文和件夹内，index.html 和 vite.config.ts 文件内容不可缺少
    示例格式：
    {
      "/src/App.tsx": "import React from 'react'; ..."
      "/src/main.ts": "import React from 'react'; ..."
      "/index.html": "<!DOCTYPE html> <html> ...",
      "/vite.config.ts": "import { defineConfig } from 'vite'; ..."
      ...
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
      const msg = this.generateIaCode(
        '../../_projects/createProjectFile',
        codes,
      );
      return {
        codes,
        msg,
      };
    } catch (error) {
      console.log('error', error);

      return completion.choices[0].message.content;
    }
  }
  // 生成ia代码文件
  generateIaCode(
    baseDir: string = './createProjectFile',
    filesObj: Record<string, string>,
  ) {
    Object.keys(filesObj).forEach((filePath) => {
      const fileFullPath = path.join(baseDir, filePath);
      const dirPath = path.dirname(fileFullPath);

      // 创建文件夹
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // 创建文件
      fs.writeFileSync(fileFullPath, filesObj[filePath], 'utf8');
      console.log(`File created: ${fileFullPath}`);
    });

    this.DockerService.createContainer(path.resolve(baseDir));

    return 'IA代码生成成功:预览地址 http://localhost:5173';
  }
}
