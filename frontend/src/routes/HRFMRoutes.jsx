import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/context/ProtectedRoute";

import FinanceLayout from "@/pages/FM/FinanceLayout";
import HRFinanceDashboard from "@/pages/FM/HRFinanceDashboard";
import HRExpenses from "@/pages/FM/HRExpenses";
import AddExpense from "@/pages/FM/AddExpense";
import ExpenseApproval from "@/pages/FM/ExpenseApproval";

export default {
  path: "/hr/fm",
  element: <FinanceLayout />,

  children: [
    {
      index: true,
      element: <Navigate to="dashboard" replace />,
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <HRFinanceDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "expenses",
      element: (
        <ProtectedRoute>
          <HRExpenses />
        </ProtectedRoute>
      ),
    },
    {
      path: "expenses/add",
      element: (
        <ProtectedRoute>
          <AddExpense />
        </ProtectedRoute>
      ),
    },
    {
      path: "expenses/approvals",
      element: (
        <ProtectedRoute>
          <ExpenseApproval />
        </ProtectedRoute>
      ),
    },
  ],
};
