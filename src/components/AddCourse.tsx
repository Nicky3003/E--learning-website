import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Course, Topic } from '../App';

interface AddCourseProps {
  onBack: () => void;
  onAddCourse: (course: Course) => void;
}

export function AddCourse({ onBack, onAddCourse }: AddCourseProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: '',
    image: ''
  });

  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTopicChange = (field: string, value: string) => {
    setCurrentTopic(prev => ({ ...prev, [field]: value }));
  };

  const addTopic = () => {
    if (currentTopic.title && currentTopic.description && currentTopic.videoUrl && currentTopic.duration) {
      const newTopic: Topic = {
        id: `${Date.now()}-${topics.length + 1}`,
        ...currentTopic
      };
      setTopics(prev => [...prev, newTopic]);
      setCurrentTopic({ title: '', description: '', videoUrl: '', duration: '' });
    }
  };

  const removeTopic = (index: number) => {
    setTopics(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.instructor || topics.length === 0) {
      return;
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      instructor: formData.instructor,
      duration: formData.duration,
      level: formData.level,
      enrolled: 0,
      rating: 0,
      image: formData.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      topics
    };

    onAddCourse(newCourse);
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="space-y-2">
        <h1>Add New Course</h1>
        <p className="text-muted-foreground">
          Create a new course with topics and learning materials
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Course Information */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Basic details about your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter course description"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                  placeholder="Enter instructor name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g. 40 hours"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Course Image URL (Optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="Enter image URL"
                  type="url"
                />
              </div>
            </CardContent>
          </Card>

          {/* Course Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Course Topics</CardTitle>
              <CardDescription>Add learning topics to your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Topic Form */}
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="text-sm">Add New Topic</h4>
                
                <div className="space-y-2">
                  <Input
                    value={currentTopic.title}
                    onChange={(e) => handleTopicChange('title', e.target.value)}
                    placeholder="Topic title"
                  />
                </div>

                <div className="space-y-2">
                  <Textarea
                    value={currentTopic.description}
                    onChange={(e) => handleTopicChange('description', e.target.value)}
                    placeholder="Topic description"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={currentTopic.videoUrl}
                    onChange={(e) => handleTopicChange('videoUrl', e.target.value)}
                    placeholder="YouTube video ID"
                  />
                  <Input
                    value={currentTopic.duration}
                    onChange={(e) => handleTopicChange('duration', e.target.value)}
                    placeholder="Duration (e.g. 2 hours)"
                  />
                </div>

                <Button type="button" size="sm" onClick={addTopic} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Topic
                </Button>
              </div>

              {/* Topics List */}
              {topics.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm">Course Topics ({topics.length})</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {topics.map((topic, index) => (
                      <div key={topic.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{index + 1}</Badge>
                            <span className="text-sm">{topic.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {topic.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Duration: {topic.duration}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTopic(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" disabled={!formData.title || !formData.description || !formData.instructor || topics.length === 0}>
            Create Course
          </Button>
        </div>
      </form>
    </div>
  );
}