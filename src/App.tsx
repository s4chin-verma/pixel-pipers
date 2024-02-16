import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Home, NotFound } from '@/pages';
import { Header, Footer } from './container';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="px-60">
        <Outlet />
      </main>
      <Footer />
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
