import React, { useState, useEffect, useContext } from 'react';
import { ArrowBack, CheckCircle, ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';
import getRole from '../../utils/getRole';
import getId from '../../utils/getId';
import { SidebarContext } from '../../utils/SidebarContext';

function Assignment() {
  const navigate = useNavigate();
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 80;
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState(''); // Mock: 'teacher' or 'student'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = [
          {
            id: '1',
            title: '程序设计',
            code: 'CS101',
            assignments: [
              {
                id: 1,
                date: '2025-06-07',
                question: 'Write a Python function',
                answer: '',
                completed: false,
              },
              {
                id: 2,
                date: '2025-06-08',
                question: 'Implement a loop',
                answer: 'Done',
                completed: true,
              },
            ],
          },
          {
            id: '2',
            title: '数据结构',
            code: 'CS201',
            assignments: [
              {
                id: 3,
                date: '2025-06-07',
                question: 'Implement a stack',
                answer: '',
                completed: false,
              },
            ],
          },
        ];
        console.log('Courses data:', data);
        setCourses(data.filter((course) => course.assignments.length > 0));
        const id = getId();
        console.log('User ID:', id);
        const mockRole = getRole(id);
        console.log('User Role:', mockRole);
        setUserRole(mockRole);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load assignments.');
      }
    };
    fetchCourses();
  }, []);

  const calculateProgress = (assignments) => {
    const total = assignments.length;
    const completed = assignments.filter((a) => a.completed).length;
    return { completed, total, percent: total ? (completed / total) * 100 : 0 };
  };

  const handleGoToAssignment = (courseId, assignmentId) => {
    navigate(`/course/${courseId}/assignment/${assignmentId}`);
  };

  const handleGoToMarkAssignment = (courseId, assignmentId) => {
    navigate(`/course/${courseId}/markAssignment/${assignmentId}`);
  };

  return (
    <div
      style={{ marginLeft: `${drawerWidth}px` }}
      className={` min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}
    >
      {/* Header */}
      <div className="flex justify-center bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <button
          onClick={() => navigate('/courses/:id')}
          className="mt-20 flex items-center gap-2 text-slate-600 font-semibold py-2 px-6"
        >
          <ArrowBack className="w-5 h-5 " />
          Back to Courses
        </button>
        <div className="mt-20 mx-auto px-6 py-4 ">
          <h1 className="text-2xl font-bold text-slate-700">Assignment</h1>
        </div>
      </div>
      <div className="flex justify-end mr-10 mt-5"></div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="space-y-6">
          {courses.length > 0 ? (
            courses.map((course) => {
              calculateProgress(course.assignments); // Store result
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6"
                >
                  <h3 className="text-xl font-semibold text-slate-700 mb-4">
                    {course.title} ({course.code})
                  </h3>
                  <div className="space-y-4">
                    {course.assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex-1">
                          <p className="text-slate-700 font-medium">
                            {assignment.question}
                          </p>
                          <p className="text-sm text-slate-500">
                            Due: {assignment.date}
                          </p>
                          <div className="w-1/2 mt-2">
                            <Line
                              percent={assignment.completed ? 100 : 70}
                              strokeWidth={2}
                              strokeColor={
                                assignment.completed ? '#22c55e' : '#3b82f6'
                              }
                              trailColor="#e5e7eb"
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              assignment.completed
                                ? 'bg-green-100 text-green-600'
                                : 'bg-blue-100 text-blue-600'
                            }`}
                          >
                            {assignment.completed ? 'Completed' : 'On Going'}
                          </span>
                          {userRole === 'STUDENT' && (
                            <button
                              onClick={() =>
                                handleGoToAssignment(course.id, assignment.id)
                              }
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
                            >
                              Do Assignment
                            </button>
                          )}
                          {userRole === 'TEACHER' && (
                            <button
                              onClick={() =>
                                handleGoToMarkAssignment(
                                  course.id,
                                  assignment.id
                                )
                              }
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
                            >
                              Mark Assignment
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-slate-500 text-center">
              No assignments available.
            </p>
          )}
        </div>
      </div>

      {/* Error/Success Toast */}
      {(error || success) && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
              error ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {error ? (
                <ErrorOutline className="w-5 h-2" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{error || success}</span>
              <button
                onClick={() => {
                  setError('');
                  setSuccess('');
                }}
                className="ml-2 text-white/80 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assignment;
