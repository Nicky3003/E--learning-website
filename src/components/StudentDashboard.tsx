import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target, 
  Play, 
  CheckCircle,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { User, Course, mockCourses } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StudentDashboardProps {
  user: User;
  onCourseSelect: (course: Course) => void;
}

export function StudentDashboard({ user, onCourseSelect }: StudentDashboardProps) {
  // Mock enrolled courses for demo
  const enrolledCourses = mockCourses.map(course => ({
    ...course,
    progress: course.id === '1' ? 65 : 30,
    lastWatched: course.id === '1' ? '2 days ago' : '1 week ago',
    nextLesson: course.topics[course.id === '1' ? 2 : 1]
  }));

  const stats = [
    {
      title: 'Courses Enrolled',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'text-blue-600'
    },
  {
    title: 'Hours Learned',
    value: 28,
    icon: Clock,
    color: 'text-green-600'
  },
  {
    title: 'Certificates',
    value: 0,
    icon: Trophy,
    color: 'text-yellow-600'
  },
  {
    title: 'Streak Days',
    value: 7,
    icon: Target,
    color: 'text-purple-600'
  }
  ];

  const recentActivity = [
    {
      action: 'Completed lesson',
      course: 'Web Development',
      lesson: 'CSS Styling',
      time: '2 hours ago'
    },
    {
      action: 'Started watching',
      course: 'Web Development',
      lesson: 'JavaScript Basics',
      time: '2 days ago'
    },
    {
      action: 'Enrolled in',
      course: 'Data Structure & Algorithm',
      lesson: null,
      time: '1 week ago'
    }
  ];
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">
          Continue your learning journey and track your progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <div>
                  <div className="text-2xl">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl">Continue Learning</h2>
            
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg">{course.title}</h3>
                          <Badge variant="outline">{course.progress}% Complete</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Last watched {course.lastWatched}
                        </p>
                      </div>
                      
                      <Progress value={course.progress} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Next: {course.nextLesson.title}
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onCourseSelect(course)}
                          >
                            View Course
                          </Button>
                          <Button 
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Play className="h-4 w-4" />
                            <span>Continue</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommended Courses */}
          <div className="space-y-4">
            <h2 className="text-xl">Recommended for You</h2>
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Complete more courses to get personalized recommendations</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Learning Streak</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl text-orange-600 mb-2">🔥</div>
                <div className="text-2xl">7 Days</div>
                <p className="text-sm text-muted-foreground">Keep it up!</p>
              </div>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center"
                  >
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">{activity.action}</span>
                      {activity.lesson && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{activity.lesson}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.course} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No scheduled lessons for today</p>
                <Button variant="link" size="sm" className="mt-2">
                  Plan your study time
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}