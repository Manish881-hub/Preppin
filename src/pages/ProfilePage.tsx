import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, CreditCard, DollarSign, User, Settings, FileText, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import useStore from '@/store/store';
import AppLayout from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { followedCompanies } = useStore();

  if (!user) {
    return null;
  }

  return (
    <AppLayout>
      <div className="page-container animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground mt-1">@{user.username}</p>

                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  {user.interests?.map((interest: string) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button variant="secondary" size="sm" onClick={logout}>
                  Log out
                </Button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Account Details */}
            <div className="md:col-span-1 space-y-6">
              {/* Wallet Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-brand-500" />
                    Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Balance</div>
                      <div className="text-2xl font-bold flex items-center">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {user.walletBalance || 0}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/wallet">Add funds</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-brand-500" />
                    Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-1">Current Plan</div>
                  <div className="flex items-center justify-between">
                    <Badge variant={user.subscription === 'premium' ? "default" : "outline"}>
                      {user.subscription === 'premium' ? 'Premium' : 'Free'}
                    </Badge>

                    <Button size="sm" asChild>
                      <Link to="/subscription">
                        {user.subscription === 'premium' ? 'Manage' : 'Upgrade'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Followed Companies */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-brand-500" />
                    Following
                  </CardTitle>
                  <CardDescription>
                    Companies you're following
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {followedCompanies.length > 0 ? (
                    <div className="space-y-3">
                      {followedCompanies.slice(0, 3).map(company => (
                        <div key={company.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center overflow-hidden border">
                              {company.logo ? (
                                <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" />
                              ) : (
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <span className="text-sm font-medium">{company.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {company.postsCount} posts
                          </Badge>
                        </div>
                      ))}

                      {followedCompanies.length > 3 && (
                        <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                          <Link to="/companies">View all ({followedCompanies.length})</Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">
                        You aren't following any companies yet
                      </p>
                      <Button variant="link" size="sm" className="mt-1" asChild>
                        <Link to="/companies">Browse companies</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column - Activity */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="h-5 w-5 mr-2 text-brand-500" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium">Name</div>
                      <div className="text-muted-foreground">{user.name}</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Username</div>
                      <div className="text-muted-foreground">@{user.username}</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-muted-foreground">{user.email}</div>
                    </div>

                    <Separator />

                    <div>
                      <div className="text-sm font-medium mb-2">Interests</div>
                      <div className="flex flex-wrap gap-2">
                        {user.interests?.map((interest) => (
                          <Badge key={interest} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-brand-500" />
                    Your Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      You haven't posted any questions or comments yet
                    </p>
                    <Button className="mt-4" asChild>
                      <Link to="/create">Create Your First Post</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;