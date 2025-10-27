import ProtectedRoute from '@/context/ProtectedRoute';
import HrDashboardPage from '@/pages/HR/HrDashboardPage';
import HrLayout from '@/pages/HR/HrLayout';
import HrLeaveManagementPage from '@/pages/HR/HrLeaveManagementPage';
import HrPayrollPage from '@/pages/HR/HrPayrollPage';
import HrRecruitmentPage from '@/pages/HR/HrRecruitmentPage';
import HrTeamPage from '@/pages/HR/HrTeamPage';

export default {
  path: '/hr',
  element: <HrLayout />,

  children: [
    {
      path: 'employees',
      element: (
        <ProtectedRoute>
          <HrTeamPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <HrDashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'leavemanagement',
      element: (
        <ProtectedRoute>
          <HrLeaveManagementPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'payroll',
      element: (
        <ProtectedRoute>
          <HrPayrollPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'recruitment',
      element: (
        <ProtectedRoute>
          <HrRecruitmentPage />
        </ProtectedRoute>
      ),
    },
  ],
};
