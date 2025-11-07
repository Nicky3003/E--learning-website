import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, X, Save } from 'lucide-react';
import { Course, Topic } from '../App';

interface EditCourseProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCourse: (course: Course) => void;
}

export function EditCourse({ course, isOpen, onClose, onUpdateCourse }: EditCourseProps) {
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

  // Initialize form data when course changes
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        duration: course.duration,
        level: course.level,
        image: course.image
      });
      setTopics([...course.topics]);
    }
  }, [course]);

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

  const updateTopic = (index: number, updatedTopic: Partial<Topic>) => {
    setTopics(prev => prev.map((topic, i) => 
      i === index ? { ...topic, ...updatedTopic } : topic
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!course || !formData.title || !formData.description || !formData.instructor || topics.length === 0) {
      return;
    }

    const updatedCourse: Course = {
      ...course,
      title: formData.title,
      description: formData.description,
      instructor: formData.instructor,
      duration: formData.duration,
      level: formData.level,
      image: formData.image,
      topics
    };

    onUpdateCourse(updatedCourse);
    onClose();
  };

  const handleClose = () => {
    setCurrentTopic({ title: '', description: '', videoUrl: '', duration: '' });
    onClose();
  };

  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Update course information and manage topics
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Course Info</TabsTrigger>
              <TabsTrigger value="topics">Topics ({topics.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Course Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-instructor">Instructor</Label>
                <Input
                  id="edit-instructor"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input
                    id="edit-duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger>
                      <SelectValue />
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
                <Label htmlFor="edit-image">Course Image URL</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  type="url"
                />
              </div>
            </TabsContent>

            <TabsContent value="topics" className="space-y-4">
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
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {topics.map((topic, index) => (
                  <div key={topic.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{index + 1}</Badge>
                        <Input
                          value={topic.title}
                          onChange={(e) => updateTopic(index, { title: e.target.value })}
                          className="text-sm"
                          placeholder="Topic title"
                        />
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
                    
                    <Textarea
                      value={topic.description}
                      onChange={(e) => updateTopic(index, { description: e.target.value })}
                      placeholder="Topic description"
                      rows={2}
                      className="text-xs"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={topic.videoUrl}
                        onChange={(e) => updateTopic(index, { videoUrl: e.target.value })}
                        placeholder="YouTube video ID"
                        className="text-xs"
                      />
                      <Input
                        value={topic.duration}
                        onChange={(e) => updateTopic(index, { duration: e.target.value })}
                        placeholder="Duration"
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.title || !formData.description || !formData.instructor || topics.length === 0}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}