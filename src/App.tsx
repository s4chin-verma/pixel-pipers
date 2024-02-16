import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Home, NotFound, Login } from '@/pages';
import { Header, Footer } from './container';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '/', element: <Home /> }],
  },
  { path: '*', element: <NotFound /> },
  { path: '/auth/login', element: <Login /> },
]);
