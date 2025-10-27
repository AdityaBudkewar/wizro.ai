import { ChevronRight, Activity, LayoutGrid, ChevronDown, Folder } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

function UserProjectsModal({ user, days, projects }) {
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="cursor-pointer text-[var(--color-primary)] hover:underline">
        {user.name}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl bg-[var(--color-card)] text-[var(--color-foreground)]">
          <DialogHeader>
            <DialogTitle>{user.name} - Projects</DialogTitle>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Project</TableHead>
                <TableHead>Total</TableHead>
                {days.map((day) => (
                  <TableHead key={day.date}>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-[var(--color-muted-foreground)]">{day.day}</span>
                      <span className="text-xs font-medium">{day.date}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <React.Fragment key={project.id}>
                  <TableRow
                    onClick={() => toggleExpand(project.id)}
                    className="cursor-pointer hover:bg-[var(--color-muted)]"
                  >
                    <TableCell className="flex items-center gap-2">
                      {expanded[project.id] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <Folder className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                      {project.name}
                    </TableCell>
                    <TableCell>{project.tasks.total}</TableCell>
                    {days.map((day) => (
                      <TableCell key={day.date}>{project.tasks[day.date] ?? '-'}</TableCell>
                    ))}
                  </TableRow>

                  {expanded[project.id] &&
                    project.children?.map((child) => (
                      <TableRow key={child.id}>
                        <TableCell className="pl-8">{child.name}</TableCell>
                        <TableCell>{child.tasks.total}</TableCell>
                        {days.map((day) => (
                          <TableCell key={day.date}>{child.tasks[day.date] ?? '-'}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function ReportsPage() {
  const days = [
    { day: 'Mon', date: '01' },
    { day: 'Tue', date: '02' },
    { day: 'Wed', date: '03' },
    { day: 'Thu', date: '04' },
    { day: 'Fri', date: '05' },
    { day: 'Sat', date: '06' },
    { day: 'Sun', date: '07' },
  ];

  const employees = [
    { id: 1, name: 'faisal ali', type: 'user', tasks: { total: 1, '03': 1 } },
    { id: 2, name: 'ahmed khan', type: 'user', tasks: { total: 2, '05': 1, '06': 1 } },
    { id: 3, name: 'Total', type: 'total', tasks: { total: 3, '03': 1, '05': 1, '06': 1 } },
  ];

  // sample user projects
  const userProjects = [
    {
      id: 'essel',
      name: 'Essel',
      tasks: { total: 2 },
      children: [
        { id: 'evim', name: 'evim', tasks: { total: 1, '01': 1 } },
        { id: 'complain', name: 'customer complain', tasks: { total: 1, '02': 1 } },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Filter Bar */}
      <div className="px-6 py-4 flex flex-wrap justify-between items-center border-b border-[var(--color-border)]">
        <div className="flex gap-4 items-center">
          <Button variant="ghost" className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
            <Activity className="w-4 h-4 mr-2" />
            Workability score
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <Button variant="ghost" className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
            <LayoutGrid className="w-4 h-4 mr-2" />
            Data: Time
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] flex items-center"
              >
                Filters
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All tasks</DropdownMenuItem>
              <DropdownMenuItem>Completed tasks</DropdownMenuItem>
              <DropdownMenuItem>Pending tasks</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content - Table */}
      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left pl-6 w-[200px]">Employee</TableHead>
              <TableHead className="w-[60px]">Total</TableHead>
              {days.map((day) => (
                <TableHead key={day.date}>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-[var(--color-muted-foreground)]">{day.day}</span>
                    <span className="text-xs font-medium">{day.date}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} className={employee.type === 'total' ? 'bg-[var(--color-muted)]' : ''}>
                <TableCell className="text-left pl-6">
                  <div className="flex items-center gap-2">
                    {employee.type === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-[var(--color-chart-6)] flex items-center justify-center text-xs text-white">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {employee.type === 'user' ? (
                      <UserProjectsModal user={employee} days={days} projects={userProjects} />
                    ) : (
                      <span className="font-medium">{employee.name}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{employee.tasks.total}</span>
                </TableCell>
                {days.map((day) => (
                  <TableCell key={day.date}>
                    {employee.tasks[day.date] ? (
                      <span className="font-medium">{employee.tasks[day.date]}</span>
                    ) : (
                      <span className="text-[var(--color-muted-foreground)]">-</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
