import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type Company } from '@/store/store';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CompanyCardProps {
  company: Company;
  onFollow: (id: string) => void;
  onUnfollow: (id: string) => void;
  variant?: 'grid' | 'list';
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onFollow,
  onUnfollow,
  variant = 'grid'
}) => {
  const isFollowing = company.isFollowing;

  // List Variant (Sidebar style)
  if (variant === 'list') {
    return (
      <div className="flex items-center justify-between py-2 group">
        <div className="flex items-center gap-3 min-w-0">
          <Link to={`/company/${company.id}`} className="flex-shrink-0">
            <Avatar className="h-10 w-10 border border-border/50 rounded-lg">
              <AvatarImage src={company.logo} alt={company.name} className="object-contain p-1" />
              <AvatarFallback className="rounded-lg">
                {company.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="min-w-0 flex-1">
            <Link to={`/company/${company.id}`} className="block">
              <h4 className="font-semibold text-sm truncate leading-none mb-1 group-hover:text-primary transition-colors">
                {company.name}
              </h4>
            </Link>
            <p className="text-xs text-muted-foreground truncate">
              {company.followersCount.toLocaleString()} followers
            </p>
          </div>
        </div>

        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          className={cn(
            "h-8 px-3 ml-2 rounded-full text-xs font-medium transition-all",
            isFollowing
              ? "hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
              : "hover:bg-primary/90"
          )}
          onClick={(e) => {
            e.preventDefault();
            isFollowing ? onUnfollow(company.id) : onFollow(company.id);
          }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>
    );
  }

  // Grid Variant (Full Card)
  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-all duration-300 group border-border/60">
      <div className="p-5 flex flex-col items-center text-center">
        <div className="mb-4 relative">
          <div className="w-16 h-16 rounded-xl border bg-background flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
        </div>

        <Link to={`/company/${company.id}`} className="block mb-1">
          <h3 className="font-bold text-lg hover:text-primary transition-colors">
            {company.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-4">
          {company.followersCount.toLocaleString()} followers
        </p>

        <Button
          variant={isFollowing ? "secondary" : "default"}
          className="w-full rounded-full"
          onClick={() => isFollowing ? onUnfollow(company.id) : onFollow(company.id)}
        >
          {isFollowing ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Following
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Follow
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default CompanyCard;