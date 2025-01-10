import { createHashRouter } from 'react-router-dom';
import Index from '../pages/index';

const Routers = createHashRouter([
  {
    path: '/',
    element: <Index />,
  },
]);

export default Routers;
