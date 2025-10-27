import { Star, Clock, Archive, Menu, Plus, Eye, ArrowUp, User, Tag, Grid3X3, List } from 'lucide-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ProjectViewPage() {
  const [activeView, setActiveView] = useState('kanban');

  const { _id } = useParams();

  const filterOptions = [
    { icon: Eye, label: 'Visibility' },
    { icon: ArrowUp, label: 'Priority' },
    { icon: User, label: 'Assignee' },
    { icon: Tag, label: 'Tag' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Project Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[var(--color-muted)] border-b border-[var(--color-border)]">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">evim</h1>
          <Star className="h-5 w-5 text-[var(--color-muted-foreground)] hover:text-[var(--color-chart-4)] cursor-pointer" />
          <Badge variant="secondary" className="bg-[var(--color-chart-2)] text-white">
            IN PROGRESS
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Clock className="h-4 w-4 mr-2" />
          </Button>
          <Button variant="ghost" size="sm">
            <Archive className="h-4 w-4 mr-2" />
          </Button>
          <Button variant="ghost" size="sm">
            <Menu className="h-4 w-4 mr-2" />
            Project menu
          </Button>
        </div>
      </div>

      {/* View Controls and Filters */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* View Toggles */}
          <div className="flex items-center space-x-2 bg-[var(--color-muted)] rounded-lg p-1">
            <Button
              variant={activeView === 'kanban' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('kanban')}
              className={`${
                activeView === 'kanban'
                  ? 'bg-[var(--color-muted-foreground)]/20 text-[var(--color-foreground)]'
                  : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
              }`}
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant={activeView === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('list')}
              className={`${
                activeView === 'list'
                  ? 'bg-[var(--color-muted-foreground)]/20 text-[var(--color-foreground)]'
                  : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
              }`}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add filter
            </Button>

            {filterOptions.map((filter, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
              >
                <filter.icon className="h-4 w-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <Button variant="ghost" size="sm" className="text-[var(--color-muted-foreground)]">
          <Eye className="h-4 w-4 mr-2" />
          Hide
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-4">
        {/* Column Headers */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="text-sm text-[var(--color-muted-foreground)] font-medium">Name task</div>
          <div className="text-sm text-[var(--color-muted-foreground)] font-medium">Assignee</div>
          <div className="text-sm text-[var(--color-muted-foreground)] font-medium">Deadline</div>
          <div className="text-sm text-[var(--color-muted-foreground)] font-medium">Metrics</div>
          <div className="text-sm text-[var(--color-muted-foreground)] font-medium">Progress</div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 text-[var(--color-muted-foreground)]">
          <div className="text-lg mb-2">No tasks</div>
          <p className="text-sm mb-4">Create your first task to get started</p>
        </div>
      </div>
    </div>
  );
}
