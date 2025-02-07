import { lazy } from 'react';
import { NonIndexRouteObject } from 'react-router-dom';

export interface SelfRouteObject extends NonIndexRouteObject {
  name?: string;
  children?: SelfRouteObject[];
}

const FeatureRouters: SelfRouteObject[] = [
  {
    path: '/menu',
    name: '菜单管理',
    children: [
      {
        path: '',
        name: '菜单列表',
        Component: lazy(() => import('@/pages/Menu')),
      },
    ],
  },
  {
    path: '/user',
    name: '用户管理',
    children: [
      {
        path: '',
        name: '用户列表',
        Component: lazy(() => import('@/pages/User')),
      },
    ],
  },
];

export default FeatureRouters;
