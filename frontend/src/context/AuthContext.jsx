import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

import { SetLocalStorage, GetLocalStorage, ClearLocalStorage } from '@/lib/utils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check already user login
  useEffect(() => {
    try {
      const { userInfo } = GetLocalStorage();

      if (userInfo) {
        setUser(userInfo);
        setIsAuthenticated(true);
      }
    } catch {
      ClearLocalStorage();
    } finally {
      setLoading(false);
    }
  }, []);

  // post request to login
  const login = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/user/login', data);

      SetLocalStorage(response.data);
      setUser(response.data);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${response.data.fullName}!`);

      return 200;
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(error.response.data?.Mess);
      } else {
        toast.error('SomeThing Went Wrong!!');
      }

      return 400;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/user/register', data);

      toast.success(`Welcome, continue by logging in, ${data.fullName}!`);

      return 200;
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(error.response.data?.mess);
      } else {
        toast.error('SomeThing Went Wrong!!');
      }

      return 400;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    ClearLocalStorage();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  // Check if user has permission for specific actions
  const hasPermission = (action) => {
    if (!user) {
      return false;
    }

    const permissions = {
      // Tech Lead permissions
      manage_users: user.role === 'admin',
      assign_tickets: user.role === 'tech_lead',
      view_all_tickets: true,
      create_tickets: true,

      // Developer permissions
      update_ticket_status: user.role === 'developer',
      log_time: user.role === 'developer',
      forward_tickets: user.role === 'developer',

      // Customer permissions
      view_dashboard: true, // All roles can view dashboard
      add_comments: true, // All roles can add comments

      // Admin actions
      delete_tickets: user.role === 'tech_lead',
      view_user_management: user.role === 'admin',
    };

    return permissions[action] || false;
  };

  const getTmNavigationItems = () => {
    if (!user) {
      return [];
    }

    const baseItems = [
      { id: 'TmDashboard', name: 'Dashboard', href: '/tm/dashboard' },
      { id: 'TmAssignment', name: 'Assignment', href: '/tm/assignment' },
      { id: 'TmTicktes', name: 'Ticktes', href: '/tm/tickets' },
    ];

    return [...baseItems];
  };

  const getAmNavigationItems = () => {
    if (!user) {
      return [];
    }

    const baseItems = [
      { id: 'AmDashboard', name: 'Dashboard', href: '/am/dashboard' },
      { id: 'AmAttendance', name: 'Attendance', href: '/am/attendance' },
      { id: 'AmLeave', name: 'Leave', href: '/am/myleave' },
      { id: 'AmPayroll', name: 'Payroll', href: '/am/payroll' },
    ];

    return [...baseItems];
  };

  const getPmNavigationItems = () => {
    if (!user) {
      return [];
    }

    const baseItems = [
      { id: 'PmDashboard', name: 'Dashboard', href: '/pm/dashboard' },
      { id: 'PmTasks', name: 'My tasks', href: '/pm/tasks' },
      { id: 'PmProjects', name: 'Projects', href: '/pm/projects' },
      { id: 'PmReports', name: 'Reports', href: '/pm/reports' },
    ];

    return [...baseItems];
  };

  const getHrNavigationItems = () => {
    if (!user) {
      return [];
    }

    const baseItems = [
      { id: 'HrDashboard', name: 'Dashboard', href: '/hr/dashboard' },
      { id: 'HrEmployees', name: 'Employees', href: '/hr/employees' },
      { id: 'HrLeaveManagement', name: 'Leave Management', href: '/hr/leavemanagement' },
      { id: 'HrPayroll', name: 'Payroll', href: '/hr/payroll' },
      // { id: "HrRecruitment", name: "Recruitment", href: "/hr/recruitment" },
    ];

    return [...baseItems];
  };

  const getUmNavigationItems = () => {
    if (!user) {
      return [];
    }

    const baseItems = [
      { id: 'UmDashboard', name: 'Dashboard', href: '/um/dashboard' },
      { id: 'UmUsers', name: 'Users', href: '/um/users' },
      { id: 'UmPermission', name: 'Permission', href: '/um/permission' },
    ];

    return [...baseItems];
  };

  // Get role display name
  const getRoleDisplayName = (role) => {
    const roleNames = {
      tech_lead: 'Tech Lead',
      developer: 'Developer',
      customer: 'Customer',
      admin: 'Admin',
    };

    return roleNames[role] || role;
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    hasPermission,
    getPmNavigationItems,
    getHrNavigationItems,
    getTmNavigationItems,
    getAmNavigationItems,
    getUmNavigationItems,
    getRoleDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
