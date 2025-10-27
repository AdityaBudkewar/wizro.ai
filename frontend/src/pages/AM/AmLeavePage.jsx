import { Plus, Check, AlertCircle, Filter } from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const AmLeavePage = () => {
  const [showApplyLeave, setShowApplyLeave] = useState(false);

  const [selectedLeaveType, setSelectedLeaveType] = useState('');

  const [startDate, setStartDate] = useState('');

  const [endDate, setEndDate] = useState('');

  const [reason, setReason] = useState('');

  const [filterStatus, setFilterStatus] = useState('all');

  // Leave balance data
  const leaveBalance = [
    { type: 'Casual Leave', available: 8, total: 12, color: 'bg-blue-500' },
    { type: 'Sick Leave', available: 10, total: 12, color: 'bg-green-500' },
    { type: 'Earned Leave', available: 15, total: 18, color: 'bg-purple-500' },
    { type: 'Work From Home', available: 6, total: 12, color: 'bg-orange-500' },
  ];

  const leaveTypes = [
    { value: 'casual', label: 'Casual Leave', icon: '☕' },
    { value: 'sick', label: 'Sick Leave', icon: '🏥' },
    { value: 'earned', label: 'Earned Leave', icon: '✈️' },
    { value: 'wfh', label: 'Work From Home', icon: '🏠' },
  ];

  // Leave history with different statuses
  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: 1,
      type: 'Casual Leave',
      startDate: '2025-10-10',
      endDate: '2025-10-12',
      days: 3,
      reason: 'Personal work',
      status: 'approved',
      appliedOn: '2025-10-01',
      approvedBy: 'John Manager',
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2025-09-15',
      endDate: '2025-09-15',
      days: 1,
      reason: 'Fever and cold',
      status: 'approved',
      appliedOn: '2025-09-14',
      approvedBy: 'John Manager',
    },
    {
      id: 3,
      type: 'Earned Leave',
      startDate: '2025-10-20',
      endDate: '2025-10-25',
      days: 6,
      reason: 'Family vacation',
      status: 'pending',
      appliedOn: '2025-10-02',
    },
    {
      id: 4,
      type: 'Work From Home',
      startDate: '2025-09-28',
      endDate: '2025-09-28',
      days: 1,
      reason: 'Home renovation',
      status: 'rejected',
      appliedOn: '2025-09-25',
      rejectedBy: 'John Manager',
      rejectionReason: 'Team meeting scheduled',
    },
    {
      id: 5,
      type: 'Casual Leave',
      startDate: '2025-08-05',
      endDate: '2025-08-07',
      days: 3,
      reason: 'Wedding to attend',
      status: 'approved',
      appliedOn: '2025-07-28',
      approvedBy: 'John Manager',
    },
  ]);

  const handleApplyLeave = () => {
    if (!selectedLeaveType || !startDate || !endDate || !reason) {
      return;
    }

    const start = new Date(startDate);

    const end = new Date(endDate);

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const newLeave = {
      id: leaveHistory.length + 1,
      type: leaveTypes.find((leave) => leave.value === selectedLeaveType)?.label,
      startDate,
      endDate,
      days,
      reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    setLeaveHistory([newLeave, ...leaveHistory]);
    resetForm();
  };

  const resetForm = () => {
    setShowApplyLeave(false);
    setSelectedLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-green-500/10 text-green-600 border-green-200',
      pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
      rejected: 'bg-red-500/10 text-red-600 border-red-200',
    };

    return styles[status] || '';
  };

  const filteredLeaves =
    filterStatus === 'all' ? leaveHistory : leaveHistory.filter((leave) => leave.status === filterStatus);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Leave Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Track and manage your leave applications</p>
          </div>
          <Button onClick={() => setShowApplyLeave(true)} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Apply Leave
          </Button>
        </div>

        {/* Leave Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {leaveBalance.map((leave, index) => (
            <Card key={index} className="border-border">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{leave.type}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-foreground">{leave.available}</span>
                      <span className="text-sm text-muted-foreground mb-1">/ {leave.total}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${leave.color} h-2 rounded-full transition-all`}
                        style={{ width: `${(leave.available / leave.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Apply Leave Dialog */}
        <Dialog open={showApplyLeave} onOpenChange={setShowApplyLeave}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>Fill in the details below to submit your leave application</DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* Leave Type Selection */}
              <div className="space-y-3">
                <Label>Leave Type</Label>
                <div className="grid grid-cols-4 gap-3">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedLeaveType(type.value)}
                      className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                        selectedLeaveType === type.value ? 'border-primary bg-primary/5' : 'border-border bg-background'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="text-xs font-medium text-foreground text-center">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for leave..."
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleApplyLeave} disabled={!selectedLeaveType || !startDate || !endDate || !reason}>
                Submit Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Leave History */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Leave History</CardTitle>
                <CardDescription>View all your leave applications</CardDescription>
              </div>
              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1 rounded-lg border border-border bg-background text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
              {filteredLeaves.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No leave records found</p>
              ) : (
                filteredLeaves.map((leave) => (
                  <div
                    key={leave.id}
                    className="p-4 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{leave.type}</h3>
                          <Badge className={getStatusBadge(leave.status)}>
                            {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Start Date</p>
                            <p className="font-medium text-foreground">
                              {new Date(leave.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">End Date</p>
                            <p className="font-medium text-foreground">
                              {new Date(leave.endDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium text-foreground">
                              {leave.days} {leave.days === 1 ? 'day' : 'days'}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Applied On</p>
                            <p className="font-medium text-foreground">
                              {new Date(leave.appliedOn).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Reason</p>
                          <p className="text-sm text-foreground">{leave.reason}</p>
                        </div>

                        {leave.status === 'approved' && leave.approvedBy && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Check className="w-4 h-4" />
                            <span>Approved by {leave.approvedBy}</span>
                          </div>
                        )}

                        {leave.status === 'rejected' && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span>Rejected by {leave.rejectedBy}</span>
                            </div>
                            {leave.rejectionReason && (
                              <p className="text-sm text-muted-foreground ml-6">Reason: {leave.rejectionReason}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AmLeavePage;
