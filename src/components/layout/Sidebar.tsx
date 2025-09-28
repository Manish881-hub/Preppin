import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Home, Building2, PlusCircle, Bell, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import useStore from '@/store/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { unreadNotificationsCount } = useStore();
  const location = useLocation();

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home className="w-5 h-5" />
    },
    {
      name: 'Search',
      path: '/search',
      icon: <Search className="w-5 h-5" />
    },
    {
      name: 'Companies',
      path: '/companies',
      icon: <Building2 className="w-5 h-5" />
    },
    {
      name: 'Create Post',
      path: '/create',
      icon: <PlusCircle className="w-5 h-5" />
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-background border-r border-border">
      {/* Sidebar Header */}
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="App Logo" className="w-8 h-8 rounded-md" />
          <span className="font-extrabold text-2xl/none bg-gradient-to-r from-brand-500 to-cyan-500 bg-clip-text text-transparent animate-gradient underline underline-offset-4 decoration-2 decoration-brand-200/30">
  Preppin
</span>
        </Link>
      </div>

      <Separator />

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center text-sm px-3 py-2.5 rounded-md group transition-colors",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-2 text-xs text-primary-foreground">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      {user && (
        <div className="p-3 mt-auto">
          <Separator className="mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">@{user.username}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => logout()}
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
