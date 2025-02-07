import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const FeatureRouters: RouteObject[] = [
  {
    path: '/menu',
    children: [
      {
        path: '',
        Component: lazy(() => import('@/pages/Menu')),
      },
    ],
  },
  {
    path: '/user',
    children: [
      {
        path: '',
        Component: lazy(() => import('@/pages/User')),
      },
    ],
  },
];

export default FeatureRouters;
