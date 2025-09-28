import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import NotificationItem from '@/components/ui-custom/NotificationItem';
import useStore from '@/store/store';

const NotificationsPage: React.FC = () => {
  const {
    notifications,
    fetchNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount
  } = useStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <AppLayout>
      <div className="page-container animate-fade-in">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with activity on your posts and upcoming interviews
            </p>
          </div>

          {unreadNotificationsCount > 0 && (
            <Button
              variant="outline"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </header>

        <div className="bg-card rounded-lg border overflow-hidden">
          {notifications.length === 0 ? (
            // Loading skeleton
            <div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4 border-b last:border-b-0">
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={markNotificationAsRead}
                  />
                  {index < notifications.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          )}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No notifications yet</h3>
              <p className="text-muted-foreground mt-1">
                When you receive notifications, they'll appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;