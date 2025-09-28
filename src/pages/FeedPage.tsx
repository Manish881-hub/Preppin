import React, { useEffect } from 'react';
import useStore from '@/store/store';
import AppLayout from '@/components/layout/AppLayout';
import PostCard from '@/components/ui-custom/PostCard';
import SearchBar from '@/components/ui-custom/SearchBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const FeedPage: React.FC = () => {
  const {
    posts,
    filteredPosts,
    selectedCompany,
    fetchPosts,
    postsLoading,
    upvotePost,
    resetFilters
  } = useStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <AppLayout>
      <div className="page-container animate-fade-in">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {selectedCompany ? `${selectedCompany.name} Posts` : 'All Posts'}
          </h1>
          <p className="text-muted-foreground">
            Browse through interview experiences and questions
          </p>
        </header>

        <div className="mb-6">
          <SearchBar
            fullWidth
            placeholder="Search for posts..."
          />
        </div>

        {selectedCompany && (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={resetFilters}
            >
              Clear company filter
            </Button>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="premium">Premium Only</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {postsLoading ? (
              // Loading skeleton
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="pt-2 flex justify-between">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onUpvote={upvotePost}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/30">
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="text-muted-foreground mt-1">
                  {selectedCompany
                    ? `No interview experiences for ${selectedCompany.name} yet`
                    : "No interview experiences have been shared yet"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="premium" className="mt-0">
            {postsLoading ? (
              // Loading skeleton
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="pt-2 flex justify-between">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts
                  .filter(post => post.isPremium)
                  .map(post => (
                    <PostCard
                      key={`premium-${post.id}`}
                      post={post}
                      onUpvote={upvotePost}
                    />
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default FeedPage;