import { Clock, MoreHorizontal, Upload, Send, Calendar, Eye } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PmTaskViewPage = () => {
  const [activeTab, setActiveTab] = useState('description');

  const [comment, setComment] = useState('');

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [time, setTime] = useState(0);

  const taskData = {
    title: 'testtest',
    status: 'TO DO',
    assignedTo: {
      name: 'Nazneen Pinjari',
      initials: 'N',
      color: 'bg-purple-500',
    },
    assignedBy: {
      name: 'Faisal Ali',
      initials: 'F',
      color: 'bg-blue-500',
    },
    dueDate: '05 October 2025, 4:56 PM',
    deadline: 'Deadline',
    views: 1,
  };

  React.useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleDone = () => {
    // Handle task completion
    toast.success('Task marked as done');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Title and info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <h1 className="text-xl font-semibold text-foreground">{taskData.title}</h1>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant={isTimerRunning ? 'secondary' : 'outline'}
                size="sm"
                onClick={handleStartTimer}
                disabled={isTimerRunning}
              >
                <Clock className="w-4 h-4 mr-2" />
                {isTimerRunning ? 'Timer Running' : 'Start timer'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDone}>
                Done
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Task metadata */}
          <div className="flex items-center gap-6 mt-4 text-sm">
            <Badge variant="secondary" className="font-normal">
              {taskData.status}
            </Badge>

            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className={`${taskData.assignedTo.color} text-white text-xs`}>
                  {taskData.assignedTo.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">{taskData.assignedTo.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className={`${taskData.assignedBy.color} text-white text-xs`}>
                  {taskData.assignedBy.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">{taskData.assignedBy.name}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{taskData.dueDate}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <span>→</span>
              <span>{taskData.deadline}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground ml-auto">
              <Eye className="w-4 h-4" />
              <span>{formatTime(time)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          {/* Description Tab */}
          <TabsContent value="description" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span>First viewed 1</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="space-y-6">
            <div className="text-sm text-muted-foreground mb-2">Files</div>

            <Card>
              <CardContent className="pt-6">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-primary font-medium mb-1">Upload files or drag and drop</p>
                  <p className="text-xs text-muted-foreground">We can upload any files</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-6">
            <div className="text-sm text-muted-foreground mb-2">Comments</div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-purple-500 text-white text-sm">N</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      placeholder="Your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="icon" variant="ghost">
                      <Send className="w-4 h-4 text-primary" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PmTaskViewPage;
