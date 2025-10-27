import axios from 'axios';
import { Save, Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const TmCreateTicketPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ticketType: '',
    priority: '',
    assign: null,
  });

  const [attachments, setAttachments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [files, setFiles] = useState([]);

  const ticketTypes = ['Bug', 'Change request', 'Training', 'Infra related issue'];

  const priorities = ['Critical', 'Major', 'Minor'];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const uploadfiles = Array.from(e.target.files);

    const newAttachments = uploadfiles.map((file) => ({
      id: Date.now() + Math.random(), // simple unique ID
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    setFiles((prev) => [...prev, ...uploadfiles]);
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));

    setFiles((prev) => {
      const indexToRemove = attachments.findIndex((att) => att.id === id);

      if (indexToRemove === -1) {
        return prev;
      }
      const updatedFiles = [...prev];

      updatedFiles.splice(indexToRemove, 1);

      return updatedFiles;
    });
  };

  const validateForm = () => {
    if (!formData.title || !formData.description || !formData.priority || !formData.ticketType) {
      toast('Please Fill All the Required Fields');

      return false;
    } else if (formData.title.length < 10) {
      toast('Title must be at least 10 characters long');

      return false;
    } else if (formData.description.length < 20) {
      toast('Description must be at least 20 characters long');

      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      return;
    }

    if (localStorage.getItem('role') === 'developer') {
      formData.assign = localStorage.getItem('empID');
    }

    try {
      formData.createdBy = localStorage.getItem('empID');
      const res = await axios.post('http://localhost:5000/tms/createTicket', formData);

      if (files.length > 0) {
        const fileData = new FormData();

        for (let i = 0; i < files.length; i++) {
          fileData.append('files', files[i]);
        }

        fileData.append('ticket_id', res.data.insertId);
        fileData.append('empID', localStorage.getItem('empID'));

        await axios.post('http://localhost:5000/upload', fileData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setSuccess(true);
    } catch {
      toast('SomeThing Went Wrong. Try Again!!!');
    } finally {
      setLoading(false);
    }
  };

  const handleCleanUp = () => {
    setFormData({
      title: '',
      description: '',
      ticketType: '',
      priority: '',
    });
    setAttachments([]);
    setFiles([]);
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-green-700">Ticket Created Successfully!</h2>
              <p className="text-gray-600">Your ticket has been submitted and assigned a unique ID.</p>
              <Button onClick={handleCleanUp} className="mt-4">
                Create Another Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 p-3">
        <h1 className="text-3xl font-bold text-gray-900">Create New Ticket</h1>
        <p className="text-gray-600">Submit a new support request or report an issue</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
              <CardDescription>Provide detailed information about your request or issue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue or request"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
                <p className="text-xs text-gray-500">{formData.title.length}/100 characters</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue, including steps to reproduce, expected behavior, and any error messages..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`min-h-32`}
                />
                <p className="text-xs text-gray-500">{formData.description.length}/1000 characters</p>
              </div>

              {/* Type and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ticket Type *</Label>
                  <Select value={formData.ticketType} onValueChange={(value) => handleInputChange('ticketType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority *</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Attachments</Label>

                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors flex flex-col items-center text-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />

                  <Input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                  />

                  <Label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Choose Files
                  </Label>

                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Maximum file size: 10MB. Supported formats: JPG, PNG, PDF, DOC, TXT
                  </p>
                </div>

                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    {attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">{attachment.name}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeAttachment(attachment.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Ticket...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Ticket
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Help Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">
                <h4 className="font-medium mb-2">Tips for better support:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Be specific in your title</li>
                  <li>• Include steps to reproduce the issue</li>
                  <li>• Attach relevant screenshots or files</li>
                  <li>• Mention any error messages</li>
                  <li>• Specify the urgency level accurately</li>
                </ul>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  For urgent issues affecting system operations, please also contact support directly.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TmCreateTicketPage;
