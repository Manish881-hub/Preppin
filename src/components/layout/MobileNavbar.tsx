import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Building2, PlusCircle, Bell, User } from 'lucide-react';
import useStore from '@/store/store';
import { cn } from '@/lib/utils';

const MobileNavbar: React.FC = () => {
  const { unreadNotificationsCount } = useStore();

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home className="w-6 h-6" />
    },
    {
      name: 'Companies',
      path: '/companies',
      icon: <Building2 className="w-6 h-6" />
    },
    {
      name: 'Create',
      path: '/create',
      icon: <PlusCircle className="w-7 h-7" />,
      highlight: true
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <Bell className="w-6 h-6" />,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className="w-6 h-6" />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border h-16 glassmorphism">
      <div className="grid grid-cols-5 h-full">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center text-xs",
              isActive
                ? "text-primary"
                : "text-muted-foreground",
              item.highlight && "relative"
            )}
          >
            {({ isActive }) => (
              <>
                {item.highlight ? (
                  <div className="absolute -top-6 flex items-center justify-center w-12 h-12 rounded-full bg-brand-500 text-white shadow-lg">
                    {item.icon}
                  </div>
                ) : (
                  <div className={cn(
                    "flex items-center justify-center mb-1",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.icon}
                    {item.badge && (
                      <span className="absolute top-1 right-4 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-2 text-xs text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
                <span className={item.highlight ? "mt-6" : ""}>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavbar;
