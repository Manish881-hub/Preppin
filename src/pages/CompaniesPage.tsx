import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import AppLayout from '@/components/layout/AppLayout';
import CompanyCard from '@/components/ui-custom/CompanyCard';
import SearchBar from '@/components/ui-custom/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const CompaniesPage: React.FC = () => {
  const {
    companies,
    followedCompanies,
    fetchCompanies,
    companiesLoading,
    followCompany,
    unfollowCompany,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [filteredFollowedCompanies, setFilteredFollowedCompanies] = useState(followedCompanies);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    // Filter companies based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredCompanies(
        companies.filter(company =>
          company.name.toLowerCase().includes(query)
        )
      );
      setFilteredFollowedCompanies(
        followedCompanies.filter(company =>
          company.name.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredCompanies(companies);
      setFilteredFollowedCompanies(followedCompanies);
    }
  }, [companies, followedCompanies, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <AppLayout>
      <div className="page-container animate-fade-in">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Companies</h1>
          <p className="text-muted-foreground">
            Follow companies to stay updated with their interview experiences
          </p>
        </header>

        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search companies..."
            fullWidth
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Companies</TabsTrigger>
            <TabsTrigger
              value="following"
              disabled={followedCompanies.length === 0}
            >
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {companiesLoading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
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
            ) : filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map(company => (
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
                <h3 className="text-lg font-medium">No companies found</h3>
                <p className="text-muted-foreground mt-1">
                  Try a different search term
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="following" className="mt-0">
            {companiesLoading ? (
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
            ) : filteredFollowedCompanies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFollowedCompanies.map(company => (
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
                <h3 className="text-lg font-medium">No followed companies</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery
                    ? "No followed companies match your search"
                    : "Follow some companies to see them here"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CompaniesPage;