import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Search', path: '/search', icon: <Search className="w-5 h-5" /> },
    { name: 'Companies', path: '/companies', icon: <Building2 className="w-5 h-5" /> },
    { name: 'Create Post', path: '/create', icon: <PlusCircle className="w-5 h-5" /> },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
    },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={cn(
        'w-60 h-screen sticky top-0 flex flex-col backdrop-blur-md',
        'bg-white/80 dark:bg-neutral-900/70 border-r border-border/50 shadow-sm'
      )}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <img src="/logo.png" alt="App Logo" className="w-8 h-8 rounded-md" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-brand-500 to-blue-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            Preppin
          </span>
        </Link>
      </div>

      <Separator className="opacity-60" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150',
                'hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary/10 text-primary shadow-inner'
                  : 'text-muted-foreground'
              )
            }
          >
            <div className="flex items-center justify-center w-5 h-5">{item.icon}</div>
            <span className="truncate">{item.name}</span>
            {item.badge && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-2 text-xs text-primary-foreground">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      {user && (
        <div className="p-3 mt-auto border-t border-border/50 bg-background/60 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <div className="text-sm font-medium text-foreground truncate max-w-[100px]">
                  {user.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">@{user.username}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent rounded-full"
              onClick={() => logout()}
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
