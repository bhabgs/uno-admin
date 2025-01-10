import { RouterProvider } from 'react-router-dom';
import Routers from './router';

const App = () => {
  return <RouterProvider router={Routers}></RouterProvider>;
};

export default App;
