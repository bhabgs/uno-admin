export default {
  'index.html':
    '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>商城后台管理系统</title>\n</head>\n<body>\n  <div id="root"></div>\n  <script type="module" src="/src/main.tsx"></script>\n</body>\n</html>',
  '/vite.config.ts':
    'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\n// https://vite.dev/config/\nexport default defineConfig({\n  base: "./",\n  plugins: [react()],\n  server: {\n    host: "0.0.0.0",\n    port: 5173,\n  },\n});',
  '/src/main.tsx':
    "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);",
  '/src/App.tsx':
    "import React from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport Login from './components/Login';\nimport Dashboard from './components/Dashboard';\n\nconst App = () => {\n  return (\n    <Router>\n      <Routes>\n        <Route path=\"/\" element={<Login />} />\n        <Route path=\"/dashboard\" element={<Dashboard />} />\n      </Routes>\n    </Router>\n  );\n};\n\nexport default App;",
  '/src/components/Login.tsx':
    'import React, { useState } from \'react\';\n\nconst Login = () => {\n  const [username, setUsername] = useState(\'\');\n  const [password, setPassword] = useState(\'\');\n\n  const handleLogin = () => {\n    // 这里处理登录逻辑\n    console.log(\'Login with:\', username, password);\n  };\n\n  return (\n    <div>\n      <h2>Login</h2>\n      <input\n        type="text"\n        placeholder="Username"\n        value={username}\n        onChange={(e) => setUsername(e.target.value)}\n      />\n      <input\n        type="password"\n        placeholder="Password"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n      <button onClick={handleLogin}>Login</button>\n    </div>\n  );\n};\n\nexport default Login;',
  '/src/components/Dashboard.tsx':
    "import React from 'react';\n\nconst Dashboard = () => {\n  return (\n    <div>\n      <h2>Dashboard</h2>\n      <p>Welcome to the admin dashboard!</p>\n    </div>\n  );\n};\n\nexport default Dashboard;",
  '/src/styles/global.css':
    'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 0;\n  background-color: #f4f4f4;\n}\n\n#root {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}',
  '/src/utils/api.ts':
    "export const login = async (username: string, password: string) => {\n  // 模拟API调用\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve({ success: true, token: 'fake-token' });\n    }, 1000);\n  });\n};",
  '/src/hooks/useAuth.ts':
    "import { useState } from 'react';\nimport { login } from '../utils/api';\n\nconst useAuth = () => {\n  const [isAuthenticated, setIsAuthenticated] = useState(false);\n\n  const handleLogin = async (username: string, password: string) => {\n    const response = await login(username, password);\n    if (response.success) {\n      setIsAuthenticated(true);\n    }\n  };\n\n  return { isAuthenticated, handleLogin };\n};\n\nexport default useAuth;",
};
