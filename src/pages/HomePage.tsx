import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '@/store/store';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import SearchBar from '@/components/ui-custom/SearchBar';
import PostCard from '@/components/ui-custom/PostCard';
import CompanyCard from '@/components/ui-custom/CompanyCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const {
    posts,
    companies,
    followedCompanies,
    fetchPosts,
    fetchCompanies,
    postsLoading,
    companiesLoading,
    upvotePost,
    followCompany,
    unfollowCompany,
  } = useStore();
  const { user } = useAuth();

  // Fetch data on component mount
  useEffect(() => {
    fetchPosts();
    fetchCompanies();
  }, [fetchPosts, fetchCompanies]);

  // Filter posts based on followed companies
  const followedCompanyNames = followedCompanies.map(company => company.name);
  const relevantPosts = followedCompanyNames.length > 0
    ? posts.filter(post => followedCompanyNames.includes(post.company))
    : posts;

  // Get top posts sorted by upvotes and comments
  const topPosts = [...relevantPosts]
    .sort((a, b) => (b.upvotes + b.comments) - (a.upvotes + a.comments))
    .slice(0, 5);

  return (
    <AppLayout>
      <div className="home-page page-container animate-fade-in">
        <div className="home-wrapper flex flex-col space-y-6">
          {/* Header */}
            {/* Header */}
          <header className="home-header pt-2 pb-4">
            <div className="home-header-content flex items-center justify-between">
              <h1 className="home-title text-2xl font-bold">
                Welcome back{user?.name ? ', ' + user.name.split(' ')[0] : ''}
              </h1>
            </div>
            <p className="home-subtitle text-muted-foreground mt-1">
              Stay updated with the latest interview experiences
            </p>
          </header>

         {/* Search */}
          <div className="home-search mx-auto w-full max-w-xl">
            <SearchBar fullWidth />
          </div>

          {/* Content */}
          <div className="home-content grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Main content - Posts */}
            <div className="feed-container md:col-span-2 space-y-6">

              {/* Your Feed */}
              <section className="feed-section">
                <div className="feed-header flex items-center justify-between mb-4">
                  <h2 className="feed-title text-xl font-semibold">Your Feed</h2>
                  {followedCompanies.length > 0 && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/companies" className="feed-view-all">
                        View all followed
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>

                 {postsLoading ? (
                  // Loading skeleton
                  <div className="feed-skeleton space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="feed-skeleton-card border rounded-lg p-4 space-y-3">
                        <div className="feed-skeleton-header flex items-center space-x-2">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="feed-skeleton-user space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="feed-skeleton-actions pt-2 flex justify-between">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : relevantPosts.length > 0 ? (
                  <div className="feed-posts space-y-4">
                    {relevantPosts.slice(0, 5).map(post => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onUpvote={upvotePost}
                      />
                    ))}

                    <Button asChild className="feed-view-more w-full">
                      <Link to="/feed">View more posts</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="feed-empty text-center py-12 border rounded-lg bg-muted/30">
                    <h3 className="feed-empty-title text-lg font-medium">No posts in your feed yet</h3>
                    <p className="feed-empty-desc text-muted-foreground mt-1 mb-4">
                      Follow companies to see their interview experiences
                    </p>
                    <Button asChild>
                      <Link to="/companies">Browse Companies</Link>
                    </Button>
                  </div>
                )}
              </section>

               {/* Top Posts */}
              {topPosts.length > 0 && (
                <section className="top-posts-section">
                  <div className="top-posts-header flex items-center justify-between mb-4">
                    <h2 className="top-posts-title text-xl font-semibold">Top Posts</h2>
                    <Badge variant="outline">Popular</Badge>
                  </div>

                  <div className="top-posts-list space-y-4">
                    {topPosts.map(post => (
                      <PostCard
                        key={`top-${post.id}`}
                        post={post}
                        onUpvote={upvotePost}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

             {/* Sidebar - Companies */}
            <div className="sidebar space-y-6">

              {/* Followed Companies */}
              <section className="companies-section">
                <div className="companies-header flex items-center justify-between mb-4">
                  <h2 className="companies-title text-xl font-semibold">Companies</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/companies" className="companies-view-all">
                      View all
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {companiesLoading ? (
                  // Loading skeleton
                  <div className="companies-skeleton space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="companies-skeleton-card border rounded-lg p-4 space-y-3">
                        <div className="companies-skeleton-header flex items-center space-x-3">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="companies-skeleton-info space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-full mt-2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="companies-list space-y-4">
                    {companies.slice(0, 4).map(company => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        onFollow={followCompany}
                        onUnfollow={unfollowCompany}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;