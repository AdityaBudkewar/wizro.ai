import { Plus, Folder } from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function UmPermissionPage() {
  const [isOpen, setIsOpen] = useState(false);

  const permissionRoles = [
    {
      name: 'Owner',
      label: 'My role',
      description:
        'Owner - The person who registered the company. All operations are available, including deleting the company account',
    },
    {
      name: 'Coordinator',
      description: 'Coordinator - Can create projects/tasks. Cannot change company settings and roles of other users.',
    },
    {
      name: 'Employee',
      description: 'Employee - Can create and participate in tasks. Cannot create projects or change access.',
    },
  ];

  const permissionsList = [
    { name: 'Project List', access: 'All' },
    { name: 'Create a project', access: 'Yes' },
    { name: 'Editing a project', access: 'All' },
    { name: 'Delete and restore project', access: 'All' },
    { name: 'Editing the project notebook', access: 'Yes' },
    { name: 'Creating a task', access: 'Yes' },
    { name: 'Editing a task', access: 'All' },
    { name: 'Commenting on a task', access: 'Yes' },
    { name: 'Tracking time into task', access: 'Yes' },
    { name: 'Manually entering time into a task', access: 'All' },
    { name: 'Timer - View Realtime Time Tracking', access: 'Yes' },
    { name: 'User creation', access: 'Yes' },
    { name: 'Edit user', access: 'Yes' },
    { name: 'View company info', access: 'Yes' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <h2 className="text-lg font-semibold">Permissions</h2>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-40 h-8 border border-dashed border-[var(--color-border)] rounded-lg flex items-center justify-center hover:border-[var(--color-muted-foreground)] transition-colors">
              <Plus className="w-4 h-4 text-[var(--color-muted-foreground)]" /> Create Permission
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-foreground)] max-w-md p-0">
            {/* Modal Header */}
            <DialogHeader className="px-6 py-4 border-b border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold">Create a project</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] h-6 w-6 p-0"
                />
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-2">
                A project represents a team with its own tasks, workflows, and settings.
              </p>
            </DialogHeader>

            {/* Modal Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Group of project */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-[var(--color-muted-foreground)] w-20 flex-shrink-0">
                  Group of project
                </span>
                <Button
                  variant="outline"
                  className="flex-1 justify-start bg-transparent border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                >
                  <Folder className="w-4 h-4 mr-2" />
                  Ungrouped
                </Button>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-[var(--color-muted-foreground)] w-20 flex-shrink-0">
                  Status
                </span>
                <Badge className="bg-[var(--color-primary)] text-white px-3 py-1">TO DO</Badge>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[var(--color-border)] flex justify-end items-center">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                >
                  Cancel
                </Button>
                <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white">
                  Next step
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {permissionRoles.map((role, index) => (
              <div
                key={index}
                className={`space-y-2 p-4 rounded-lg cursor-pointer transition-colors ${
                  role.name === 'Owner'
                    ? 'bg-[var(--color-muted)] border border-[var(--color-primary)]'
                    : 'hover:bg-[var(--color-muted)]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <h3 className="text-[var(--color-foreground)] font-medium">{role.name}</h3>
                  {role.label && (
                    <Badge
                      variant="secondary"
                      className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] text-xs"
                    >
                      {role.label}
                    </Badge>
                  )}
                </div>
                <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-[var(--color-card)] rounded-lg p-4 h-96 overflow-y-auto border border-[var(--color-border)]">
              <div className="space-y-3">
                {permissionsList.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <span className="text-[var(--color-foreground)]">{permission.name}</span>
                    <span className="text-[var(--color-muted-foreground)]">{permission.access}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
