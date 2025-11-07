import React from 'react';
import { Button } from './ui/button';
import { BookOpen, User, LogOut, Home, List, LayoutDashboard } from 'lucide-react';
import { User as UserType } from '../App';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: UserType | null;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, user, onLogout }: NavigationProps) {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl">EduLearn</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
              
              <Button
                variant={currentPage === 'courses' ? 'default' : 'ghost'}
                onClick={() => onNavigate('courses')}
                className="flex items-center space-x-2"
              >
                <List className="h-4 w-4" />
                <span>Courses</span>
              </Button>
              
              {user && (
                <Button
                  variant={currentPage.includes('dashboard') ? 'default' : 'ghost'}
                  onClick={() => onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
                  className="flex items-center space-x-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    {user.role}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </Button>
                <Button
                  onClick={() => onNavigate('signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}