import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { PublicRoutes } from './models/routes';

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Cargando...</h1>;
  if (!loading && !isAuthenticated)
    return <Navigate to={PublicRoutes.LOGIN} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
