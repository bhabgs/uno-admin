export default {
  codes: {
    '': {
      'index.html':
        '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>商城后台管理系统</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>',
      'README.md':
        '# 商城后台管理系统\n\n## 项目简介\n这是一个带有登录页面的商城后台管理系统，使用Vite搭建，组件化设计，易于二次开发。\n\n## 使用方法\n1. 克隆项目到本地\n2. 安装依赖：`npm install`\n3. 启动开发服务器：`npm run dev`\n4. 构建生产环境代码：`npm run build`\n\n## 项目结构\n\n/root\n│\n├── public\n│   └── index.html\n├── src\n│   ├── assets\n│   ├── components\n│   ├── pages\n│   ├── services\n│   ├── App.tsx\n│   ├── main.tsx\n│   └── vite-env.d.ts\n├── .gitignore\n├── package.json\n├── tsconfig.json\n└── vite.config.ts\n\n',
      '.gitignore': 'node_modules\n.DS_Store\ndist\n',
      'package.json':
        '{\n  "name": "mall-admin",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-router-dom": "^6.3.0",\n    "axios": "^0.27.2"\n  },\n  "devDependencies": {\n    "@types/react": "^18.0.15",\n    "@types/react-dom": "^18.0.6",\n    "typescript": "^4.7.4",\n    "vite": "^3.0.0",\n    "@vitejs/plugin-react": "^1.3.2"\n  }\n}',
      'tsconfig.json':
        '{\n  "compilerOptions": {\n    "target": "ESNext",\n    "lib": ["DOM", "DOM.Iterable", "ESNext"],\n    "module": "ESNext",\n    "moduleResolution": "Node",\n    "strict": true,\n    "jsx": "react-jsx",\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true\n  },\n  "include": ["src"]\n}',
      'vite.config.ts':
        "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    port: 3000\n  }\n});",
    },
    public: {},
    src: {
      'main.tsx':
        "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);",
      'App.tsx':
        "import { BrowserRouter, Routes, Route } from 'react-router-dom';\nimport Login from './pages/Login';\nimport Dashboard from './pages/Dashboard';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<Login />} />\n        <Route path=\"/dashboard\" element={<Dashboard />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nexport default App;",
      'vite-env.d.ts': '/// <reference types="vite/client" />',
      assets: {},
      components: {
        'Header.tsx':
          "import React from 'react';\n\nconst Header = () => {\n  return (\n    <header>\n      <h1>商城后台管理系统</h1>\n    </header>\n  );\n};\n\nexport default Header;",
      },
      pages: {
        'Login.tsx':
          "import React, { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';\nimport axios from 'axios';\n\nconst Login = () => {\n  const [username, setUsername] = useState('');\n  const [password, setPassword] = useState('');\n  const navigate = useNavigate();\n\n  const handleLogin = async () => {\n    try {\n      const response = await axios.post('/api/login', { username, password });\n      if (response.data.success) {\n        navigate('/dashboard');\n      }\n    } catch (error) {\n      console.error('Login failed:', error);\n    }\n  };\n\n  return (\n    <div>\n      <h2>登录</h2>\n      <input\n        type=\"text\"\n        placeholder=\"用户名\"\n        value={username}\n        onChange={(e) => setUsername(e.target.value)}\n      />\n      <input\n        type=\"password\"\n        placeholder=\"密码\"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n      <button onClick={handleLogin}>登录</button>\n    </div>\n  );\n};\n\nexport default Login;",
        'Dashboard.tsx':
          "import React from 'react';\nimport Header from '../components/Header';\n\nconst Dashboard = () => {\n  return (\n    <div>\n      <Header />\n      <h2>仪表盘</h2>\n      <p>欢迎来到商城后台管理系统</p>\n    </div>\n  );\n};\n\nexport default Dashboard;",
      },
      services: {
        'api.ts':
          "import axios from 'axios';\n\nconst api = axios.create({\n  baseURL: 'http://localhost:3000/api',\n  timeout: 1000,\n});\n\nexport default api;",
      },
    },
  },
};
