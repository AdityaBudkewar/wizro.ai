import { Play, Clock, Eye, ArrowUpDown } from 'lucide-react';
import React from 'react';

import PageHeader from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TaskPage() {
  const tasks = [
    {
      id: 1,
      name: 'get ui',
      status: 'TO DO',
      project: 'evim',
      deadline: null,
      metrics: '',
      time: '01:00',
    },
    {
      id: 2,
      name: 'wire API',
      status: 'IN PROGRESS',
      project: 'evim',
      deadline: '2025-09-20',
      metrics: '80%',
      time: '02:30',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <PageHeader
          title={'My Tasks'}
          subTitle={'Manage you task and Know what to do today'}
          actions={
            <>
              <div className="flex items-center space-x-2 text-sm text-[var(--color-muted-foreground)]">
                <Eye className="w-4 h-4" />
                <span>Visibility: All</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[var(--color-muted-foreground)]">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort: Priority</span>
              </div>
            </>
          }
        />

        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-card)]">
          <Table className="[&_th]:text-center [&_td]:text-center">
            {/* Header */}
            <TableHeader className="bg-[var(--color-muted)]">
              <TableRow>
                <TableHead className="text-center text-[var(--color-foreground)]">Task name</TableHead>
                <TableHead className="text-center text-[var(--color-foreground)]">Project</TableHead>
                <TableHead className="text-center text-[var(--color-foreground)]">Deadline</TableHead>
                <TableHead className="text-center text-[var(--color-foreground)]">Metrics</TableHead>
                <TableHead className="text-center text-[var(--color-foreground)]">Time</TableHead>
                <TableHead className="text-center text-[var(--color-foreground)]">Action</TableHead>
              </TableRow>
            </TableHeader>

            {/* Body from array */}
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-[var(--color-muted)]/30">
                  {/* Task Name + Status */}
                  <TableCell className="font-medium text-[var(--color-foreground)]">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[var(--color-chart-2)] rounded-full"></div>
                      <div>
                        <div>{task.name}</div>
                        <Badge
                          variant="secondary"
                          className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-xs mt-1"
                        >
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>

                  {/* Project */}
                  <TableCell className="text-[var(--color-muted-foreground)]">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[var(--color-muted)] rounded"></div>
                      <span>{task.project}</span>
                    </div>
                  </TableCell>

                  {/* Deadline */}
                  <TableCell>
                    {task.deadline ? (
                      <span className="text-[var(--color-muted-foreground)]">{task.deadline}</span>
                    ) : (
                      <Button
                        variant="ghost"
                        className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] text-sm h-auto p-0"
                      >
                        Select deadline
                      </Button>
                    )}
                  </TableCell>

                  {/* Metrics */}
                  <TableCell className="text-[var(--color-muted-foreground)]">{task.metrics}</TableCell>

                  {/* Time */}
                  <TableCell>
                    <div className="flex items-center space-x-2 text-[var(--color-muted-foreground)]">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-mono">{task.time}</span>
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
