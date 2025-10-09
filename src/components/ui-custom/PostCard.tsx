import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpCircle, MessageCircle, Share2, Lock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { type Post } from '@/store/store';
import { cn } from '@/lib/utils';
import { formatDistance } from 'date-fns';

interface PostCardProps {
  post: Post;
  onUpvote: (id: string) => void;
  compact?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpvote, compact = false }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:bg-accent/50">
      <CardContent className="p-4">
        <Link to={`/post/${post.id}`} className="block space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm truncate">{post.author.name}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs flex-shrink-0">
              {post.company}
            </Badge>
          </div>

          <h3 className="font-semibold text-base leading-snug transition-colors hover:text-primary">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {post.content}
          </p>

          {post.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {post.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {post.isPremium && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              <span>Premium content</span>
            </div>
          )}
        </Link>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 gap-1.5 text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.preventDefault();
              onUpvote(post.id);
            }}
          >
            <ArrowUpCircle className="h-4 w-4" />
            <span className="text-xs">{post.upvotes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 gap-1.5 text-muted-foreground hover:text-primary"
            asChild
          >
            <Link to={`/post/${post.id}#comments`} onClick={(e) => e.stopPropagation()}>
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.comments}</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 gap-1.5 text-muted-foreground hover:text-primary ml-auto"
            onClick={(e) => e.preventDefault()}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;