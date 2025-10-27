import ProtectedRoute from '@/context/ProtectedRoute';
import UmDashboardPage from '@/pages/UM/UmDashboardPage';
import UmLayout from '@/pages/UM/UmLayout';
import UmPermissionPage from '@/pages/UM/UmPermissionPage';
import UmUserManagementPage from '@/pages/UM/UmUserManagementPage';

export default {
  path: '/um',
  element: <UmLayout />,

  children: [
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <UmDashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'users',
      element: (
        <ProtectedRoute>
          <UmUserManagementPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'permission',
      element: (
        <ProtectedRoute>
          <UmPermissionPage />
        </ProtectedRoute>
      ),
    },
  ],
};
