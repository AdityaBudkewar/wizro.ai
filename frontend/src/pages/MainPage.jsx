import { FolderKanban, Users, Clock, UserCog, Ticket, ArrowRight, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MainPage() {
  const [hoveredModule, setHoveredModule] = useState(null);

  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: 'Project Management',
      description: 'Manage projects, tasks, timelines and team collaboration',
      icon: FolderKanban,
      color: 'blue',
      route: '/pm/dashboard',
      features: ['Task Management', 'Gantt Charts', 'Team Collaboration', 'File Sharing'],
    },
    {
      id: 2,
      title: 'HR Management',
      description: 'Employee management, payroll, performance and recruitment',
      icon: Users,
      color: 'purple',
      route: '/hr/dashboard',
      features: ['Employee Records', 'Payroll Processing', 'Leave Management', 'Recruitment'],
    },
    {
      id: 3,
      title: 'Ticket Management',
      description: 'Support tickets, issue tracking and customer queries',
      icon: Ticket,
      color: 'pink',
      route: '/tm/dashboard',
      features: ['Issue Tracking', 'Priority Management', 'SLA Monitoring', 'Customer Support'],
    },
    {
      id: 4,
      title: 'Attendance Management',
      description: 'Track employee attendance, shifts and working hours',
      icon: Clock,
      color: 'green',
      route: '/am/dashboard',
      features: ['Clock In/Out', 'Shift Scheduling', 'Leave Tracking', 'Reports'],
    },
    {
      id: 5,
      title: 'User Management',
      description: 'Manage users, roles, permissions and access control',
      icon: UserCog,
      color: 'orange',
      route: '/um/dashboard',
      features: ['User Accounts', 'Role Management', 'Permissions', 'Access Control'],
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bag: 'bg-blue-50',
        hover: 'hover:bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        ring: 'ring-blue-100',
      },
      purple: {
        bag: 'bg-purple-50',
        hover: 'hover:bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        ring: 'ring-purple-100',
      },
      green: {
        bag: 'bg-green-50',
        hover: 'hover:bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200',
        ring: 'ring-green-100',
      },
      orange: {
        bag: 'bg-orange-50',
        hover: 'hover:bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200',
        ring: 'ring-orange-100',
      },
      pink: {
        bag: 'bg-pink-50',
        hover: 'hover:bg-pink-50',
        text: 'text-pink-600',
        border: 'border-pink-200',
        ring: 'ring-pink-100',
      },
    };

    return colors[color];
  };

  const handleModuleClick = (module) => {
    navigate(module.route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center">
                  {/* <LayoutDashboard className="w-6 h-6 text-white" /> */}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">KosquTrack</h1>
                  <p className="text-xs text-slate-500">Business Management Platform</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="ml-3 pl-3 border-l border-slate-200 flex items-center space-x-3">
                <div className="w-8 h-8 bg-[var(--color-chart-4)] rounded-full flex items-center justify-center font-medium text-sm text-white">
                  N
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto lg:px-8 py-5">
        {/* Welcome Section */}
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Nazneen</h2>
          <p className="text-slate-600 text-lg">Select a module to access your workspace</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon;

            const colors = getColorClasses(module.color);

            const isHovered = hoveredModule === module.id;

            return (
              <Card
                key={module.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  isHovered ? `border-slate-300 shadow-xl -translate-y-1` : 'border-slate-200 shadow-md hover:shadow-lg'
                }`}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => handleModuleClick(module)}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`${colors.bag} p-4 rounded-xl border ${colors.border}`}>
                      <IconComponent className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        isHovered ? 'translate-x-1 text-slate-900' : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 text-slate-900">{module.title}</CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">{module.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Key Features</p>
                    <div className="grid grid-cols-2 gap-2">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-slate-700">
                          <div className={`w-1.5 h-1.5 ${colors.bag} rounded-full mr-2 ${colors.border} border`}></div>
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 border-2 ${
                      isHovered
                        ? `${colors.bag} ${colors.text} ${colors.border}`
                        : `bg-white ${colors.text} border-slate-200 ${colors.hover}`
                    }`}
                  >
                    <span>Open Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
