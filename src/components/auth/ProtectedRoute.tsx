import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
