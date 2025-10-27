import axios from 'axios';
import { Ticket, Users, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';

import PageHeader from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatCard = ({ title, value, icon: Icon, color, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

const TmDashboardPage = () => {
  const [stats, setStats] = useState(0);

  const [userStats, setUserStats] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tms/getDashboardStats');

        setStats(res.data[0]);
      } catch {
        toast.error('SomeThing Went Wrong!!!');
      }
    };

    const getDashboardUserStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tms/getDashboardUserStats');

        setUserStats(res.data);
        setLoading(false);
      } catch {
        toast.error('SomeThing Went Wrong!!!');
      }
    };

    getDashboardStats();
    getDashboardUserStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const priorityData = [
    { name: 'Critical', value: stats.count_critical, fill: '#dc2626' },
    { name: 'Major', value: stats.count_major, fill: '#ea580c' },
    { name: 'Minor', value: stats.count_minor, fill: '#16a34a' },
  ];

  return (
    <PageHeader title="Dashboard" actions={null}>
      {/* Stats Cards */}
      <div className="p-2 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Tickets"
            value={stats.total_ticket}
            icon={Ticket}
            color="text-blue-600"
            description="All tickets in system"
          />
          <StatCard
            title="Open Tickets"
            value={stats.open_tickets}
            icon={AlertCircle}
            color="text-red-500"
            description="Awaiting assignment"
          />
          <StatCard
            title="In Progress"
            value={stats.pending_tickets}
            icon={Clock}
            color="text-orange-500"
            description="Currently being worked on"
          />
          <StatCard
            title="Completed"
            value={stats.complete_tickets}
            icon={CheckCircle}
            color="text-green-500"
            description="Successfully resolved"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Developer Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Developer Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userStats.map((dev) => (
                  <div key={dev.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{dev.user_name}</h3>
                      <p className="text-sm text-gray-600">
                        {dev.total_assigned} assigned, {dev.completed_tickets} completed
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={dev.completed_tickets > 0 ? 'default' : 'secondary'}>
                        {dev.total_assigned > 0 ? `${dev.completion_percentage}% completion` : 'No tickets'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Priority Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Priority Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageHeader>
  );
};

export default TmDashboardPage;
