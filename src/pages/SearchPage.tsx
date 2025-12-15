import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import useStore from '@/store/store';
import AppLayout from '@/components/layout/AppLayout';
import PostCard from '@/components/ui-custom/PostCard';
import CompanyCard from '@/components/ui-custom/CompanyCard';
import SearchBar from '@/components/ui-custom/SearchBar';
import FilterSidebar, { FilterState } from '@/components/ui-custom/FilterSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('posts');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState('recent');

  const [filters, setFilters] = useState<FilterState>({
    roles: [],
    companies: [],
    difficulty: [],
    verdict: [],
  });

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

  // Load initial data if empty
  useEffect(() => {
    if (posts.length === 0) {
      useStore.getState().fetchPosts();
    }
  }, [posts.length]);

  // Handle search when query changes
  useEffect(() => {
    if (searchQuery) {
      if (activeTab === 'posts') {
        searchPosts(searchQuery);
      } else {
        searchCompanies(searchQuery);
      }
    } else {
      // If no search query, show all items (or handle as "Explore" mode)
      // For now, we manually set searchResults to all posts/companies to enable filtering
      if (activeTab === 'posts') {
        useStore.setState({ searchResults: posts, searchLoading: false });
      } else {
        useStore.setState({ searchResults: companies, searchLoading: false });
      }
    }
  }, [searchQuery, activeTab, searchPosts, searchCompanies, posts, companies]);

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

  // Client-side filtering logic
  const filteredResults = searchResults.filter((item) => {
    // Basic type check
    if (!item) return false;

    // If company tab, only apply company filters?
    // For now, let's focus logic on 'posts' since 'companies' usually just filters by name
    if (activeTab === 'companies') return true;

    // Filter by Role (mock logic: check if tag or title contains role)
    if (filters.roles.length > 0) {
      const matchRole = filters.roles.some(
        (role) =>
          item.title?.toLowerCase().includes(role.toLowerCase()) ||
          item.tags?.some((tag: string) =>
            tag.toLowerCase().includes(role.toLowerCase())
          )
      );
      if (!matchRole) return false;
    }

    // Filter by Company
    if (filters.companies.length > 0) {
      if (!filters.companies.includes(item.company)) return false;
    }

    // Filter by Difficulty (mock logic: random assign or check tags)
    // Since our sample data doesn't have difficulty, we skip this or mock it
    // For this demo, let's assume if 'Hard' is selected, we filter nothing (placeholder)

    return true;
  });

  // Sorting logic
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortOption === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortOption === 'popular') {
      // Assuming posts have upvotes, companies have followersCount
      const scoreA = a.upvotes || a.followersCount || 0;
      const scoreB = b.upvotes || b.followersCount || 0;
      return scoreB - scoreA;
    }
    return 0;
  });

  return (
    <AppLayout>
      <div className="page-container animate-fade-in pb-20">
        <header className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
            <p className="text-muted-foreground mt-1">
              Discover interview experiences, questions, and top tech companies
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search for roles, companies, questions..."
                fullWidth
                className="max-w-xl"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar filters={filters} onFilterChange={setFilters} />
                </SheetContent>
              </Sheet>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Tabs
              defaultValue="posts"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="companies">Companies</TabsTrigger>
                </TabsList>

                <div className="text-sm text-muted-foreground hidden sm:block">
                  Showing {sortedResults.length} results
                </div>
              </div>

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
                ) : sortedResults.length > 0 ? (
                  <div className="space-y-4">
                    {sortedResults.map(post => (
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
                      Try adjusting your filters or search keywords
                    </p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setFilters({ roles: [], companies: [], difficulty: [], verdict: [] });
                        setSearchQuery('');
                      }}
                      className="mt-2"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="companies" className="mt-0">
                {searchLoading ? (
                  // Loading skeleton
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                ) : sortedResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {sortedResults.map(company => (
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
          </main>
        </div>
      </div>
    </AppLayout>
  );
};

export default SearchPage;