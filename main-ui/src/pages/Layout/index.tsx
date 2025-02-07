import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthRouters } from '@/router';
import UserStore from '@/store/User';
import LayoutComponent from '@/components/Layout';
import { observer } from 'mobx-react-lite';

const Layout = observer(() => {
  const routers = AuthRouters(UserStore.user);
  if (UserStore.token) {
    return <LayoutComponent routers={routers} />;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routers} />
    </Suspense>
  );
});

export default Layout;
