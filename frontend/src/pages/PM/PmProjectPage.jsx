import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import PageHeader from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axiosInstance from '@/lib/axiosConfig';

const ProjectPage = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectGroupName: '',
    projectStatus: '',
    projectManager: '',
    projectTeam: [],
    projectFrom: null,
    projectTo: null,
  });

  const [groupProjectName, setGroupProjectName] = useState('');

  const [groupProject, setGroupProject] = useState([]);

  const [manager, setManager] = useState([]);

  const [status, setStatus] = useState([]);

  const [teamMembers, setTeamMembers] = useState([]);

  const [projects, setprojects] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateSelect = (range) => {
    if (!range) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      projectFrom: range.from,
      projectTo: range.to,
    }));
  };

  const validateForm = () => {
    if (
      !formData.projectName ||
      !formData.projectGroupName ||
      !formData.projectStatus ||
      !formData.projectManager ||
      !formData.projectTeam ||
      !formData.projectFrom ||
      !formData.projectTo
    ) {
      toast('Please Fill All the Required Fields');

      return false;
    } else if (formData.projectName.length < 3) {
      toast('Title must be at least 3 characters long');

      return false;
    } else {
      setFormData((prev) => ({
        ...prev,
        projectFrom: format(prev.projectFrom, 'yyyy-MM-dd'),
        projectTo: format(prev.projectTo, 'yyyy-MM-dd'),
        created_by: Number(localStorage.getItem('empID')),
      }));

      return true;
    }
  };

  const resetProjectForm = () => {
    setFormData({
      projectName: '',
      projectGroupName: '',
      projectStatus: '',
      projectManager: '',
      projectTeam: [],
      projectFrom: null,
      projectTo: null,
    });
  };

  const fetchProjects = async () => {
    try {
      const resp = await axiosInstance.get('/pm/getProjects');

      setprojects(resp.data);
    } catch {
      toast.error('Something went wrong....');
    }
  };

  const addProject = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await axiosInstance.post('/pm/addProject', formData);

      toast.success('Successfully Created the Project');
      resetProjectForm();
      fetchProjects();
    } catch {
      toast.error('Something went wrong....');
    }
  };

  const fetchGroupProjectName = async () => {
    try {
      const resp = await axiosInstance.get('/pm/getGroupProjectName');

      setGroupProject(resp.data);
    } catch {
      toast.error('Something went wrong....');
    }
  };

  const addGroupProjectName = async () => {
    try {
      await axiosInstance.post('/pm/addGroupProjectName', {
        groupProjectName: groupProjectName,
      });

      toast.success('Successfully Created Project Group');
      fetchGroupProjectName();
    } catch {
      toast.error('Sometime Went Wrong....');
    }
  };

  useEffect(() => {
    const getManager = async () => {
      try {
        const resp = await axiosInstance.get('/pm/getManager');

        setManager(resp.data);
      } catch {
        toast.error('Something went wrong....');
      }
    };

    const getGroupProjectName = async () => {
      try {
        const resp = await axiosInstance.get('/pm/getGroupProjectName');

        setGroupProject(resp.data);
      } catch {
        toast.error('Something went wrong....');
      }
    };

    const getProjects = async () => {
      try {
        const resp = await axiosInstance.get('/pm/getProjects');

        setprojects(resp.data);
      } catch {
        toast.error('Something went wrong....');
      }
    };

    const getStatus = async () => {
      try {
        const resp = await axiosInstance.get('/common/getStatus');

        setStatus(resp.data);
      } catch {
        toast.error('Something went wrong....');
      }
    };

    const getTeamMembers = async () => {
      try {
        const resp = await axiosInstance.get('/pm/getTeamMembers');

        setTeamMembers(resp.data);
      } catch {
        toast.error('Failed to fetch users');
      }
    };

    getManager();
    getStatus();
    getGroupProjectName();
    getTeamMembers();
    getProjects();
  }, []);

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <div className="px-6 py-6">
        <PageHeader
          title={'Project'}
          subTitle={'Track and manage your projects'}
          actions={
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="border border-[var(--color-border)] rounded-lg flex items-center justify-center hover:border-[var(--color-ring)] transition-colors">
                    <Plus className="w-4 h-4 text-[var(--color-muted-foreground)] mr-2" />
                    Create Project
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-card-foreground)] w-sm p-0">
                  {/* Modal Header */}
                  <DialogHeader className="px-6 py-4 border-b border-[var(--color-border)]">
                    <DialogTitle className="text-lg font-semibold">Create a project</DialogTitle>
                    <DialogDescription className="text-sm text-[var(--color-muted-foreground)] mt-2">
                      A project represents a team with its own tasks.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Modal Content */}
                  <div className="px-6 py-4 space-y-4">
                    {/* Project Name */}
                    <div className="flex items-center space-x-4">
                      <Label
                        htmlFor="projectName"
                        className="text-sm font-medium text-[var(--color-foreground)] w-20 flex-shrink-0"
                      >
                        Name
                      </Label>
                      <Input
                        id="projectName"
                        placeholder="Project Name"
                        value={formData.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        className="w-[240px] bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                      />
                    </div>

                    {/* group name */}
                    <div className="flex items-center space-x-4">
                      <Label
                        htmlFor="projectGroupName"
                        className="text-sm font-medium text-[var(--color-foreground)] w-20 flex-shrink-0"
                      >
                        Group of Project
                      </Label>
                      <Select
                        value={formData.projectGroupName}
                        onValueChange={(value) => handleInputChange('projectGroupName', value)}
                      >
                        <SelectTrigger
                          id="projectGroupName"
                          className="w-[240px] bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                        >
                          <SelectValue placeholder="Select Group of Project" />
                        </SelectTrigger>
                        <SelectContent>
                          {groupProject.map((group) => (
                            <SelectItem key={group.n_group_id} value={group.n_group_id}>
                              {group.s_group_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status */}
                    <div className="flex items-center space-x-4">
                      <Label
                        htmlFor="projectStatus"
                        className="text-sm font-medium text-[var(--color-foreground)] w-20 flex-shrink-0"
                      >
                        Status
                      </Label>
                      <Select
                        value={formData.projectStatus}
                        onValueChange={(value) => handleInputChange('projectStatus', value)}
                      >
                        <SelectTrigger
                          id="projectStatus"
                          className="w-[240px] bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                        >
                          <SelectValue placeholder="Select Project Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {status.map((stat) => (
                            <SelectItem key={stat.n_status_id} value={stat.n_status_id}>
                              {stat.s_status_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Manager */}
                    <div className="flex items-center space-x-4">
                      <Label
                        htmlFor="projectManager"
                        className="text-sm font-medium text-[var(--color-foreground)] w-20 flex-shrink-0"
                      >
                        Manager
                      </Label>
                      <Select
                        value={formData.projectManager}
                        onValueChange={(value) => handleInputChange('projectManager', value)}
                      >
                        <SelectTrigger
                          id="projectManager"
                          className="w-[240px] bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] flex items-center gap-2"
                        >
                          <SelectValue placeholder="Select Project Manager" />
                        </SelectTrigger>
                        <SelectContent>
                          {manager.map((user) => (
                            <SelectItem key={user.n_user_id} value={user.n_user_id}>
                              {user.s_full_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* team */}
                    <div className="flex items-center space-x-4">
                      <Label
                        htmlFor="projectTeam"
                        className="text-sm font-medium text-[var(--color-foreground)] w-20 flex-shrink-0"
                      >
                        Teams
                      </Label>
                      <MultipleSelector
                        className="w-[240px] bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] flex items-center gap-2"
                        onChange={(value) => handleInputChange('projectTeam', value)}
                        defaultOptions={teamMembers}
                        placeholder="Select team members..."
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                      />
                    </div>

                    {/* Period with Date Range Picker */}
                    <div className="flex items-center space-x-4">
                      <Label className="text-sm font-medium text-[var(--color-foreground)] w-20 flex-shrink-0">
                        Period
                      </Label>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[240px] bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData?.projectFrom ? (
                              formData.projectTo ? (
                                <>
                                  {format(formData.projectFrom, 'dd/MM/yyyy')} -{' '}
                                  {format(formData.projectTo, 'dd/MM/yyyy')}
                                </>
                              ) : (
                                format(formData.projectFrom, 'dd/MM/yyyy')
                              )
                            ) : (
                              <span className="text-[var(--color-muted-foreground)]">Pick a date range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                          onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                          <Calendar
                            mode="range"
                            selected={{
                              from: formData.projectFrom,
                              to: formData.projectTo,
                            }}
                            onSelect={handleDateSelect}
                            numberOfMonths={2}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <DialogFooter className="px-6 py-4 border-t border-[var(--color-border)]">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                        onClick={resetProjectForm}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-ring)] text-[var(--color-primary-foreground)]"
                        onClick={addProject}
                      >
                        Create Project
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* group project */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="border border-[var(--color-border)] rounded-lg flex items-center justify-center hover:border-[var(--color-ring)] transition-colors">
                    <Plus className="w-4 h-4 text-[var(--color-muted-foreground)] mr-2" />
                    Create Project Group
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-card-foreground)] w-md p-0">
                  {/* Modal Header */}
                  <DialogHeader className="px-6 py-4 border-b border-[var(--color-border)]">
                    <DialogTitle className="text-lg font-semibold">Create a project group</DialogTitle>
                    <DialogDescription className="text-sm text-[var(--color-muted-foreground)] mt-2">
                      A project group represents multiple project in single group.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Modal Content */}
                  <div className="px-6 py-4 space-y-4">
                    {/* Project Name */}
                    <div className="flex items-center space-x-4">
                      <Label
                        htmlFor="groupName"
                        className="text-sm font-medium text-[var(--color-foreground)] w-30 flex-shrink-0"
                      >
                        Group Name
                      </Label>
                      <Input
                        id="groupName"
                        placeholder="Project Group Name"
                        value={groupProjectName.groupName}
                        onChange={(e) => setGroupProjectName(e.target.value)}
                        className="w-[240px] bg-[var(--color-input)] border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                      />
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <DialogFooter className="px-6 py-4 border-t border-[var(--color-border)]">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                      >
                        Cancel
                      </Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-ring)] text-[var(--color-primary-foreground)]"
                        onClick={addGroupProjectName}
                      >
                        Create
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          }
        />

        {/* Projects Header */}
        <div>
          {/* Shadcn Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">Project name</TableHead>
                <TableHead className="w-32">Team</TableHead>
                <TableHead className="w-32">Progress</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.n_project_id} className="hover:bg-[var(--color-muted)]/30 transition-colors">
                  {/* Project Name + Status */}
                  <TableCell className="w-64">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[var(--color-foreground)] font-medium">
                          <Link to={`/pm/project/${project.n_project_id}`} className="hover:underline">
                            {project.s_project_name}
                          </Link>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {project.project_status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.group_name}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>

                  {/* Team */}
                  <TableCell className="w-32">
                    <div className="flex flex-row space-x-2">
                      {project.project_team.map((team, index) => (
                        <Avatar
                          key={index}
                          className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-2 border-[var(--color-ring)] flex items-center justify-center"
                        >
                          <span>{team.initial_name.trim()}</span>
                        </Avatar>
                      ))}
                    </div>
                  </TableCell>

                  {/* Progress */}
                  <TableCell className="w-48">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                        <span className="text-[var(--color-muted-foreground)] text-sm">{project.progress}%</span>
                      </div>

                      {/* ✅ Progress Bar */}
                      <Progress value={project.progress} className="h-2 bg-[var(--color-muted)]" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
