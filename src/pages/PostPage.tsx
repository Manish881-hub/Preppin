import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpCircle, MessageCircle, Share2, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import useStore from '@/store/store';
import AppLayout from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDistance } from 'date-fns';

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts, selectPost, selectedPost, upvotePost } = useStore();
  const { user } = useAuth();
  const isPremium = user?.subscription === 'premium';

  useEffect(() => {
    if (postId) {
      selectPost(postId);
    }
  }, [postId, selectPost]);

  if (!selectedPost) {
    return (
      <AppLayout>
        <div className="page-container animate-fade-in flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Post not found</h2>
            <p className="text-muted-foreground mt-2">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const {
    title,
    content,
    company,
    questions,
    isPremium: isPostPremium,
    upvotes,
    comments,
    createdAt,
    author,
    tags
  } = selectedPost;

  return (
    <AppLayout>
      <div className="page-container animate-fade-in max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to feed
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {/* Post header */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
                  </div>
                </div>
              </div>
              <Badge variant="outline">{company}</Badge>
            </div>

            <h1 className="text-3xl font-bold mt-6 mb-2">{title}</h1>

            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Post content */}
          <Card>
            <CardContent className="pt-6">
              <p className="whitespace-pre-line">{content}</p>
            </CardContent>
          </Card>

          {/* Interview questions section */}
          <Card className={isPostPremium && !isPremium ? "relative overflow-hidden" : ""}>
            <CardHeader>
              <CardTitle className="text-xl">Interview Questions</CardTitle>
            </CardHeader>

            <CardContent>
              {isPostPremium && !isPremium ? (
                <>
                  <div className="blur-sm pointer-events-none">
                    <ol className="list-decimal list-inside space-y-4 pl-1">
                      {questions.map((question, index) => (
                        <li key={index} className="text-foreground">
                          {question}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <Lock className="h-8 w-8 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-2">Premium Content</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center px-6">
                      Subscribe to unlock all premium interview questions
                    </p>
                    <Button asChild>
                      <Link to="/subscription">Subscribe Now</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <ol className="list-decimal list-inside space-y-4 pl-1">
                  {questions.map((question, index) => (
                    <li key={index} className="text-foreground">
                      {question}
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => upvotePost(selectedPost.id)}
            >
              <ArrowUpCircle className="h-5 w-5" />
              <span>{upvotes} Upvotes</span>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>{comments} Comments</span>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>

          <Separator />

          {/* Comments section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {isPostPremium && !isPremium ? (
              <Card className="border-dashed bg-muted/40">
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <Lock className="h-8 w-8 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-2">Comments are locked</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md">
                    Subscribe to view and post comments on premium content
                  </p>
                  <Button asChild>
                    <Link to="/subscription">Subscribe Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-8 border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PostPage;