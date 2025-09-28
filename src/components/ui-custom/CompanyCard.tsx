import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, User, FileText, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { type Company } from '@/store/store';

interface CompanyCardProps {
  company: Company;
  onFollow: (id: string) => void;
  onUnfollow: (id: string) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onFollow, onUnfollow }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center overflow-hidden border">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <Building2 className="w-6 h-6 text-muted-foreground" />
            )}
          </div>

          <div>
            <Link to={`/company/${company.id}`}>
              <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                {company.name}
              </h3>
            </Link>

            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{company.followersCount.toLocaleString()} followers</span>
              </div>

              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{company.postsCount.toLocaleString()} posts</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t py-3">
        {company.isFollowing ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onUnfollow(company.id)}
          >
            <Check className="h-4 w-4 mr-2" />
            Following
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={() => onFollow(company.id)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Follow
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;