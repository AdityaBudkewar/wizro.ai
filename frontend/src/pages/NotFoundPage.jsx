import { Home, AlertTriangle, Search, ArrowLeft } from 'lucide-react';
import React from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-2xl">
      {/* Main Error Card */}
      <Card className="text-center shadow-2xl border-0 bg-white/80 backdrop-blur-lg mb-8">
        <CardHeader className="pb-6">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Search className="w-16 h-16 text-blue-600" />
          </div>
          <CardTitle className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            404
          </CardTitle>
          <CardDescription className="text-2xl font-semibold text-slate-700 mb-2">Oops! Page Not Found</CardDescription>
          <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have taken a detour into the digital void.
          </p>
        </CardHeader>

        <CardContent className="space-y-8 pb-8">
          <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 max-w-lg mx-auto">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-amber-800 font-medium">
              The requested URL could not be found on this server.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => (window.location.href = '/login')}
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default NotFoundPage;
