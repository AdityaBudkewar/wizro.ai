import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/context/ProtectedRoute";

import FinanceLayout from "@/pages/FM/FinanceLayout";
import EmployeeFinanceDashboard from "@/pages/FM/EmployeeFinanceDashboard";
import EmployeeExpenses from "@/pages/FM/EmployeeExpenses";
import AddExpense from "@/pages/FM/AddExpense";

export default {
  path: "/employee/fm",
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
          <EmployeeFinanceDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "expenses",
      element: (
        <ProtectedRoute>
          <EmployeeExpenses />
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
  ],
};
