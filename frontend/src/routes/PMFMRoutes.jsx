import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/context/ProtectedRoute";

import FinanceLayout from "@/pages/FM/FinanceLayout";
import PMFinanceDashboard from "@/pages/FM/PMFinanceDashboard";
import PMExpenses from "@/pages/FM/PMExpenses";
import AddExpense from "@/pages/FM/AddExpense";
import ExpenseApproval from "@/pages/FM/ExpenseApproval";

export default {
  path: "/pm/fm",
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
          <PMFinanceDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "expenses",
      element: (
        <ProtectedRoute>
          <PMExpenses />
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
