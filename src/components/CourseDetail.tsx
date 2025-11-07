import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Star, Users, Clock, Play, CheckCircle, Lock } from 'lucide-react';
import { Course, Topic, User } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseDetailProps {
  course: Course;
  onTopicSelect: (topic: Topic) => void;
  selectedTopic: Topic | null;
  user: User | null;
}

export function CourseDetail({ course, onTopicSelect, selectedTopic, user }: CourseDetailProps) {
  const completedTopics = course.topics.filter(topic => topic.completed).length;
  const progressPercentage = (completedTopics / course.topics.length) * 100;
  const isEnrolled = user !== null; // In a real app, check if user is enrolled

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Video Player and Course Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Video Player */}
        <Card>
          <CardContent className="p-0">
            {selectedTopic ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedTopic.videoUrl}`}
                  title={selectedTopic.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-32 h-20 object-cover rounded mx-auto"
                  />
                  <div>
                    <p className="text-muted-foreground">Select a topic to start learning</p>
                    {!isEnrolled && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Enroll in the course to access video content
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Topic Info */}
        {selectedTopic && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedTopic.title}</CardTitle>
              <CardDescription>{selectedTopic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedTopic.duration}</span>
                </div>
                {selectedTopic.completed && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Course Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="text-base">{course.description}</CardDescription>
              </div>
              <Badge variant="secondary">{course.level}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolled.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
              <div className="space-y-1">
                <div>{course.topics.length}</div>
                <p className="text-xs text-muted-foreground">Lessons</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Course Progress</span>
                <span>{completedTopics}/{course.topics.length} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Instructor</p>
              <p>{course.instructor}</p>
            </div>

            {!isEnrolled ? (
              <Button className="w-full" size="lg">
                Enroll Now
              </Button>
            ) : (
              <Button variant="outline" className="w-full" size="lg">
                Continue Learning
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Course Topics */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              {course.topics.length} lessons • {course.duration}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {course.topics.map((topic, index) => (
                <div
                  key={topic.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-4 ${
                    selectedTopic?.id === topic.id 
                      ? 'border-l-primary bg-muted/30' 
                      : 'border-l-transparent'
                  }`}
                  onClick={() => isEnrolled && onTopicSelect(topic)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {topic.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : isEnrolled ? (
                        <Play className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${
                          !isEnrolled ? 'text-muted-foreground' : ''
                        }`}>
                          {index + 1}. {topic.title}
                        </p>
                        <span className="text-xs text-muted-foreground ml-2">
                          {topic.duration}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {!isEnrolled && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center space-y-4">
              <div>
                <h3 className="text-lg">Ready to start learning?</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant access to all course materials
                </p>
              </div>
              <Button className="w-full">
                Enroll Now
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}