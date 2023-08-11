import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from '../../models/routes';
import ComputerPage from './Computer/ComputerPage';
import MonitorPage from './Monitors/MonitorPage';
import NotFoundPage from '../NotFoundPage';

//const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
//const Home = lazy(() => import('./Home/Home'));

export default function Private() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
      <Route path={PrivateRoutes.COMPUTADORAS} element={<ComputerPage />} />
      <Route path={PrivateRoutes.MONITORES} element={<MonitorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
