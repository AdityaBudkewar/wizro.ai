import {
  Users,
  ShieldCheck,
  KeyRound,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import PageHeader from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';

const API_BASE = 'http://localhost:5000/user';

export default function UmDashboardPage() {
  const { hasPermission } = useAuth();

  /* ---------------- STATE ---------------- */
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [filter, setFilter] = useState('All Users');

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch(`${API_BASE}/getAll`).then(res => res.json()).then(setUsers);
    fetch(`${API_BASE}/role/getAll`).then(res => res.json()).then(setRoles);
    fetch(`${API_BASE}/permission/getAll`).then(res => res.json()).then(setPermissions);
  }, []);

  /* ---------------- CALCULATIONS ---------------- */
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.n_status === 1).length;
  const inactiveUsers = users.filter(u => u.n_status !== 1).length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: ShieldCheck,
      trend: 'up',
    },
    {
      title: 'Roles',
      value: roles.length,
      icon: KeyRound,
      trend: 'neutral',
    },
    {
      title: 'Permissions',
      value: permissions.length,
      icon: FileText,
      trend: 'neutral',
    },
  ];

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  /* ---------------- ACCESS CONTROL ---------------- */
  if (!hasPermission('USER_MANAGEMENT')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="p-6">

        {/* HEADER */}
        <PageHeader
          title="User Management Dashboard"
          subTitle="Overview of users, roles & permissions"
          actions={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {filter} <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter('All Users')}>All Users</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('Active Users')}>Active Users</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('Inactive Users')}>Inactive Users</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

            return (
              <Card key={index} className="bg-[var(--color-card)] border-[var(--color-border)]">
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[var(--color-muted-foreground)]">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-full bg-[var(--color-muted)]">
                    <Icon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* USER STATUS */}
        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className="col-span-6">
            <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
              <CardHeader>
                <CardTitle>User Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Active Users</span>
                    <span>{activeUsers}</span>
                  </div>
                  <Progress value={(activeUsers / totalUsers) * 100} />
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span>Inactive / Suspended</span>
                    <span>{inactiveUsers}</span>
                  </div>
                  <Progress value={(inactiveUsers / totalUsers) * 100} className="[&>div]:bg-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RECENT USERS */}
          <div className="col-span-6">
            <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
              <CardHeader>
                <CardTitle>Recently Added Users</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentUsers.map((user) => (
                  <div
                    key={user.n_user_id}
                    className="flex justify-between items-center p-3 rounded-md bg-[var(--color-muted)]"
                  >
                    <div>
                      <p className="font-medium">{user.s_full_name}</p>
                      <p className="text-xs text-[var(--color-muted-foreground)]">{user.s_email}</p>
                    </div>
                    <Badge variant={user.n_status === 1 ? 'success' : 'destructive'}>
                      {user.n_status === 1 ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SECURITY NOTICE */}
        <div className="mt-8">
          <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
            <CardContent className="p-6 flex items-center gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              <p className="text-sm">
                Ensure every role has required permissions assigned to avoid access issues.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
