import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { APP_NAME } from '@/config/env';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Search, Briefcase, Users, CheckCircle } from 'lucide-react';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<string>('discover');
  const [showEmailDialog, setShowEmailDialog] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleGetStarted = () => {
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = () => {
    // In production, this would send the email to the backend
    navigate('/home');
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background z-0" />

        <div className="relative z-10 container mx-auto px-4 pt-8 pb-20">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center">
              <img src="/logo.png" alt={APP_NAME} className="h-10 w-10 rounded-xl" />
              <h1 className="text-2xl font-bold ml-2">{APP_NAME}</h1>
            </div>
            <Button variant="ghost" onClick={handleSkip}>Skip</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Find the right company based on interview experiences
              </h1>
              <p className="text-xl text-muted-foreground">
                Join millions of users who use {APP_NAME} to discover company interview insights, share experiences, and advance their careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={handleGetStarted} className="px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Trusted by over 50,000 job seekers</span>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional using laptop"
                className="rounded-lg shadow-xl transform rotate-1 object-cover h-[500px] w-full"
              />
              <Card className="absolute -bottom-6 -left-6 w-64 animate-fade-in shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Real interview insights</p>
                      <p className="text-sm text-muted-foreground">Verified by our community</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How {APP_NAME} helps you prepare</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the inside scoop on interviews at top companies and boost your confidence
          </p>
        </div>

        <Tabs
          defaultValue="discover"
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="prepare">Prepare</TabsTrigger>
            <TabsTrigger value="connect">Connect</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-8 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                    alt="Woman searching for interview experiences"
                    className="rounded-md shadow-lg mx-auto w-full max-w-md"
                  />
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-block rounded-full bg-primary/10 p-2 mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Discover interview experiences</h3>
                <p className="text-muted-foreground">
                  Browse through thousands of real interview experiences shared by professionals who have gone through the process.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Filter by company, role, and more</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Read actual interview questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>See difficulty ratings and outcomes</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prepare" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-primary/10 p-2 mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Prepare with confidence</h3>
                <p className="text-muted-foreground">
                  Get ready for your interviews with insights from candidates who have been through the process.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Learn common interview patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Understand company interview processes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Practice with real questions</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-8 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                    alt="Person preparing for interviews"
                    className="rounded-md shadow-lg mx-auto w-full max-w-md"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connect" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-8 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                    alt="People connecting"
                    className="rounded-md shadow-lg mx-auto w-full max-w-md"
                  />
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-block rounded-full bg-primary/10 p-2 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Connect with professionals</h3>
                <p className="text-muted-foreground">
                  Join a community of professionals sharing their experiences and helping each other succeed.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Follow companies you're interested in</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Share your own interview experiences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Get notified about new experiences</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Testimonials Section */}
      <div className="bg-slate-50 dark:bg-slate-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What our users say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who trust {APP_NAME} for their interview preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "I was able to ace my Google interview thanks to the real experiences shared by others on this platform.",
                author: "Alex Thompson",
                title: "Software Engineer"
              },
              {
                quote: "The interview questions I found here were almost identical to what I was asked in my actual interview. Incredibly helpful!",
                author: "Priya Sharma",
                title: "Product Manager"
              },
              {
                quote: "Being able to see what others experienced during their interviews at my dream company gave me the confidence I needed.",
                author: "Michael Chen",
                title: "Data Scientist"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to ace your next interview?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join {APP_NAME} today and get access to thousands of interview experiences from top companies.
        </p>
        <Button size="lg" className="px-8" onClick={handleGetStarted}>
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create your account</DialogTitle>
            <DialogDescription>
              Enter your email to get started with {APP_NAME}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEmailSubmit}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingPage;
