import ProtectedRoute from '@/context/ProtectedRoute';
import TmCreateTicketPage from '@/pages/TM/TmCreateTicketPage';
import TmDashboardPage from '@/pages/TM/TmDashboardPage';
import TmLayout from '@/pages/TM/TmLayout';
import TmMyTicketsPage from '@/pages/TM/TmMyTicketsPage';
import TmTicketDetailPage from '@/pages/TM/TmTicketDetailPage';
import TmTicketsPage from '@/pages/TM/TmTicketsPage';

export default {
  path: '/tm',
  element: <TmLayout />,

  children: [
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <TmDashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'tickets/:id',
      element: (
        <ProtectedRoute>
          <TmTicketDetailPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'tickets',
      element: (
        <ProtectedRoute>
          <TmTicketsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'assignment',
      element: (
        <ProtectedRoute>
          <TmMyTicketsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'create',
      element: (
        <ProtectedRoute>
          <TmCreateTicketPage />
        </ProtectedRoute>
      ),
    },
  ],
};
