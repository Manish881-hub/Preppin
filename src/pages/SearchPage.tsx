import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import useStore from '@/store/store';
import AppLayout from '@/components/layout/AppLayout';
import PostCard from '@/components/ui-custom/PostCard';
import CompanyCard from '@/components/ui-custom/CompanyCard';
import SearchBar from '@/components/ui-custom/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('posts');

  const {
    posts,
    companies,
    searchPosts,
    searchCompanies,
    searchResults,
    searchLoading,
    upvotePost,
    followCompany,
    unfollowCompany,
  } = useStore();

  // Handle search when query changes
  useEffect(() => {
    if (searchQuery) {
      if (activeTab === 'posts') {
        searchPosts(searchQuery);
      } else {
        searchCompanies(searchQuery);
      }
    }
  }, [searchQuery, activeTab, searchPosts, searchCompanies]);

  // Filter initial results based on query
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AppLayout>
      <div className="page-container animate-fade-in">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Search</h1>
          <p className="text-muted-foreground">
            Find interview experiences and companies
          </p>
        </header>

        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for companies, questions, posts..."
            fullWidth
          />
        </div>

        {searchQuery ? (
          <div>
            <Tabs
              defaultValue="posts"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="mb-6">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="companies">Companies</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-0">
                {searchLoading ? (
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
                ) : searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map(post => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onUpvote={upvotePost}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/30">
                    <Search className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No posts found</h3>
                    <p className="text-muted-foreground mt-1">
                      Try different keywords or check the companies tab
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="companies" className="mt-0">
                {searchLoading ? (
                  // Loading skeleton
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-full mt-2" />
                      </div>
                    ))}
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map(company => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        onFollow={followCompany}
                        onUnfollow={unfollowCompany}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/30">
                    <Search className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No companies found</h3>
                    <p className="text-muted-foreground mt-1">
                      Try different keywords or check the posts tab
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-24 border rounded-lg bg-muted/30">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Search for interview content</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a company name, job role, or keywords to find relevant posts and companies
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SearchPage;