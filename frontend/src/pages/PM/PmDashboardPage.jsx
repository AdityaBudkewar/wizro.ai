import {
  FolderGit2,
  ChevronDown,
  CircleCheckBig,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Target,
} from 'lucide-react';
import React, { useState } from 'react';

import PageHeader from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const [_currentTime, _setCurrentTime] = useState('01:00:07');

  const stats = [
    {
      title: 'Total Tasks',
      value: '142',
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-400',
    },
    {
      title: 'Completed',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'text-green-400',
    },
    {
      title: 'In Progress',
      value: '35',
      change: '-3%',
      trend: 'down',
      icon: Clock,
      color: 'text-yellow-400',
    },
    {
      title: 'Overdue',
      value: '18',
      change: '+5%',
      trend: 'up',
      icon: AlertCircle,
      color: 'text-red-400',
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: 'Design system updates',
      project: 'Design',
      status: 'In Progress',
      priority: 'High',
      assignee: 'N',
      time: '2h 30m',
    },
    {
      id: 2,
      title: 'API integration',
      project: 'Backend',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'J',
      time: '0h 45m',
    },
    {
      id: 3,
      title: 'User testing session',
      project: 'Research',
      status: 'Completed',
      priority: 'High',
      assignee: 'M',
      time: '4h 15m',
    },
    {
      id: 4,
      title: 'User testing',
      project: 'Research',
      status: 'Completed',
      priority: 'Low',
      assignee: 'N',
      time: '6h 15m',
    },
  ];

  const projects = [
    { name: 'Design System', progress: 85, tasks: 24, color: 'bg-blue-500' },
    { name: 'Mobile App', progress: 65, tasks: 18, color: 'bg-purple-500' },
    { name: 'API Development', progress: 92, tasks: 31, color: 'bg-green-500' },
    { name: 'User Research', progress: 45, tasks: 12, color: 'bg-yellow-500' },
  ];

  const teamMembers = [
    { name: 'Nazneen Pinjari', avatar: 'N', tasks: 8, completed: 5 },
    { name: 'John Doe', avatar: 'J', tasks: 12, completed: 9 },
    { name: 'Maria Smith', avatar: 'M', tasks: 6, completed: 6 },
    { name: 'Alex Chen', avatar: 'A', tasks: 10, completed: 7 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-[var(--color-chart-2)]';
      case 'In Progress':
        return 'bg-[var(--color-chart-4)]';
      case 'To Do':
        return 'bg-[var(--color-muted)]';
      default:
        return 'bg-[var(--color-muted)]';
    }
  };

  const [profileId, setProfileId] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Low':
        return 'text-green-400';
      default:
        return 'text-slate-400';
    }
  };

  const [filter, setFilter] = useState('User Filter');

  const options = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Faisal Ali' },
    { value: 2, label: 'Nazneen Pinjari' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="p-6">
        <PageHeader
          title={'Dashboard'}
          subTitle={'Track your progress and manage your tasks'}
          actions={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
                  {filter} <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-2 p-0">
                {options.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => setFilter(option.label)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

            return (
              <Card key={index} className="bg-[var(--color-card)] border-[var(--color-border)]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[var(--color-muted-foreground)] text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl text-[var(--color-foreground)] font-bold mt-2">{stat.value}</p>
                      <div
                        className={`flex items-center mt-2 text-sm ${
                          stat.trend === 'up' ? 'text-[var(--color-chart-2)]' : 'text-[var(--color-destructive)]'
                        }`}
                      >
                        <TrendIcon className="w-4 h-4 mr-1" />
                        {stat.change}
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-[var(--color-muted)]">
                      <Icon className="w-6 h-6 text-[var(--color-foreground)]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tasks and Team Performance */}
        <div className="grid grid-cols-12 gap-6">
          {/* Recent Tasks */}
          <div className="col-span-6">
            <Card className="bg-[var(--color-card)] border-[var(--color-border)] h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex text-[var(--color-foreground)] items-center">
                  <CircleCheckBig className="w-5 h-5 mr-2" />
                  Recent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-[var(--color-muted)] transition-colors"
                    >
                      <div className="w-2 h-2 bg-[var(--color-chart-2)] rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[var(--color-foreground)] font-medium truncate">{task.title}</p>
                        <p className="text-[var(--color-muted-foreground)] text-sm">{task.project}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <Badge
                          className={`${getStatusColor(
                            task.status,
                          )} text-[var(--color-primary-foreground)] text-xs min-w-[80px] text-start`}
                        >
                          {task.status}
                        </Badge>
                        <span
                          className={`text-sm font-medium ${getPriorityColor(task.priority)} min-w-[60px] text-start`}
                        >
                          {task.priority}
                        </span>

                        <Popover
                          key={task.id}
                          open={profileId === task.id}
                          onOpenChange={(isOpen) => setProfileId(isOpen ? task.id : null)}
                        >
                          <PopoverTrigger asChild>
                            <div
                              className="cursor-pointer"
                              onMouseEnter={() => setProfileId(task.id)}
                              onMouseLeave={() => setProfileId(null)}
                            >
                              <Avatar className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-2 border-[var(--color-ring)] flex items-center justify-center">
                                <span>{task.assignee}</span>
                              </Avatar>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            side="bottom"
                            className="w-64 p-4 bg-[var(--color-popover)] text-[var(--color-popover-foreground)]"
                            onMouseEnter={() => setProfileId(task.id)}
                            onMouseLeave={() => setProfileId(null)}
                          >
                            <div className="flex items-center gap-4">
                              <Avatar className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-2 border-[var(--color-ring)] flex items-center justify-center">
                                <span>{task.assignee}</span>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">Faisal Ali</h4>
                                <p className="text-sm text-[var(--color-muted-foreground)]">FullStack Developer</p>
                              </div>
                            </div>
                            <div className="mt-4">
                              <p className="text-sm">Email: faisal.sayyed@kosqu.com</p>
                              <p className="text-sm">Phone No: 8450906077</p>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <div className="col-span-6">
            <Card className="bg-[var(--color-card)] border-[var(--color-border)] h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex text-[var(--color-foreground)] items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between space-x-4 p-3 rounded-lg bg-[var(--color-muted)] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-sm font-medium text-[var(--color-primary-foreground)]">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-[var(--color-foreground)] text-sm font-medium">{member.name}</p>
                          <p className="text-[var(--color-muted-foreground)] text-xs">
                            {member.completed}/{member.tasks} completed
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(member.completed / member.tasks) * 100}
                            className="w-32 h-2 rounded-full border border-[var(--color-ring)] bg-[var(--color-muted)] [&>div]:bg-[var(--color-chart-2)]"
                          />
                          <span className="text-sm text-[var(--color-foreground)] font-medium">
                            {Math.round((member.completed / member.tasks) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Progression */}
        <div className="mt-8">
          <Card className="bg-[var(--color-card)] border-[var(--color-border)]">
            <CardHeader>
              <CardTitle className="flex text-[var(--color-foreground)] items-center">
                <FolderGit2 className="w-5 h-5 mr-2" />
                Project Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[var(--color-foreground)]">{project.name}</h3>
                      <span className="text-[var(--color-muted-foreground)] text-sm">{project.tasks} tasks</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-muted-foreground)]">Progress</span>
                        <span className="text-[var(--color-foreground)]">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--color-muted)] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${project.color} rounded-full transition-all duration-300`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
