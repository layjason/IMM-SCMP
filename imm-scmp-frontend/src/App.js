import React from 'react'; // Add this line at the top
import './styles/index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Home from './pages/account/Home';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import Profile from './pages/account/Profile';
import CourseList from './pages/courseClass/CourseList';
import CourseForm from './pages/courseClass/CourseForm';
import CourseDetails from './pages/courseClass/courseDetails';
// import ResourceList from './pages/ResourceList';
// import ExerciseList from './pages/ExerciseList';
// import HistoryList from './pages/HistoryList';
// import ClassForm from './components/course/ClassForm';
// import ExerciseSubmission from './components/exercise/ExerciseSubmission';

const AppLayout = ({ children }) => (
  <>
    <Navbar />
    <Sidebar />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without layout */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/create" element={<CourseForm />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/form" element={<CourseForm />} />
        <Route
          path="/courseDetails"
          element={
            <AppLayout>
              <CourseDetails />
            </AppLayout>
          }
        />
        {/* <Route path="/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
          <Route path="/courses/create" element={<ProtectedRoute><CourseForm /></ProtectedRoute>} />
          <Route path="/courses/:courseId/edit" element={<ProtectedRoute><CourseForm /></ProtectedRoute>} />
          <Route path="/classes" element={<ProtectedRoute><ClassList /></ProtectedRoute>} />
          <Route path="/classes/create" element={<ProtectedRoute><ClassForm /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><ResourceList /></ProtectedRoute>} />
          <Route path="/exercises" element={<ProtectedRoute><ExerciseList /></ProtectedRoute>} />
          <Route path="/exercises/:exerciseId/submit" element={<ProtectedRoute><ExerciseSubmission /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryList /></ProtectedRoute>} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
