import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthRouters } from '@/router';
import UserStore from '@/store/User';
import { observer } from 'mobx-react-lite';
import { setToken } from '@/remote/remote';

const Layout = observer(() => {
  const routers = AuthRouters(UserStore.user);
  useEffect(() => {
    if (UserStore.token) {
      setToken(UserStore.token || '');
    }
  }, []);
  if (UserStore.token) {
    return <RouterProvider router={routers} />;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routers} />
    </Suspense>
  );
});

export default Layout;
