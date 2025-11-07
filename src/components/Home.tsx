import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Users, Clock, ArrowRight } from 'lucide-react';
import { Course } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
  onCourseSelect: (course: Course) => void;
  courses: Course[];
}

export function Home({ onNavigate, onCourseSelect, courses }: HomeProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl">
            Learn. Build. Grow.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master in-demand skills with our comprehensive online courses. From web development to algorithms, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              size="lg" 
              onClick={() => onNavigate('courses')}
              className="flex items-center space-x-2"
            >
              <span>Explore Courses</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('signup')}
            >
              Get Started Free
            </Button>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTY3ODEwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Online learning"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Featured Courses */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl">Featured Courses</h2>
          <p className="text-muted-foreground">Start your learning journey with our most popular courses</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onCourseSelect(course)}
            >
              <CardHeader className="p-0">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{course.level}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.enrolled.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm">by {course.instructor}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('courses')}
            className="flex items-center space-x-2"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 rounded-lg p-8 md:p-12">
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl">Why Choose EduLearn?</h2>
            <p className="text-muted-foreground">Learn at your own pace with our comprehensive platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3>Self-Paced Learning</h3>
                <p className="text-sm text-muted-foreground">Learn at your own speed with lifetime access to course materials</p>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3>Expert Instructors</h3>
                <p className="text-sm text-muted-foreground">Learn from industry professionals with years of experience</p>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3>Quality Content</h3>
                <p className="text-sm text-muted-foreground">High-quality video lessons and practical projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}