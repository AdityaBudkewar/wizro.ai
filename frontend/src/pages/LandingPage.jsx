import { BarChart3, Users, Ticket, Clock, UserCog, ArrowRight, CheckCircle, Menu, X, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const modules = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Project Management',
      description: 'Manage projects, tasks, timelines and team collaboration',
      features: ['Task Management', 'Team Collaboration', 'Gantt Charts', 'File Sharing'],
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'HR Management',
      description: 'Employee management, payroll, performance and recruitment',
      features: ['Employee Records', 'Leave Management', 'Payroll Processing', 'Recruitment'],
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
    },
    {
      icon: <Ticket className="w-8 h-8" />,
      title: 'Ticket Management',
      description: 'Support tickets, issue tracking and customer queries',
      features: ['Issue Tracking', 'SLA Monitoring', 'Priority Management', 'Customer Support'],
      color: 'bg-pink-50 border-pink-200',
      iconColor: 'text-pink-600',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Attendance Management',
      description: 'Track employee attendance, shifts and working hours',
      features: ['Clock In/Out', 'Leave Tracking', 'Shift Scheduling', 'Reports'],
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
    },
    {
      icon: <UserCog className="w-8 h-8" />,
      title: 'User Management',
      description: 'Manage users, roles, permissions and access control',
      features: ['User Accounts', 'Permissions', 'Role Management', 'Access Control'],
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
    },
  ];

  const benefits = [
    'Streamline operations with integrated modules',
    'Real-time collaboration and tracking',
    'Comprehensive reporting and analytics',
    'Scalable for businesses of all sizes',
    'Secure and reliable cloud platform',
    '24/7 customer support',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                KosquTrack
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition">
                Features
              </a>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate('/login')}
              >
                Get Started
              </Button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-slate-600 hover:text-slate-900">
                Features
              </a>
              <a href="#modules" className="block text-slate-600 hover:text-slate-900">
                Modules
              </a>
              <a href="#pricing" className="block text-slate-600 hover:text-slate-900">
                Pricing
              </a>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">All-in-One Business Management</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Manage Everything
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              In One Place
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            KosquTrack brings together project management, HR, ticketing, attendance, and user management into one
            powerful platform. Streamline your operations and boost productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
              onClick={() => navigate('/register')}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-slate-900">10K+</div>
              <div className="text-sm text-slate-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">99.9%</div>
              <div className="text-sm text-slate-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">5★</div>
              <div className="text-sm text-slate-600">Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Powerful Features for Every Need</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Integrated tools designed to help your business operate smoothly and efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Card
                key={index}
                className={`${module.color} border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-xl ${module.color} flex items-center justify-center ${module.iconColor} mb-4`}
                  >
                    {module.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{module.title}</CardTitle>
                  <CardDescription className="text-slate-600">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-700 mb-3">KEY FEATURES</div>
                    <div className="grid grid-cols-2 gap-2">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" className={`w-full mt-4 ${module.iconColor} hover:bg-white/50`}>
                    Open Module
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose KosquTrack?</h2>
              <p className="text-lg text-slate-600 mb-8">
                We&apos;ve built the most comprehensive business management platform to help you focus on what matters
                most - growing your business.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
                      <div>
                        <div className="font-semibold text-slate-900">Dashboard Overview</div>
                        <div className="text-sm text-slate-600">Real-time insights</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">↑ 24%</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Active Projects</div>
                      <div className="text-2xl font-bold text-slate-900">127</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Team Members</div>
                      <div className="text-2xl font-bold text-slate-900">48</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Tasks Done</div>
                      <div className="text-2xl font-bold text-slate-900">1,247</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Tickets Solved</div>
                      <div className="text-2xl font-bold text-slate-900">892</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies already using KosquTrack to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-black hover:bg-white/10 text-lg px-8"
            >
              Contact Sales
            </Button>
          </div>
          <p className="text-blue-100 mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">KosquTrack</span>
              </div>
              <p className="text-sm">All-in-one business management platform for modern teams.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <div className="space-y-2 text-sm">
                <div>Features</div>
                <div>Pricing</div>
                <div>Security</div>
                <div>Roadmap</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <div className="space-y-2 text-sm">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <div>Privacy</div>
                <div>Terms</div>
                <div>Security</div>
                <div>Compliance</div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2025 KosquTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
