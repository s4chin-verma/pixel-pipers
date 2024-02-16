import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Home, NotFound } from '@/pages';
import { Header } from './container';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
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
]);
