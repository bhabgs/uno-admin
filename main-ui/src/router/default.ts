import { lazy } from 'react';

export default [
  {
    path: '/authentication',
    name: 'Authentication',
    Component: lazy(() => import('@/pages/Authentication')),
  },
  {
    path: '/login',
    name: 'Login',
    Component: lazy(() => import('@/pages/Login')),
  },
  {
    path: '/register',
    name: 'Register',
    Component: lazy(() => import('@/pages/Register')),
  },
];
