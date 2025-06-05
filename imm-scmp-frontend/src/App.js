import React from 'react'; // Add this line at the top
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Navbar from './components/common/Navbar';
// import Sidebar from './components/common/Sidebar';
// import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import CourseList from './pages/CourseList';
// import ClassList from './pages/ClassList';
// import ResourceList from './pages/ResourceList';
// import ExerciseList from './pages/ExerciseList';
// import HistoryList from './pages/HistoryList';
// import CourseForm from './components/course/CourseForm';
// import ClassForm from './components/course/ClassForm';
// import ExerciseSubmission from './components/exercise/ExerciseSubmission';

// const AppLayout = ({ children }) => (
//   <>
//     <Navbar />
//     <Sidebar />
//     {children}
//   </>
// );

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without layout */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
          <Route path="/courses/create" element={<ProtectedRoute><CourseForm /></ProtectedRoute>} />
          <Route path="/courses/:courseId/edit" element={<ProtectedRoute><CourseForm /></ProtectedRoute>} />
          <Route path="/classes" element={<ProtectedRoute><ClassList /></ProtectedRoute>} />
          <Route path="/classes/create" element={<ProtectedRoute><ClassForm /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><ResourceList /></ProtectedRoute>} />
          <Route path="/exercises" element={<ProtectedRoute><ExerciseList /></ProtectedRoute>} />
          <Route path="/exercises/:exerciseId/submit" element={<ProtectedRoute><ExerciseSubmission /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryList /></ProtectedRoute>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
