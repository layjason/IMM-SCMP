import React from 'react'; // Add this line at the top
import './styles/index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider } from './utils/SidebarContext';

import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Home from './pages/account/Home';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import Profile from './pages/account/Profile';
import ClassList from './pages/class/ClassList';
import CourseList from './pages/courseClass/CourseList';
import CourseForm from './pages/courseClass/CourseForm';
import CourseDetails from './pages/courseClass/courseDetails';
import Assignment from './pages/assignment/Assignment';
import CreateAssignment from './pages/assignment/CreateAssignment';
import DoAssignment from './pages/assignment/DoAssignment';
import MarkAssignment from './pages/assignment/MarkAssignment';
import Resource from './pages/resources/Resource';
import HistoryRecords from './pages/history/HistoryRecords';
import ClassForm from './pages/class/ClassForm';

const AppLayout = ({ children }) => (
  <>
    <Navbar />
    <Sidebar />
    {children}
  </>
);

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes without layout */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses/create/:id" element={<CourseForm />} />
          <Route
            path="/courses/:id"
            element={
              <AppLayout>
                <CourseList />
              </AppLayout>
            }
          />
          <Route
            path="/classes/:id"
            element={
              <AppLayout>
                <ClassList />
              </AppLayout>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/form" element={<CourseForm />} />
          <Route
            path="/courses/:id/:courseId/"
            element={
              <AppLayout>
                <CourseDetails />
              </AppLayout>
            }
          />
          <Route
            path="/assignment/:id"
            element={
              <AppLayout>
                <Assignment />
              </AppLayout>
            }
          />
          <Route
            // path="/course/:courseId/assignment/create"
            path="/createAssignment"
            element={<CreateAssignment />}
          />
          <Route
            path="/course/:courseId/assignment/:assignmentId"
            element={<DoAssignment />}
          />
          <Route
            path="/course/:courseId/markAssignment/:assignmentId"
            element={<MarkAssignment />}
          />
          <Route
            path="/resources/:id"
            element={
              <AppLayout>
                <Resource />
              </AppLayout>
            }
          />
          <Route
            path="/history/:id"
            element={
              <AppLayout>
                <HistoryRecords />
              </AppLayout>
            }
          />

          <Route path="/classform" element={<ClassForm />}></Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
