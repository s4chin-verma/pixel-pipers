import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Home, NotFound, Login, Demo, Register, Payment } from '@/pages';
import { Header, PayPage } from './container';


const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/demo', element: <Demo /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/pay', element: <PayPage /> },
      { path: '/demo', element: <Demo /> },
      { path: '/payment', element: <Payment /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
