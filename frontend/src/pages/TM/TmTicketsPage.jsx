import axios from 'axios';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

const TmTicketsPage = () => {
  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [globalFilter, setGlobalFilter] = useState('');

  const [statusFilter, setStatusFilter] = useState('all');

  const [priorityFilter, setPriorityFilter] = useState('all');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tms/getAllTicket');

        setTickets(response.data);
      } catch {
        toast.error('SomeThing Went Wrong!!!!');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = tickets;

    // Global filter (search)
    if (globalFilter) {
      filtered = filtered.filter((ticket) => ticket.title.toLowerCase().includes(globalFilter.toLowerCase()));
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((ticket) => ticket.priority === priorityFilter);
    }

    return filtered;
  }, [tickets, globalFilter, statusFilter, priorityFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = pagination.pageIndex * pagination.pageSize;

    const endIndex = startIndex + pagination.pageSize;

    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, pagination]);

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const resetFilters = () => {
    setGlobalFilter('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setPagination({ pageIndex: 0, pageSize: 10 });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'Major':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'Minor':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'In process':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'Complete':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Hold':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'UAT':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'Requirement pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Yet to start':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Tickets</h1>
          <p className="text-gray-600">Manage and track all support tickets</p>
        </div>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent>
          {/* Toolbar */}
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Search tickets..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="max-w-sm"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In process">In Process</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                  <SelectItem value="Hold">Hold</SelectItem>
                  <SelectItem value="UAT">UAT</SelectItem>
                  <SelectItem value="Requirement pending">Requirement Pending</SelectItem>
                  <SelectItem value="Yet to start">Yet to Start</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Major">Major</SelectItem>
                  <SelectItem value="Minor">Minor</SelectItem>
                </SelectContent>
              </Select>
              {(globalFilter || statusFilter !== 'all' || priorityFilter !== 'all') && (
                <Button variant="ghost" onClick={resetFilters} className="h-8 px-2 lg:px-3">
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead className="w-[100px]">Priority</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[100px]">Created By</TableHead>
                  <TableHead className="w-[100px]">Assigned To</TableHead>
                  <TableHead className="w-[100px]">Created At</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">#{ticket.id}</TableCell>
                    <TableCell>
                      <div className="max-w-[300px] truncate font-medium">{ticket.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.ticket_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                    </TableCell>
                    <TableCell>{ticket.created_by}</TableCell>
                    <TableCell>{ticket.assigned_to}</TableCell>
                    <TableCell>{formatDate(ticket.created_at)}</TableCell>
                    <TableCell>
                      <button onClick={() => navigate(`/tm/tickets/${ticket.id}`)}>
                        <Eye color="#1e9426" strokeWidth={1.5} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {filteredData.length === 0 ? (
                'No results.'
              ) : (
                <>
                  Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
                  {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)} of{' '}
                  {filteredData.length} result(s).
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${pagination.pageSize}`}
                onValueChange={(value) => {
                  setPagination((prev) => ({
                    ...prev,
                    pageSize: Number(value),
                    pageIndex: 0,
                  }));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {pagination.pageIndex + 1} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: prev.pageIndex - 1,
                    }))
                  }
                  disabled={pagination.pageIndex === 0}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: prev.pageIndex + 1,
                    }))
                  }
                  disabled={pagination.pageIndex >= totalPages - 1}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TmTicketsPage;
