import ProtectedRoute from '@/context/ProtectedRoute';
import AmAttendancePage from '@/pages/AM/AmAttendancePage';
import AmDashboardPage from '@/pages/AM/AmDashboardPage';
import AmLayout from '@/pages/AM/AmLayout';
import AmLeavePage from '@/pages/AM/AmLeavePage';
import AmPayrollPage from '@/pages/AM/AmPayrollPage';

export default {
  path: '/am',
  element: <AmLayout />,

  children: [
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <AmDashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'attendance',
      element: (
        <ProtectedRoute>
          <AmAttendancePage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'myleave',
      element: (
        <ProtectedRoute>
          <AmLeavePage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'payroll',
      element: (
        <ProtectedRoute>
          <AmPayrollPage />
        </ProtectedRoute>
      ),
    },
  ],
};
