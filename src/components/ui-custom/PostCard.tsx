import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpCircle, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Post } from '@/store/store';
import { cn } from '@/lib/utils';
import { formatDistance } from 'date-fns';

interface PostCardProps {
  post: Post;
  onUpvote: (id: string) => void;
  compact?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpvote, compact = false }) => {
  const timeLabel = formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true });

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 border border-border/60 bg-card hover:border-primary/20',
        compact ? 'p-0 shadow-none border-0 bg-transparent' : 'rounded-xl hover:shadow-lg hover:shadow-primary/5'
      )}
    >
      <CardContent className={cn('p-5', compact ? 'p-0' : '')}>
        <div className="flex gap-4">
          <Link to={`/profile/${post.author.id}`} className="flex-shrink-0">
            <Avatar className={cn('border border-border/50', compact ? 'h-10 w-10' : 'h-11 w-11')}>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0">
            {/* Header: Name, Company, Date */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link
                  to={`/profile/${post.author.id}`}
                  className="font-semibold text-foreground hover:underline decoration-primary/50 underline-offset-2"
                >
                  {post.author.name}
                </Link>
                {post.company && (
                  <>
                    <span>in</span>
                    <span className="font-medium text-foreground">{post.company}</span>
                  </>
                )}
                <span>•</span>
                <span className="text-xs">{timeLabel}</span>
              </div>
            </div>

            {/* Content Link */}
            <Link to={`/post/${post.id}`} className="block group-hover:opacity-95 transition-opacity">
              <h3 className="text-lg font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-muted-foreground text-[15px] leading-relaxed line-clamp-3 mb-3">
                {post.content}
              </p>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-md font-normal px-2 bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.isPremium && (
                    <Badge variant="default" className="rounded-md px-2 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 shadow-none">
                      Premium
                    </Badge>
                  )}
                </div>
              )}
            </Link>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full px-3 h-9 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 group/btn",
                    post.upvotes > 0 ? "text-muted-foreground" : ""
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    onUpvote(post.id);
                  }}
                >
                  <ArrowUpCircle className="h-[18px] w-[18px] group-hover/btn:scale-110 transition-transform" />
                  <span className="font-medium">{post.upvotes > 0 ? post.upvotes : 'Upvote'}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-3 h-9 gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5 group/btn"
                  asChild
                >
                  <Link to={`/post/${post.id}#comments`}>
                    <MessageCircle className="h-[18px] w-[18px] group-hover/btn:scale-110 transition-transform" />
                    <span className="font-medium">{post.comments > 0 ? post.comments : 'Comment'}</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 text-muted-foreground hover:text-green-500 hover:bg-green-500/5"
                >
                  <Share2 className="h-[18px] w-[18px]" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 text-muted-foreground hover:text-orange-500 hover:bg-orange-500/5"
              >
                <Bookmark className="h-[18px] w-[18px]" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
