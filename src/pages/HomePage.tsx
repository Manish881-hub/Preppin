import React, { useEffect, useState, useCallback } from 'react';
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
import { ChevronRight, Loader2 } from 'lucide-react';

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
  const [displayedPosts, setDisplayedPosts] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  // Load more posts when user scrolls near bottom of the page
  const handleWindowScroll = useCallback(() => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;

    // Load more when user scrolls to 80% of the page
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      if (displayedPosts < relevantPosts.length && !isLoadingMore) {
        setIsLoadingMore(true);
        // Simulate loading delay (or call fetch for next page)
        setTimeout(() => {
          setDisplayedPosts(prev => Math.min(prev + 5, relevantPosts.length));
          setIsLoadingMore(false);
        }, 800);
      }
    }
  }, [displayedPosts, relevantPosts.length, isLoadingMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [handleWindowScroll]);

  return (
    <AppLayout>
      <div className="home-page page-container animate-fade-in">
        {/* Remove fixed height here so document body scrolls */}
        <div className="flex gap-6">
          {/* Left Container - Feed (no internal scroll) */}
          <div className="left-container flex-1 flex flex-col pr-2">
            <div className="home-wrapper flex flex-col space-y-6">
              {/* Header */}
              <header className="home-header pt-2 pb-4 sticky top-0 bg-background z-10">
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
              <div className="home-search mx-auto w-full max-w-xl sticky top-20 bg-background z-10 pb-2">
                <SearchBar fullWidth />
              </div>

              {/* Main content - Posts */}
              <div className="feed-container space-y-6 pb-6">
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
                      {/* Display posts with page-based infinite scroll */}
                      {relevantPosts.slice(0, displayedPosts).map(post => (
                        <PostCard
                          key={post.id}
                          post={post}
                          onUpvote={upvotePost}
                        />
                      ))}

                      {/* Loading more indicator */}
                      {isLoadingMore && (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          <span className="ml-2 text-muted-foreground">Loading more posts...</span>
                        </div>
                      )}

                      {/* End of posts message */}
                      {displayedPosts >= relevantPosts.length && relevantPosts.length > 5 && (
                        <div className="text-center py-6 text-muted-foreground">
                          <p>You've reached the end of your feed</p>
                          <Button asChild variant="link" className="mt-2">
                            <Link to="/feed">Explore all posts</Link>
                          </Button>
                        </div>
                      )}
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
                {topPosts.length > 0 && displayedPosts >= relevantPosts.length && (
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
            </div>
          </div>

          {/* Right Container - Companies Sidebar (no internal scroll) */}
          <div className="right-container w-[350px] bg-card border rounded-lg p-6 hidden md:block">
            <section className="companies-section sticky top-0">
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
                  {companies.slice(0, 6).map(company => (
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
    </AppLayout>
  );
};

export default HomePage;
