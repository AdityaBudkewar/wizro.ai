import ProtectedRoute from '@/context/ProtectedRoute';
import PmCreateTaskPage from '@/pages/PM/PmCreateTaskPage';
import PmDashboardPage from '@/pages/PM/PmDashboardPage';
import PmLayout from '@/pages/PM/PmLayout';
import PmProjectPage from '@/pages/PM/PmProjectPage';
import PmProjectViewPage from '@/pages/PM/PmProjectViewPage';
import PmReportsPage from '@/pages/PM/PmReportsPage';
import PmTaskPage from '@/pages/PM/PmTaskPage';
import PmTaskViewPage from '@/pages/PM/PmTaskViewPage';

// const ProtectedUserManagement = withRoleProtection(
//   UserManagementPage,
//   "admin"
// );

export default {
  path: '/pm',
  element: <PmLayout />,

  children: [
    {
      path: 'projects',
      element: (
        <ProtectedRoute>
          <PmProjectPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'project/:id',
      element: (
        <ProtectedRoute>
          <PmProjectViewPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'task/:id',
      element: (
        <ProtectedRoute>
          <PmTaskViewPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'reports',
      element: (
        <ProtectedRoute>
          <PmReportsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'tasks',
      element: (
        <ProtectedRoute>
          <PmTaskPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'create',
      element: (
        <ProtectedRoute>
          <PmCreateTaskPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <PmDashboardPage />
        </ProtectedRoute>
      ),
    },
  ],
};
