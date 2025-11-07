import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Star, Users, Clock, Search } from 'lucide-react';
import { Course } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseListProps {
  onCourseSelect: (course: Course) => void;
  courses: Course[];
}

export function CourseList({ onCourseSelect, courses }: CourseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || course.level.toLowerCase() === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl">All Courses</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our comprehensive collection of courses designed to help you master new skills and advance your career.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <CardHeader className="p-0">
              <ImageWithFallback
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{course.level}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                </div>
                
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">{course.description}</CardDescription>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.enrolled.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm">by {course.instructor}</p>
                  <Button 
                    onClick={() => onCourseSelect(course)}
                    size="sm"
                  >
                    View Course
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setLevelFilter('all');
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Course Stats */}
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl mb-1">{courses.length}</div>
            <div className="text-sm text-muted-foreground">Total Courses</div>
          </div>
          <div>
            <div className="text-2xl mb-1">
              {courses.reduce((acc, course) => acc + course.enrolled, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Students Enrolled</div>
          </div>
          <div>
            <div className="text-2xl mb-1">
              {courses.length > 0 ? (courses.reduce((acc, course) => acc + course.rating, 0) / courses.length).toFixed(1) : '0.0'}
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl mb-1">
              {courses.reduce((acc, course) => acc + course.topics.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Lessons</div>
          </div>
        </div>
      </div>
    </div>
  );
}