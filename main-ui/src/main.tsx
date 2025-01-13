import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import microApp from '@micro-zoe/micro-app';
import { setMicroTheme } from './utils';
import theme from './theme';
import App from './App.tsx';
import '@/styles/reset.less';

microApp.start({});
setMicroTheme(theme);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
