# uno admin

> 一个基于js技术框架的 后台管理系统, 包含后端、前端、数据库, 整个项目采用的monorepo的代码管理方式

## 前端(main-ui、apps)

### main-ui 是主应用的ui

> 主应用基于 react + micro-app 实现

### apps

> apps 是除了主应用以外，其他子应用目录

## 服务端(server)

> 服务端是基于 nestjs 实现的微服务架构

- 微服务通信由内置的TCP协议改为http协议(http-proxy-middleware)
- 目前内置了 网关、认证、用户相关服务
- 服务的发现与通知使用的(nacos)

## 工具包(packages)

### @uno/nacos

> 主要用来配置 server内加载nacos的逻辑

### @uno/nestjs-common-errors

> 用于微服务统一处理异常

## 编辑器

- vscode

```ymal
services:
  code-server:
    image: lscr.io/linuxserver/code-server:latest
    container_name: code-server
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - PASSWORD=password #optional
      - HASHED_PASSWORD= #optional
      - SUDO_PASSWORD=password #optional
      - SUDO_PASSWORD_HASH= #optional
      - PROXY_DOMAIN=code-server.my.domain #optional
      - DEFAULT_WORKSPACE=/config/workspace #optional
    volumes:
      - /var/code-server/config:/config
    ports:
      - 8443:8443
    restart: unless-stopped

```
