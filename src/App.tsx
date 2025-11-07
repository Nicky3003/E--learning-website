import React, { useState } from "react";
import { Home } from "./components/Home";
import { CourseList } from "./components/CourseList";
import { CourseDetail } from "./components/CourseDetail";
import { StudentDashboard } from "./components/StudentDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Navigation } from "./components/Navigation";
import { AddCourse } from "./components/AddCourse";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  completed?: boolean;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  enrolled: number;
  rating: number;
  image: string;
  topics: Topic[];
};

// Mock data
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Web Development",
    description:
      "Learn modern web development with HTML, CSS, JavaScript, and React",
    instructor: "Harry",
    duration: "40 hours",
    level: "Beginner",
    enrolled: 1250,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    topics: [
      {
        id: "1-1",
        title: "HTML Fundamentals",
        description:
          "Learn the basics of HTML structure and semantics",
        videoUrl: "IA8JWGP13dI?si=WFWdwkMG8vSJScsR",
        duration: "2 hours",
      },
      {
        id: "1-2",
        title: "CSS Styling",
        description:
          "Master CSS for beautiful and responsive designs",
        videoUrl: "ua24185-rcw?si=CldZqvEwb1yPDKpJ",
        duration: "3 hours",
      },
      {
        id: "1-3",
        title: "JavaScript Basics",
        description: "Programming fundamentals with JavaScript",
        videoUrl: "01GNWUuLbYk?si=PsV3ErbbGdE1v5u7",
        duration: "4 hours",
      },
      {
        id: "1-4",
        title: "React Framework",
        description:
          "Build interactive user interfaces with React",
        videoUrl: "-mJFZp84TIY?si=npj5mHmQp9d68pOn",
        duration: "6 hours",
      },
    ],
  },
  {
    id: "2",
    title: "Data Structure & Algorithm",
    description:
      "Master fundamental data structures and algorithms for technical interviews",
    instructor: "Sarah Johnson",
    duration: "60 hours",
    level: "Intermediate",
    enrolled: 850,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    topics: [
      {
        id: "2-1",
        title: "Arrays & Strings",
        description:
          "Understanding arrays and string manipulation",
        videoUrl: "yRpLlJmRo2w?si=TIPvstEfz_i3v6fY",
        duration: "3 hours",
      },
      {
        id: "2-2",
        title: "Linked Lists",
        description:
          "Single and double linked list implementations",
        videoUrl: "oAja8-Ulz6o?si=Gxnh7ReRVh-BJU88",
        duration: "4 hours",
      },
      {
        id: "2-3",
        title: "Stacks & Queues",
        description: "LIFO and FIFO data structure concepts",
        videoUrl: "7m1DMYAbdiY?si=1cihChQvgl575P5L",
        duration: "3 hours",
      },
      {
        id: "2-4",
        title: "Trees & Graphs",
        description: "Binary trees, BST, and graph algorithms",
        videoUrl: "-DzowlcaUmE?si=3bnz8t5QblpCBtOt",
        duration: "8 hours",
      },
      {
        id: "2-5",
        title: "Sorting Algorithms",
        description:
          "Quick sort, merge sort, and other sorting techniques",
        videoUrl: "PkJIc5tBRUE?si=mMocZygAzSs1AYwI",
        duration: "5 hours",
      },
    ],
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);
  const [selectedTopic, setSelectedTopic] =
    useState<Topic | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage(
      userData.role === "admin"
        ? "admin-dashboard"
        : "student-dashboard",
    );
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage("course-detail");
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course,
      ),
    );
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.filter((course) => course.id !== courseId),
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            onNavigate={setCurrentPage}
            onCourseSelect={handleCourseSelect}
            courses={courses}
          />
        );
      case "courses":
        return (
          <CourseList
            onCourseSelect={handleCourseSelect}
            courses={courses}
          />
        );
      case "course-detail":
        return selectedCourse ? (
          <CourseDetail
            course={selectedCourse}
            onTopicSelect={handleTopicSelect}
            selectedTopic={selectedTopic}
            user={user}
          />
        ) : null;
      case "student-dashboard":
        return user ? (
          <StudentDashboard
            user={user}
            onCourseSelect={handleCourseSelect}
            courses={courses}
          />
        ) : null;
      case "admin-dashboard":
        return user ? (
          <AdminDashboard
            user={user}
            courses={courses}
            onAddCourse={() => setCurrentPage("add-course")}
            onUpdateCourse={handleUpdateCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        ) : null;
      case "add-course":
        return user?.role === "admin" ? (
          <AddCourse
            onBack={() => setCurrentPage("admin-dashboard")}
            onAddCourse={handleAddCourse}
          />
        ) : null;
      case "login":
        return (
          <Login
            onLogin={handleLogin}
            onNavigate={setCurrentPage}
          />
        );
      case "signup":
        return <Signup onNavigate={setCurrentPage} />;
      default:
        return (
          <Home
            onNavigate={setCurrentPage}
            onCourseSelect={handleCourseSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}
