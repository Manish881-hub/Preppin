import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpCircle, MessageCircle, Repeat, Bookmark, MoreHorizontal, Share2, Lock } from 'lucide-react';
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
        'overflow-hidden transition-all duration-200',
        'border border-slate-100 dark:border-slate-800 rounded-lg',
        'hover:shadow-glass hover:-translate-y-0.5',
        compact ? 'p-2' : ''
      )}
      aria-labelledby={`post-${post.id}-title`}
    >
      <CardContent className={cn('p-4', compact ? 'p-3' : 'p-4')}>
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar className={cn(compact ? 'h-9 w-9' : 'h-10 w-10')}>
              {post.author.avatar ? (
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
              ) : (
                <AvatarFallback>{post.author.name?.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <header className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    id={`post-${post.id}-title`}
                    className="text-sm font-semibold truncate text-foreground"
                  >
                    {post.author.name}
                  </h3>

                  <span className="text-xs text-muted-foreground">·</span>

                  <time
                    className="text-xs text-muted-foreground truncate"
                    dateTime={new Date(post.createdAt).toISOString()}
                    title={new Date(post.createdAt).toLocaleString()}
                  >
                    {timeLabel}
                  </time>
                </div>

                {/* company badge on same line (small) */}
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {post.company}
                  </Badge>
                </div>
              </div>

              {/* menu / more */}
              <div className="ml-2 flex items-start">
                <button
                  aria-label="More"
                  title="More"
                  className="inline-flex p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </header>

            {/* Title */}
            <Link to={`/post/${post.id}`} className="block mt-2 hover:no-underline">
              <h4 className="font-semibold text-base leading-snug transition-colors hover:text-primary truncate">
                {post.title}
              </h4>

              {/* Content snippet */}
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {post.content}
              </p>

              {/* Tags & premium */}
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {post.tags?.length > 0 &&
                  post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}

                {post.isPremium && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Premium</span>
                  </div>
                )}
              </div>
            </Link>

            {/* Actions */}
            <div className="mt-3 flex items-center gap-4 pt-3 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 gap-1.5 text-muted-foreground hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onUpvote(post.id);
                }}
                aria-label="Upvote"
                title="Upvote"
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

              <button
                className="inline-flex items-center gap-1.5 h-8 px-2 rounded-md text-muted-foreground hover:text-primary"
                onClick={(e) => e.preventDefault()}
                title="Share"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>

              <div className="ml-auto flex items-center gap-2">
                <button
                  className="inline-flex items-center p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="More actions"
                >
                  <Repeat className="h-4 w-4 text-muted-foreground" />
                </button>

                <button
                  className="inline-flex items-center p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Bookmark"
                >
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
