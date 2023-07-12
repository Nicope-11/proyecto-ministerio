import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../models/routes';
import { useAuth } from '../context/AuthContext';

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to="/hola" />;

const AuthGuard = (privateValidation) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;
