import { Injectable } from '@nestjs/common';
import {
  createProxyMiddleware,
  RequestHandler,
  fixRequestBody,
} from 'http-proxy-middleware';
import { NacosNamingClient } from 'nacos';
import { serverList, getNacosConfig } from '@uno/nacos';
import { IncomingMessage, ServerResponse } from 'http';
import { RedisService } from '@uno/redis';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {
    getNacosConfig({
      name: 'auth-whitelist.yml',
    }).then(({ public_routes }) => {
      this.whiteList = public_routes;
    });
  }
  // 客户端
  naming: NacosNamingClient;

  // 服务列表
  serviceList = {
    count: 0,
    data: [],
    map: {},
  };
  microservices: Map<
    string,
    RequestHandler<
      IncomingMessage,
      ServerResponse<IncomingMessage>,
      (err?: any) => void
    >
  > = new Map();
  // 检查服务是否在线
  checkService() {
    // 查询服务列表
    (this.naming as any)._serverProxy
      .getServiceList(1, 20, 'DEFAULT_GROUP')
      .then((service) => {
        this.serviceList.count = service.count;
        this.serviceList.data = service.data;

        service.data.forEach((serviceName) => {
          // 获取 serviceName 服务下 可用 实例列表
          this.naming.selectInstances(serviceName).then((instance) => {
            this.serviceList.map[serviceName] = instance;
          });

          // 监听 serviceName 服务下实例变化
          this.naming.subscribe(serviceName, () => {
            // 获取 serviceName 服务下 可用 实例列表
            this.naming.selectInstances(serviceName).then((instance) => {
              this.serviceList.map[serviceName] = instance;
            });
          });
        });
      });
  }
  async initMicroService() {
    this.naming = new NacosNamingClient({
      logger: console,
      namespace: 'public',
      serverList: serverList,
    });
    await this.naming.ready();
    this.checkService();

    // 每五分钟检查一次服务
    setInterval(
      () => {
        this.checkService();
      },
      1000 * 60 * 5,
    );
  }
  async getServerName(str: string): Promise<string | null> {
    for (const i in this.serviceList.map) {
      const item = this.serviceList.map[i];
      const url = '/' + i;

      if (str.indexOf(url) === 0) {
        const target = 'http://' + item[0].ip + ':' + item[0].port;
        return target;
      }
    }
  }
  whiteList = [];
  // 校验token和白名单
  async checkToken(req: IncomingMessage) {
    const token = req.headers['authorization'];
    if (this.whiteList.includes(req.url)) {
      return true;
    }
    for (const i of this.whiteList) {
      if (req.url.includes(i)) {
        this.whiteList.push(req.url);
        return true;
      }
    }
    if (!token) {
      return false;
    }
    const user = await this.redisService.getToken(token);
    if (!user) {
      return false;
    }
  }
  async createProxy(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
  ) {
    const target = await this.getServerName(req.url);

    if (!target) {
      return {
        code: 404,
        msg: '当前服务不在线',
      };
    }
    if (!this.checkToken(req)) {
      return {
        code: 401,
        msg: 'token失效',
      };
    }
    try {
      const proxy = createProxyMiddleware({
        target,
        changeOrigin: true,
        on: {
          proxyReq: fixRequestBody,
        },
      });

      proxy(req, res);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
}
