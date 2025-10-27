import { Clock, MapPin, Calendar, CheckCircle, XCircle, LogIn, LogOut } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AmAttendancePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const [checkInTime, setCheckInTime] = useState(null);

  const [checkOutTime, setCheckOutTime] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState('');

  const [showLocationSelect, setShowLocationSelect] = useState(false);

  const [actionType, setActionType] = useState('');

  const [todayHistory, setTodayHistory] = useState([
    { type: 'check-in', time: '09:02 AM', location: 'Office' },
    { type: 'check-out', time: '01:15 PM', location: 'Office' },
    { type: 'check-in', time: '02:00 PM', location: 'Client' },
    { type: 'check-out', time: '05:30 PM', location: 'Client' },
    { type: 'check-in', time: '06:00 PM', location: 'WFH' },
  ]);

  const locations = [
    { value: 'office', label: 'Office', icon: '🏢' },
    { value: 'client', label: 'Client', icon: '🤝' },
    { value: 'wfh', label: 'Work From Home', icon: '🏠' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    setActionType('check-in');
    setShowLocationSelect(true);
  };

  const handleCheckOut = () => {
    setActionType('check-out');
    setShowLocationSelect(true);
  };

  const confirmAction = () => {
    if (!selectedLocation) {
      return;
    }

    const now = new Date();

    const locationLabel = locations.find((location) => location.value === selectedLocation)?.label || selectedLocation;

    if (actionType === 'check-in') {
      setIsCheckedIn(true);
      setCheckInTime(now);
    } else {
      setIsCheckedIn(false);
      setCheckOutTime(now);
    }

    setTodayHistory([
      ...todayHistory,
      {
        type: actionType,
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        location: locationLabel,
      },
    ]);

    setShowLocationSelect(false);
    setSelectedLocation('');
  };

  const cancelAction = () => {
    setShowLocationSelect(false);
    setSelectedLocation('');
    setActionType('');
  };

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const calculateWorkHours = () => {
    if (!checkInTime) {
      return '0h 0m';
    }
    const end = checkOutTime || new Date();

    const diff = end - checkInTime;

    const hours = Math.floor(diff / (1000 * 60 * 60));

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Attendance</h1>
            <p className="text-sm text-muted-foreground mt-1">Track your daily check-in and check-out</p>
          </div>
          <Badge variant="outline" className="text-sm px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(currentTime)}
          </Badge>
        </div>

        {/* Main Check In/Out Card */}
        <Card className="border-border bg-muted">
          <CardContent>
            <div className="flex flex-col items-center space-y-2">
              {/* Live Clock */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Current Time</span>
                </div>
                <div className="text-5xl font-bold text-foreground tabular-nums">{formatTime(currentTime)}</div>
              </div>

              {/* Status Badge */}
              <Badge variant={isCheckedIn ? 'default' : 'secondary'} className="px-6 py-2 text-sm">
                {isCheckedIn ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Checked In
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Checked Out
                  </>
                )}
              </Badge>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleCheckIn}
                  disabled={isCheckedIn || showLocationSelect}
                  className="min-w-[140px]"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Check In
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleCheckOut}
                  disabled={!isCheckedIn || showLocationSelect}
                  className="min-w-[140px]"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Check Out
                </Button>
              </div>

              {/* Location Selection */}
              {showLocationSelect && (
                <div className="w-full max-w-md space-y-4 p-4 border border-border rounded-lg bg-background">
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground mb-3">
                      Select your location for {actionType === 'check-in' ? 'Check In' : 'Check Out'}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {locations.map((location) => (
                      <button
                        key={location.value}
                        onClick={() => setSelectedLocation(location.value)}
                        className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                          selectedLocation === location.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-background'
                        }`}
                      >
                        <div className="text-3xl mb-2">{location.icon}</div>
                        <div className="text-sm font-medium text-foreground">{location.label}</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={cancelAction} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={confirmAction} disabled={!selectedLocation} className="flex-1">
                      Confirm
                    </Button>
                  </div>
                </div>
              )}

              {/* Location Info */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardDescription>Today&apos;s Hours</CardDescription>
              <CardTitle className="text-2xl">{calculateWorkHours()}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardDescription>Check In Time</CardDescription>
              <CardTitle className="text-2xl">{checkInTime ? formatTime(checkInTime) : '--:--:--'}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardDescription>Check Out Time</CardDescription>
              <CardTitle className="text-2xl">{checkOutTime ? formatTime(checkOutTime) : '--:--:--'}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Today's Activity */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Today&apos;s Activity</CardTitle>
            <CardDescription>Your check-in and check-out history for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
              {todayHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No activity recorded yet</p>
              ) : (
                todayHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          entry.type === 'check-in'
                            ? 'bg-green-500/10 text-green-600'
                            : 'bg-orange-500/10 text-orange-600'
                        }`}
                      >
                        {entry.type === 'check-in' ? <LogIn className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground capitalize">{entry.type.replace('-', ' ')}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {entry.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{entry.time}</p>
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

export default AmAttendancePage;
