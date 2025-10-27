import { format } from 'date-fns';
import {
  FolderDot,
  Calendar as CalendarIcon,
  Circle,
  Play,
  CheckIcon,
  StepBack,
  ChartNoAxesCombined,
  Tag,
  User2,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { MinimalTiptap } from '@/components/ui/shadcn-io/minimal-tiptap';
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from '@/components/ui/shadcn-io/tags';
import axiosInstance from '@/lib/axiosConfig';

export default function PmCreateTaskPage() {
  const [activeTab, setActiveTab] = useState('description');

  const [content, setContent] = useState(``);

  const [files, setFiles] = useState([]);

  const [projectName, setprojectName] = useState([]);

  const [taskStatus, setTaskStatus] = useState([]);

  const [taskTag, _setTaskTag] = useState([]);

  const [teamMembers, setTeamMembers] = useState([]);

  const [selected, setSelected] = useState([]);

  const [formData, _setFormData] = useState({
    projectName: '',
    projectGroupName: '',
    projectStatus: '',
    projectManager: '',
    projectTeam: [],
    projectFrom: null,
    projectTo: null,
  });

  const handleRemove = (value) => {
    if (!selected.includes(value)) {
      return;
    }
    setSelected((prev) => prev.filter((val) => val !== value));
  };

  const handleSelect = (value) => {
    if (selected.includes(value)) {
      handleRemove(value);

      return;
    }
    setSelected((prev) => [...prev, value]);
  };

  const handleDrop = (file) => {
    setFiles(file);
  };

  const getTaskStatus = async (value) => {
    try {
      const resp = await axiosInstance.post('/pm/getTaskStatus', {
        value: value,
      });

      setTaskStatus(resp.data);
    } catch {
      toast.error('Something went wrong....');
    }
  };

  useEffect(() => {
    const getProjectName = async () => {
      try {
        const resp = await axiosInstance.get('/pm/getProjectName');

        setprojectName(resp.data);
      } catch {
        toast.error('Something went wrong....');
      }
    };

    const getTeamMembers = async () => {
      try {
        const resp = await axiosInstance.get('/pm/getTeamMembers');

        setTeamMembers(resp.data);
      } catch {
        toast.error('Something went wrong....');
      }
    };

    getProjectName();
    getTeamMembers();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Circle className="w-5 h-5 text-blue-400" />
          <Input
            placeholder="Write task title"
            className="text-base border-0 shadow-none focus-visible:ring-0 px-0 placeholder:text-gray-300 w-[400px]"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm">
            <Play className="w-4 h-4 mr-2" />
            Create
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm">
            <StepBack className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* First Metadata Row */}
      <div className="flex items-center gap-4 mb-4">
        {/* Select Project */}
        <div className="flex items-center gap-2">
          {/* project */}
          <Select
            // value={
            //     formData.projectGroupName
            // }
            onValueChange={(value) => {
              getTaskStatus(value);
            }}
          >
            <SelectTrigger className="text-gray-400 text-sm border-b border-dashed border-gray-300 pb-0.5">
              <FolderDot className="w-5 h-5" />
              <SelectValue placeholder="Select Project Name" />
            </SelectTrigger>
            <SelectContent>
              {projectName.map((name) => (
                <SelectItem key={name.n_project_id} value={name.n_project_id}>
                  {name.s_project_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* status */}
          <Select
            // value={
            //     formData.projectGroupName
            // }
            // onValueChange={(value) =>
            //     getTaskStatus(value)
            // }
            disabled={!(taskStatus.length > 0)}
          >
            <SelectTrigger className="text-gray-400 text-sm border-b border-dashed border-gray-300 pb-0.5">
              <ChartNoAxesCombined className="w-5 h-5" />
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {taskStatus.map((status) => (
                <SelectItem key={status.n_task_status_id} value={status.n_task_status_id}>
                  {status.s_task_status_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* tags */}
          <Tags>
            <TagsTrigger
              disabled={!(taskTag.length > 0)}
              className="text-gray-400 text-sm border-b border-dashed border-gray-300 pb-0.5"
            >
              <Tag className="w-5 h-5" />
              {selected.map((tag) => (
                <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
                  {taskTag.find((task) => task.id === tag)?.label}
                </TagsValue>
              ))}
            </TagsTrigger>
            <TagsContent>
              <TagsInput placeholder="Search Tag" />
              <TagsList>
                <TagsEmpty />
                <TagsGroup>
                  {taskTag.map((tag) => (
                    <TagsItem key={tag.id} onSelect={() => handleSelect(tag.id)}>
                      {tag.label}
                      {selected.includes(tag.id) && <CheckIcon className="text-muted-foreground" size={14} />}
                    </TagsItem>
                  ))}
                </TagsGroup>
              </TagsList>
            </TagsContent>
          </Tags>
        </div>
      </div>

      {/* Second Metadata Row */}
      <div className="flex items-center justify-between mb-6">
        {/* Assignee Section */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Select value={localStorage.getItem('empID')} disabled>
              <SelectTrigger className="text-gray-400 text-sm border-b border-dashed border-gray-300 pb-0.5">
                <User2 className="w-5 h-5" />
                <SelectValue placeholder="Select Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={localStorage.getItem('empID')}>{localStorage.getItem('fullName')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <span className="text-gray-400 text-sm">→</span>
          <div className="flex items-center gap-2">
            <Select
            // value={
            //     formData.projectGroupName
            // }
            // onValueChange={(value) => {
            //     getTaskStatus(value);
            //     getTaskTag(value);
            // }}
            >
              <SelectTrigger className="text-gray-400 text-sm border-b border-dashed border-gray-300 pb-0.5">
                <User2 className="w-5 h-5" />
                <SelectValue placeholder="Select Assignee" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((team) => (
                  <SelectItem key={team.value} value={team.value}>
                    {team.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Section */}
        <div className="flex items-center gap-2">
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData?.projectFrom ? (
                  formData.projectTo ? (
                    <>
                      {format(formData.projectFrom, 'dd/MM/yyyy')} - {format(formData.projectTo, 'dd/MM/yyyy')}
                    </>
                  ) : (
                    format(formData.projectFrom, 'dd/MM/yyyy')
                  )
                ) : (
                  <span className="text-[var(--color-muted-foreground)]">Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
              <Calendar
                mode="range"
                // selected={{
                //     from: formData.projectFrom,
                //     to: formData.projectTo,
                // }}
                // onSelect={
                //     handleDateSelect
                // }
                numberOfMonths={2}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'description' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'files' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'
          }`}
        >
          Files
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'description' ? (
        <MinimalTiptap content={content} onChange={setContent} placeholder="Start typing your content here..." />
      ) : (
        <Dropzone maxFiles={5} onDrop={handleDrop} src={files}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      )}
    </div>
  );
}
