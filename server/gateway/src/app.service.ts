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
  async initMicroService() {
    this.naming = new NacosNamingClient({
      logger: console,
      namespace: 'public',
      serverList: serverList,
    });
    await this.naming.ready();

    // 查询服务列表
    //@ts-ignore
    this.naming._serverProxy
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
          this.naming.subscribe(serviceName, (hosts) => {
            console.log('subscribe :>> ', hosts);

            // 获取 serviceName 服务下 可用 实例列表
            this.naming.selectInstances(serviceName).then((instance) => {
              this.serviceList.map[serviceName] = instance;
            });
          });
        });
      });
  }
  async getServerName(str: string): Promise<{
    serviceName: string;
    api: string;
  }> {
    const { servers } = await getNacosConfig({
      name: 'server.yml',
    });

    for (const i of this.serviceList.data) {
      const url = servers.gateway.api + '/' + i;

      if (str.includes(url)) {
        return {
          serviceName: i,
          api: servers.gateway.api,
        };
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
    const { serviceName, api } = await this.getServerName(req.url);
    if (!this.checkToken(req)) {
      return {
        code: 401,
        msg: 'token失效',
      };
    }

    const target =
      'http://' +
      this.serviceList.map[serviceName][0].ip +
      ':' +
      this.serviceList.map[serviceName][0].port;
    try {
      const proxy = createProxyMiddleware({
        target,
        pathRewrite(path) {
          return path.replace(api, '');
        },
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
