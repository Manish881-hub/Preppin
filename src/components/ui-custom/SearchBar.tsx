import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for companies, questions...",
  fullWidth = false
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex items-center relative ${fullWidth ? 'w-full' : 'max-w-md'}`}
    >
      <div className={`relative flex items-center w-full group glassmorphism rounded-full overflow-hidden border border-border transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/50`}>
        <Search className="h-4 w-4 absolute left-3.5 text-muted-foreground" />

        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 rounded-full border-0 shadow-none bg-transparent focus-visible:ring-0"
        />

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 h-8 w-8"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;