import React, { useState } from 'react';
import { Search, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'facebook',
  ]);
  const navigate = useNavigate();

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
      }
      // Navigate to search page with query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onOpenChange(false);
    }
  };

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    handleSearch(searchQuery);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-background">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold">Search</DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center">
              <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="pl-10 h-12 rounded-lg border-border"
                autoFocus
              />
            </div>
          </form>

          {recentSearches.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Recent Searches</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearRecentSearches}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="flex items-center w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <Search className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;