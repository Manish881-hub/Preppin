import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowUp, Calendar, Bell } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { cn } from '@/lib/utils';
import { type Notification } from '@/store/store';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-brand-400" />;
      case 'upvote':
        return <ArrowUp className="h-5 w-5 text-brand-400" />;
      case 'interview':
        return <Calendar className="h-5 w-5 text-brand-400" />;
      case 'system':
      default:
        return <Bell className="h-5 w-5 text-brand-400" />;
    }
  };

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      className={cn(
        "p-4 cursor-pointer transition-colors hover:bg-muted/40",
        !notification.read && "bg-brand-50 dark:bg-brand-900/10"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 bg-brand-100 dark:bg-brand-900/20 p-2 rounded-full">
          {getIcon()}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <p className="text-sm">
              {notification.relatedPostId ? (
                <Link
                  to={`/post/${notification.relatedPostId}`}
                  className="text-foreground hover:text-primary"
                >
                  {notification.message}
                </Link>
              ) : (
                notification.message
              )}
            </p>

            {!notification.read && (
              <span className="h-2 w-2 rounded-full bg-brand-500 flex-shrink-0 mt-1.5"></span>
            )}
          </div>

          <div className="text-xs text-muted-foreground mt-1">
            {formatDistance(new Date(notification.createdAt), new Date(), { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;