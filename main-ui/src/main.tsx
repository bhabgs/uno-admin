import React from 'react';
import ReactDOM from 'react-dom/client';

import microApp from '@micro-zoe/micro-app';
import App from './App.tsx';
import '@/styles/reset.less';

microApp.start({});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
