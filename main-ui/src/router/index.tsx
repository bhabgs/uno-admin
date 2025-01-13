import { createHashRouter } from 'react-router-dom';
import Index from '@/pages/Index/index';

const Routers = createHashRouter([
  {
    path: '/',
    element: <Index />,
  },
]);

export default Routers;
