import axios from 'axios';
import { Eye, MessageSquare, Paperclip, ArrowLeft } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { formatDate, formatDateShort } from '@/lib/utils';

const STATUS_OPTIONS = ['Open', 'In process', 'Complete', 'Hold', 'Requirement pending', 'UAT', 'Yet to start'];

const STATUS_COLORS = {
  Open: 'bg-blue-100 text-blue-800',
  'In process': 'bg-yellow-100 text-yellow-800',
  Complete: 'bg-green-100 text-green-800',
  Hold: 'bg-red-100 text-red-800',
  'Requirement pending': 'bg-orange-100 text-orange-800',
  UAT: 'bg-purple-100 text-purple-800',
  'Yet to start': 'bg-gray-100 text-gray-800',
};

const PRIORITY_COLORS = {
  Critical: 'bg-red-100 text-red-800',
  Major: 'bg-orange-100 text-orange-800',
  Minor: 'bg-blue-100 text-blue-800',
};

export default function TmTicketDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [_selectedAttachment, setSelectedAttachment] = useState(null);

  const [ticket, setTicket] = useState(null);

  const [comments, setComments] = useState([]);

  const [developers, setDevelopers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [newComment, setNewComment] = useState('');

  const [addingComment, setAddingComment] = useState(false);

  const [statusUpdate, setStatusUpdate] = useState('');

  const [assigneeUpdate, setAssigneeUpdate] = useState('');

  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    fetchTicketDetailById();
    fetchComments();
    fetchAttachments();
    setLoading(false);
  }, [id, fetchTicketDetailById, fetchComments, fetchAttachments]);

  const fetchTicketDetailById = useCallback(async () => {
    try {
      const res = await axios.post('http://localhost:5000/tms/getTicketDetailById', { id: id });

      const ticketDetail = res.data[0];

      setTicket(ticketDetail);
      setAssigneeUpdate(ticketDetail.assigned_to ?? '0');
      setStatusUpdate(ticketDetail.status);
    } catch {
      toast.error('SomeThing Went Wrong!!!');
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.post('http://localhost:5000/tms/getComments', {
        id: id,
      });

      setComments(res.data);
    } catch {
      toast.error('SomeThing Went Wrong!!!');
    }
  }, [id]);

  const fetchAttachments = useCallback(async () => {
    try {
      const res = await axios.post('http://localhost:5000/tms/getAttachments', {
        id: id,
      });

      setAttachments(res.data);
    } catch {
      toast.error('SomeThing Went Wrong!!!');
    }
  }, [id]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const users = await axios.get('http://localhost:5000/tms/getAllDeveloperName');

        setDevelopers(users.data);
      } catch {
        toast.error('SomeThing Went Wrong!!!');
      }
    };

    fetchDevelopers();
  });

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return;
    }

    const data = {
      newComment: newComment,
      ticketId: id,
      userId: localStorage.getItem('empID'),
    };

    try {
      setAddingComment(true);
      await axios.post('http://localhost:5000/tms/addComment', data);
      fetchComments();
      setNewComment('');
      toast.success('Comment added successfully');
    } catch {
      toast.error('Failed to add comment');
      toast.error('SomeThing Went Wrong!!!');
    } finally {
      setAddingComment(false);
    }
  };

  const handleUpdateTicket = async () => {
    try {
      const updates = {
        ticketId: id,
        status: '',
        assignedTo: '',
      };

      if (statusUpdate !== ticket.status) {
        updates.status = statusUpdate;
      }

      if (assigneeUpdate !== ticket.assigned_to && assigneeUpdate !== '0') {
        updates.assignedTo = assigneeUpdate;
      }

      if (updates.status === '' && updates.assignedTo === '') {
        toast.info('No changes to update');

        return;
      }

      await axios.post('http://localhost:5000/tms/updateStatusAndAssign', updates);

      fetchTicketDetailById();

      toast.success('Ticket updated successfully');
    } catch {
      toast.error('Failed to update ticket');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Ticket not found</p>
        <Button onClick={() => navigate('/tickets')} className="mt-4">
          Back to Tickets
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
          <h1 className="text-2xl font-bold">Ticket #{ticket.id}</h1>
        </div>

        <div className="flex gap-2">
          {/* {hasPermission("update_ticket_status") && ( */}
          <Select value={statusUpdate} onValueChange={setStatusUpdate}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* )} */}

          {/* {hasPermission("assign_tickets") && ( */}
          <Select value={assigneeUpdate} onValueChange={setAssigneeUpdate}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Assign to..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Unassigned</SelectItem>
              {developers.map((dev) => (
                <SelectItem key={dev.id} value={dev.id}>
                  {dev.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* )} */}

          <Button onClick={handleUpdateTicket}>Update</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Ticket Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{ticket.title}</CardTitle>
                  <CardDescription className="mt-2">
                    Created by {ticket.created_name} on {formatDateShort(ticket.created_at)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={STATUS_COLORS[ticket.status]}>{ticket.status}</Badge>
                  <Badge className={PRIORITY_COLORS[ticket.priority]}>{ticket.priority}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">Type</Label>
                  <p className="text-gray-600">{ticket.ticket_type}</p>
                </div>
                <div>
                  <Label className="font-medium">Assigned to</Label>
                  <p className="text-gray-600">{ticket.assigned_name ?? 'unassigned'}</p>
                </div>
                <div>
                  <Label className="font-medium">Created</Label>
                  <p className="text-gray-600">{formatDate(ticket.created_at)}</p>
                </div>
                <div>
                  <Label className="font-medium">Last Updated</Label>
                  <p className="text-gray-600">{formatDate(ticket.updated_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {comment.full_name
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.full_name}</span>
                        <span className="text-xs text-gray-500">{formatDateShort(comment.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                />
                <Button onClick={handleAddComment} disabled={addingComment || !newComment.trim()} size="sm">
                  {addingComment ? 'Adding...' : 'Add Comment'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* attachments section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paperclip className="h-5 w-5" />
                Attachments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-55">
                <div className="space-y-3">
                  {attachments.map((attachment) => (
                    <div key={attachment.id} className="text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-gray-700">
                            <span className="font-medium">{attachment.og_name}</span>
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {formatDateShort(attachment.created_at)}

                            {/* Eye Button Opens Dialog */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  onClick={() => setSelectedAttachment(attachment)}
                                  className="hover:text-blue-600 transition-colors"
                                >
                                  <Eye size={16} strokeWidth={1} />
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-5xl">
                                <DialogHeader>
                                  <DialogTitle>{attachment.og_name}</DialogTitle>
                                </DialogHeader>
                                <div className=" w-full h-full">
                                  <iframe
                                    src={`http://localhost:5000/${attachment.file_path}/${attachment.new_name}`}
                                    className="w-full h-full border rounded-md"
                                    title={attachment.og_name}
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
