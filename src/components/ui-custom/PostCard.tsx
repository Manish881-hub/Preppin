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
    <Card className={cn(
      "overflow-hidden transition-all duration-300",
      compact ? "border-0 shadow-none" : "card-hover"
    )}>
      <CardHeader className={cn(
        "space-y-0",
        compact ? "p-3" : "p-4"
      )}>
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm leading-none">{post.author.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
              </div>
            </div>
          </div>

          <Badge variant="outline" className="bg-background/80">
            {post.company}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className={cn(
        compact ? "p-3 pt-0" : "px-4 pb-3"
      )}>
        <Link to={`/post/${post.id}`} className="block">
          <h3 className={cn(
            "font-semibold text-foreground mb-2 transition-colors hover:text-primary",
            compact ? "text-base" : "text-lg"
          )}>
            {post.title}
          </h3>

          {!compact && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {post.content}
            </p>
          )}

          {!compact && (
            <div className="mt-3 space-x-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-secondary/50">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {!compact && post.isPremium && (
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Lock className="h-4 w-4 mr-1" />
              <span>Questions are locked. Subscribe to view</span>
            </div>
          )}
        </Link>
      </CardContent>

      <CardFooter className={cn(
        "flex justify-between border-t py-3",
        compact ? "px-3" : "px-4"
      )}>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
          onClick={() => onUpvote(post.id)}
        >
          <ArrowUpCircle className="h-5 w-5" />
          <span>{post.upvotes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-muted-foreground"
          asChild
        >
          <Link to={`/post/${post.id}#comments`}>
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments}</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-muted-foreground"
        >
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;