import { createHashRouter, Navigate } from 'react-router-dom';
import Default from './default';
import { USER } from '@/store/User/dto';
import Layout from '@/components/Layout';
// import { lazy } from 'react';
import FeatureRouters from './feature';

// 根据权限动态生成路由
export const AuthRouters = (userInfo?: USER | null) => {
  if (userInfo) {
    // 根据用户信息动态生成路由
    return createHashRouter([
      {
        path: '/',
        element: <Layout />,
        children: FeatureRouters,
      },
    ]);
  }
  return createHashRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    ...Default,
  ]);
};
export const DefaultRouters = AuthRouters();
