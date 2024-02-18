import { createBrowserRouter, Outlet } from 'react-router-dom';
import {
  Home,
  NotFound,
  Login,
  Demo,
  Register,
  Payment,
  PaymentSuccess,
  MlModel,
  MlModelBuy,
} from '@/pages';
import { Header } from './container';

const App: React.FC = () => {
  console.log(import.meta.env.VITE_BASE_URL);
  // console.log(import.meta.env.APP_ENV)
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
      { path: '/demo', element: <Demo /> },
      { path: '/payment', element: <Payment /> },
      { path: '/models', element: <MlModel /> },
      { path: '/models/buy', element: <MlModelBuy /> },
    ],
  },
  { path: '*', element: <NotFound /> },
  { path: '/payment/status', element: <PaymentSuccess /> },
]);
