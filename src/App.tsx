import { createBrowserRouter, Outlet } from 'react-router-dom';
import {
  Home,
  NotFound,
  Login,
  Register,
  Payment,
  PaymentSuccess,
  MlModel,
  MlModelBuy,
} from '@/pages';

import { Header } from './container';

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
      { path: '/login/', element: <Login /> },
      { path: '/register/', element: <Register /> },
      { path: '/payment/', element: <Payment /> },
      { path: '/models/', element: <MlModel /> },
      { path: '/models/buy/', element: <MlModelBuy /> },
    ],
  },
  { path: '*', element: <NotFound /> },
  { path: '/payment/status/', element: <PaymentSuccess /> },
]);
