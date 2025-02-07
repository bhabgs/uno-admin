import openAi from 'openai';

export class OpenAi {
  constructor(opt: { id: string }) {
    this.client = new openAi({
      apiKey: this.getModelPlan(opt.id).key,
      baseURL: this.getModelPlan(opt.id).baseURL,
    });
  }
  client: openAi;
  models = ['deepseek-chat', 'gpt-4o', 'gpt-4o-turbo'];
  modelsPlan = [
    {
      id: 'deepseek-chat',
      key: 'sk-6e0a8514616a4caf923e983ac9808510',
      baseURL: 'https://api.deepseek.com',
      defModel: 'deepseek-chat',
    },
    {
      id: 'nn-chat',
      key: 'sk-fastgpt',
      baseURL: 'http://10.39.59.3:3001/v1',
      defModel: 'gpt-4o',
    },
  ];

  fomartMsg(msg: string) {
    try {
      return JSON.parse(msg.replace(/```json|```/g, '').trim());
    } catch (error) {
      return `error: ${error}`;
    }
  }

  getModelPlan(id: string) {
    try {
      return this.modelsPlan.find((item) => item.id === id);
    } catch (_error) {
      console.log(_error);
      return this.modelsPlan[0];
    }
  }

  async sendMsg(msg: string, stream?: boolean) {
    if (!stream) {
      const completion = await this.client.chat.completions.create({
        messages: [
          { role: 'system', content: '你是一个非常厉害的软件开发工程师' },
          {
            role: 'user',
            content: msg,
          },
        ],
        model: this.models[0],
        temperature: 0.0,
      });

      return this.fomartMsg(completion.choices[0].message.content);
    } else {
      // 处理流式输出
      new Error('流式输出 数据暂未处理');
    }
  }
}
