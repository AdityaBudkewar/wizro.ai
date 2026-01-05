import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user, loading, isAuthenticated, hasPermission } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Access Denied</h3>
          <p className="text-gray-500">You don't have permission.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
