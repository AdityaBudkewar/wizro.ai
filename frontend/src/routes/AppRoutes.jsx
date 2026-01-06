import { useRoutes } from 'react-router-dom';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RegisterPage from '@/pages/RegisterPage';

import AmRoutes from './AmRoutes';
import HrRoutes from './HrRoutes';
import PmRoutes from './PmRoutes';
import TmRoutes from './TmRoutes';
import UmRoutes from './UmRoutes';
import FMRoutes from './FMRoutes';


import EmployeeFMRoutes from "./EmployeeFMRoutes";
import HRFMRoutes from "./HRFMRoutes";
import PMFMRoutes from "./PMFMRoutes";


const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/main', element: <MainPage /> },

  HrRoutes,
  PmRoutes,
  TmRoutes,
  AmRoutes,
  UmRoutes,
  FMRoutes,

  EmployeeFMRoutes,  // employee FM
  HRFMRoutes,        // HR FM
  PMFMRoutes,        // PM FM

  { path: '*', element: <NotFoundPage /> },
];

function AppRoutes() {
  return useRoutes(routes);
}

export default AppRoutes;
