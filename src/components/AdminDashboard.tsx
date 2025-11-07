import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Users, 
  BookOpen, 
  TrendingUp,
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react';
import { User, Course } from '../App';
import { EditCourse } from './EditCourse';

interface AdminDashboardProps {
  user: User;
  courses: Course[];
  onAddCourse: () => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

const recentStudents = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    joinDate: '2024-01-15',
    courses: 2,
    status: 'active'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    joinDate: '2024-01-10',
    courses: 1,
    status: 'active'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    joinDate: '2024-01-08',
    courses: 3,
    status: 'inactive'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    joinDate: '2024-01-05',
    courses: 1,
    status: 'active'
  }
];

export function AdminDashboard({ user, courses, onAddCourse, onUpdateCourse, onDeleteCourse }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock data for admin dashboard (removed Revenue stat)
  const adminStats = [
    {
      title: 'Total Students',
      value: 2105,
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Courses',
      value: courses.length,
      change: '+0%',
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      title: 'Course Completion',
      value: '87%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowEditModal(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      onDeleteCourse(courseId);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingCourse(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your e-learning platform and track performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {adminStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="text-2xl">{stat.value}</div>
                  <p className="text-xs text-green-600">{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: 'New student enrolled', detail: 'Alice Johnson joined Web Development', time: '2 hours ago' },
                  { action: 'Course completed', detail: 'Bob Smith finished HTML Fundamentals', time: '4 hours ago' },
                  { action: 'New course created', detail: 'React Advanced was published', time: '1 day ago' },
                  { action: 'Student feedback', detail: '5-star rating for Data Structures', time: '2 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span>{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.detail} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Courses</CardTitle>
                <CardDescription>Most enrolled courses this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, index) => (
                  <div key={course.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm">{course.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.enrolled} students
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{course.rating} ⭐</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl">Course Management</h2>
              <p className="text-muted-foreground">Manage and monitor your courses</p>
            </div>
            <Button onClick={onAddCourse} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Course</span>
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <div>{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.level}</div>
                      </div>
                    </TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.enrolled.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span>{course.rating}</span>
                        <span className="text-yellow-400">⭐</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Published</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditCourse(course)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl">Student Management</h2>
              <p className="text-muted-foreground">View and manage student accounts</p>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          {student.name.charAt(0)}
                        </div>
                        <span>{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{new Date(student.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{student.courses}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          {student.status === 'active' ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Course Modal */}
      <EditCourse
        course={editingCourse}
        isOpen={showEditModal}
        onClose={closeEditModal}
        onUpdateCourse={onUpdateCourse}
      />
    </div>
  );
}