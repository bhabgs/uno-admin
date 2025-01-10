import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
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
  apiKey: modelsPlan[1].key,
  baseURL: modelsPlan[1].baseURL,
});

@Injectable()
export class AppService {
  constructor() {}
  DockerService = new DockerService();
  model = ['deepseek-chat', 'gpt-4o', 'gpt-4o-turbo'];
  // 生成ia代码文件
  async generateIaCode() {
    console.log('generateIaCode');
  }

  getContainers() {
    return this.DockerService.getContainers();
  }
  // 组装提示词
  generatePrompt(msg: string) {
    return `
    根据以下描述生成完整的项目文件结构和代码内容：
    描述：${msg}

    请以 JSON 格式返回项目的目录结构和文件内容，每个文件应包含：
    - 路径（例如：/src/index.tsx）
    - 文件内容（字符串形式）

    示例格式：
    {
      "/src/index.tsx": "import React from 'react'; ...",
      "/src/App.tsx": "import React from 'react'; ..."
    }
  `;
  }
  async getHello(s: string) {
    const completion = await client.chat.completions.create({
      messages: [{ role: 'system', content: s }],
      model: this.model[0],
    });
    return completion.choices[0].message.content;
    return JSON.parse(
      completion.choices[0].message.content.replace(/```json|```/g, '').trim(),
    );
  }
}
