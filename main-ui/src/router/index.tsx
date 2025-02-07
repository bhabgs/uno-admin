import { createHashRouter } from 'react-router-dom';

const Routers = createHashRouter([
  {
    path: '/',
    children: [
      {
        path: '/main',
      },
      {
        path: '/login',
      },
      {
        path: '/register',
      },
    ],
  },
]);

export default Routers;
