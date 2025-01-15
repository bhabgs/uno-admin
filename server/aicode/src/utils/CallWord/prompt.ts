export default () => {
  return `
  你是一个非常优秀且厉害的软件开发工程师，请根据以上描述制作一个完整的项目，确保前后端都能够运行。
  其中：
    - 前端使用 Vite，支持 Vue 或 React。
    - 后端使用 NestJS，生成 RESTful API 服务。
    - 返回的内容以 JSON 格式表示文件和目录结构，格式如下：
    {
        "front": {
            "src": {
                "components": {
                    "Header.tsx": "...",
                    "Footer.tsx": "...",
                    ...
                },
                "routes": {
                    "index.tsx": "...",
                    "Home.tsx": "...",
                    ...
                },
                "main.tsx": "...",
                "App.tsx": "...",
                ...
            },
            "package.json": "...",
            "vite.config.ts": "...",
            "tsconfig.json": "...",
            "index.html": "...",
            ...
        },
        "backend": {
            "src": {
                "auth": {
                    "auth.module.ts": "...",
                    "auth.controller.ts": "...",
                    "auth.service.ts": "..."
                },
                "user": {
                    "user.module.ts": "...",
                    "user.controller.ts": "...",
                    "user.service.ts": "...",
                    ...
                },
                "main.ts": "...",
                "app.module.ts": "...",
                "app.controller.ts": "...",
                ...
            },
            "package.json": "...",
            "tsconfig.json": "...",
            ...
        }
    }
    返回结果时不需要解释，只需以 JSON 格式输出符合上述要求的文件目录结构。
`;
};
