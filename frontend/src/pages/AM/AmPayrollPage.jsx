import { Download, Eye, Send, Search, CheckCircle, AlertCircle, User } from 'lucide-react';
import React, { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AmPayrollPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('october-2025');

  const [filterDepartment, setFilterDepartment] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const [showProcessDialog, setShowProcessDialog] = useState(false);

  const [processingType, setProcessingType] = useState('');

  const months = [
    { value: 'october-2025', label: 'October 2025' },
    { value: 'september-2025', label: 'September 2025' },
    { value: 'august-2025', label: 'August 2025' },
    { value: 'july-2025', label: 'July 2025' },
  ];

  const departments = ['all', 'Engineering', 'Marketing', 'HR', 'Finance', 'Sales'];

  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Sarah Johnson',
      department: 'Engineering',
      designation: 'Senior Developer',
      basicSalary: 80000,
      allowances: {
        hra: 20000,
        transport: 2000,
        medical: 1500,
        special: 5000,
      },
      deductions: {
        pff: 9600,
        tax: 15000,
        insurance: 1500,
      },
      workingDays: 22,
      presentDays: 22,
      leaves: 0,
      overtime: 8,
      overtimePay: 4000,
      netSalary: 86900,
      status: 'processed',
      processedDate: '2025-10-01',
      paidDate: '2025-10-05',
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Michael Chen',
      department: 'Marketing',
      designation: 'Marketing Manager',
      basicSalary: 90000,
      allowances: {
        hra: 22500,
        transport: 2000,
        medical: 1500,
        special: 7000,
      },
      deductions: {
        pff: 10800,
        tax: 18000,
        insurance: 2000,
      },
      workingDays: 22,
      presentDays: 21,
      leaves: 1,
      overtime: 0,
      overtimePay: 0,
      netSalary: 92700,
      status: 'pending',
      processedDate: null,
      paidDate: null,
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Emily Davis',
      department: 'HR',
      designation: 'HR Executive',
      basicSalary: 60000,
      allowances: {
        hra: 15000,
        transport: 2000,
        medical: 1500,
        special: 3000,
      },
      deductions: {
        pff: 7200,
        tax: 10000,
        insurance: 1200,
      },
      workingDays: 22,
      presentDays: 22,
      leaves: 0,
      overtime: 4,
      overtimePay: 2000,
      netSalary: 65100,
      status: 'processed',
      processedDate: '2025-10-01',
      paidDate: '2025-10-05',
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'James Wilson',
      department: 'Engineering',
      designation: 'QA Engineer',
      basicSalary: 70000,
      allowances: {
        hra: 17500,
        transport: 2000,
        medical: 1500,
        special: 4000,
      },
      deductions: {
        pff: 8400,
        tax: 12000,
        insurance: 1500,
      },
      workingDays: 22,
      presentDays: 20,
      leaves: 2,
      overtime: 0,
      overtimePay: 0,
      netSalary: 67455,
      status: 'pending',
      processedDate: null,
      paidDate: null,
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Priya Sharma',
      department: 'Finance',
      designation: 'Accountant',
      basicSalary: 65000,
      allowances: {
        hra: 16250,
        transport: 2000,
        medical: 1500,
        special: 3500,
      },
      deductions: {
        pff: 7800,
        tax: 11000,
        insurance: 1300,
      },
      workingDays: 22,
      presentDays: 22,
      leaves: 0,
      overtime: 6,
      overtimePay: 3000,
      netSalary: 71150,
      status: 'processed',
      processedDate: '2025-10-01',
      paidDate: '2025-10-05',
    },
  ]);

  const stats = {
    totalEmployees: payrollData.length,
    processed: payrollData.filter((payroll) => payroll.status === 'processed').length,
    pending: payrollData.filter((payroll) => payroll.status === 'pending').length,
    totalPayroll: payrollData.reduce((sum, payroll) => sum + payroll.netSalary, 0),
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsDialog(true);
  };

  const handleProcessPayroll = (employee) => {
    setSelectedEmployee(employee);
    setProcessingType('single');
    setShowProcessDialog(true);
  };

  const handleProcessAll = () => {
    setProcessingType('all');
    setShowProcessDialog(true);
  };

  const confirmProcessPayroll = () => {
    if (processingType === 'single' && selectedEmployee) {
      const updatedData = payrollData.map((emp) => {
        if (emp.id === selectedEmployee.id) {
          return {
            ...emp,
            status: 'processed',
            processedDate: new Date().toISOString().split('T')[0],
            paidDate: new Date().toISOString().split('T')[0],
          };
        }

        return emp;
      });

      setPayrollData(updatedData);
    } else if (processingType === 'all') {
      const updatedData = payrollData.map((emp) => {
        if (emp.status === 'pending') {
          return {
            ...emp,
            status: 'processed',
            processedDate: new Date().toISOString().split('T')[0],
            paidDate: new Date().toISOString().split('T')[0],
          };
        }

        return emp;
      });

      setPayrollData(updatedData);
    }
    setShowProcessDialog(false);
    setSelectedEmployee(null);
  };

  const getStatusBadge = (status) => (status === 'processed' ? 'default' : 'secondary');

  const filteredPayroll = payrollData.filter((emp) => {
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;

    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;

    const matchesSearch =
      emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDepartment && matchesStatus && matchesSearch;
  });

  const calculateTotalAllowances = (allowances) => Object.values(allowances).reduce((sum, val) => sum + val, 0);

  const calculateTotalDeductions = (deductions) => Object.values(deductions).reduce((sum, val) => sum + val, 0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Payroll Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage employee salaries and payroll processing</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleProcessAll} disabled={stats.pending === 0}>
              <Send className="w-4 h-4 mr-2" />
              Process All Pending
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Employees</CardDescription>
              <CardTitle className="text-3xl">{stats.totalEmployees}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Processed</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.processed}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Payroll</CardDescription>
              <CardTitle className="text-2xl text-blue-600">{formatCurrency(stats.totalPayroll)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name or employee ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Table */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Payroll</CardTitle>
            <CardDescription>
              {filteredPayroll.length} employee{filteredPayroll.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Basic Salary</TableHead>
                    <TableHead className="text-right">Allowances</TableHead>
                    <TableHead className="text-right">Deductions</TableHead>
                    <TableHead className="text-right">Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayroll.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        No payroll records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayroll.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{employee.employeeName}</p>
                              <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{employee.department}</p>
                            <p className="text-sm text-muted-foreground">{employee.designation}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(employee.basicSalary)}</TableCell>
                        <TableCell className="text-right text-green-600">
                          +{formatCurrency(calculateTotalAllowances(employee.allowances))}
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          -{formatCurrency(calculateTotalDeductions(employee.deductions))}
                        </TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(employee.netSalary)}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(employee.status)}>
                            {employee.status === 'processed' ? 'Processed' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewDetails(employee)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            {employee.status === 'pending' && (
                              <Button variant="default" size="sm" onClick={() => handleProcessPayroll(employee)}>
                                Process
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Payroll Details</DialogTitle>
              <DialogDescription>Complete salary breakdown for {selectedEmployee?.employeeName}</DialogDescription>
            </DialogHeader>

            {selectedEmployee && (
              <div className="space-y-6 py-4">
                {/* Employee Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Employee Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Name</Label>
                        <p className="font-medium">{selectedEmployee.employeeName}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Employee ID</Label>
                        <p className="font-medium">{selectedEmployee.employeeId}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Department</Label>
                        <p className="font-medium">{selectedEmployee.department}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Designation</Label>
                        <p className="font-medium">{selectedEmployee.designation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Earnings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Basic Salary</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(selectedEmployee.basicSalary)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>HRA</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(selectedEmployee.allowances.hra)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Transport Allowance</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(selectedEmployee.allowances.transport)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Medical Allowance</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(selectedEmployee.allowances.medical)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Special Allowance</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(selectedEmployee.allowances.special)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Overtime Pay ({selectedEmployee.overtime}h)</TableCell>
                          <TableCell className="text-right">{formatCurrency(selectedEmployee.overtimePay)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold text-green-600">Total Earnings</TableCell>
                          <TableCell className="text-right font-semibold text-green-600">
                            {formatCurrency(
                              selectedEmployee.basicSalary +
                                calculateTotalAllowances(selectedEmployee.allowances) +
                                selectedEmployee.overtimePay,
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Deductions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Deductions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Provident Fund (PF)</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(selectedEmployee.deductions.pff)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Income Tax</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(selectedEmployee.deductions.tax)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Insurance</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(selectedEmployee.deductions.insurance)}
                          </TableCell>
                        </TableRow>
                        {selectedEmployee.leaves > 0 && (
                          <TableRow>
                            <TableCell>Leave Deduction ({selectedEmployee.leaves} days)</TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(
                                (selectedEmployee.basicSalary / selectedEmployee.workingDays) * selectedEmployee.leaves,
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell className="font-semibold text-red-600">Total Deductions</TableCell>
                          <TableCell className="text-right font-semibold text-red-600">
                            {formatCurrency(
                              calculateTotalDeductions(selectedEmployee.deductions) +
                                (selectedEmployee.leaves > 0
                                  ? (selectedEmployee.basicSalary / selectedEmployee.workingDays) *
                                    selectedEmployee.leaves
                                  : 0),
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Separator />

                {/* Net Salary */}
                <Card className="bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Net Salary</span>
                      <span className="text-3xl font-bold text-primary">
                        {formatCurrency(selectedEmployee.netSalary)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Attendance Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Attendance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Working Days</Label>
                        <p className="text-2xl font-bold">{selectedEmployee.workingDays}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Present Days</Label>
                        <p className="text-2xl font-bold text-green-600">{selectedEmployee.presentDays}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Leaves Taken</Label>
                        <p className="text-2xl font-bold text-red-600">{selectedEmployee.leaves}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download Slip
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Process Confirmation Dialog */}
        <Dialog open={showProcessDialog} onOpenChange={setShowProcessDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Process Payroll</DialogTitle>
              <DialogDescription>
                {processingType === 'single'
                  ? 'Are you sure you want to process this payroll?'
                  : `Are you sure you want to process all ${stats.pending} pending payrolls?`}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {processingType === 'single' && selectedEmployee ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-muted-foreground">Employee</Label>
                        <p className="font-semibold text-lg">{selectedEmployee.employeeName}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Net Salary</Label>
                        <p className="text-2xl font-bold">{formatCurrency(selectedEmployee.netSalary)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-muted-foreground">Total Employees</Label>
                        <p className="font-semibold text-lg">{stats.pending}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Total Amount</Label>
                        <p className="text-2xl font-bold">
                          {formatCurrency(
                            payrollData
                              .filter((payroll) => payroll.status === 'pending')
                              .reduce((sum, payroll) => sum + payroll.netSalary, 0),
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Once processed, the salary will be marked as paid and cannot be undone.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProcessDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmProcessPayroll} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm & Process
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AmPayrollPage;
