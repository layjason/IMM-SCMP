import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBack,
  CheckCircle,
  ErrorOutline,
  People,
  Book,
  Settings,
  Add,
  School,
} from '@mui/icons-material';
import getId from '../../utils/getId';
import { SidebarContext } from '../../utils/SidebarContext';
import getRole from '../../utils/getRole';

function ClassDetails() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState({
    name: '',
    code: '',
    courses: [],
    studentIds: [],
  });
  const [availableCourses, setAvailableCourses] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 80;

  // Mock data fetch for class
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const storedClasses = JSON.parse(
          localStorage.getItem('classes') || '[]'
        );
        const storedCourses = JSON.parse(
          localStorage.getItem('courses') || '[]'
        );

        const foundClass = storedClasses.find((c) => c.classId === classId);
        if (!foundClass) {
          setError('Class not found.');
          return;
        }

        // Get courses for this class
        const classCourses = storedCourses.filter((course) =>
          foundClass.courseIds.includes(course.courseId)
        );

        // Get available courses not in this class
        const availableCourses = storedCourses.filter(
          (course) =>
            !foundClass.courseIds.includes(course.courseId) &&
            course.creatorId === getId()
        );

        setClassData({
          ...foundClass,
          courses: classCourses.map((course) => ({
            id: course.courseId,
            name: course.name,
            code: course.code,
            description: course.description,
          })),
        });
        setAvailableCourses(availableCourses);

        // Get user role
        const role = await getRole();
        setUserRole(role);
      } catch (err) {
        setError('Failed to load class data.');
        console.error('Error fetching class:', err);
      }
    };

    fetchClass();
  }, [classId]);

  const handleAddCourse = async (courseId) => {
    try {
      const storedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');

      const classIndex = storedClasses.findIndex((c) => c.classId === classId);
      if (classIndex === -1) {
        setError('Class not found.');
        return;
      }

      // Add course to class
      storedClasses[classIndex].courseIds.push(courseId);
      localStorage.setItem('classes', JSON.stringify(storedClasses));

      // Update local state
      const addedCourse = storedCourses.find((c) => c.courseId === courseId);
      if (addedCourse) {
        setClassData((prev) => ({
          ...prev,
          courses: [
            ...prev.courses,
            {
              id: addedCourse.courseId,
              name: addedCourse.name,
              code: addedCourse.code,
              description: addedCourse.description,
            },
          ],
        }));
        setAvailableCourses((prev) =>
          prev.filter((c) => c.courseId !== courseId)
        );
      }

      setSuccess('Course added successfully!');
      setShowAddCourse(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add course.');
      console.error('Error adding course:', err);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      const storedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');

      const classIndex = storedClasses.findIndex((c) => c.classId === classId);
      if (classIndex === -1) {
        setError('Class not found.');
        return;
      }

      // Remove course from class
      storedClasses[classIndex].courseIds = storedClasses[
        classIndex
      ].courseIds.filter((id) => id !== courseId);
      localStorage.setItem('classes', JSON.stringify(storedClasses));

      // Update local state
      const removedCourse = storedCourses.find((c) => c.courseId === courseId);
      if (removedCourse) {
        setClassData((prev) => ({
          ...prev,
          courses: prev.courses.filter((c) => c.id !== courseId),
        }));
        setAvailableCourses((prev) => [...prev, removedCourse]);
      }

      setSuccess('Course removed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to remove course.');
      console.error('Error removing course:', err);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 transition-all duration-300 ease-in-out"
      style={{ marginLeft: `${drawerWidth}px` }}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/classes')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowBack className="mr-2" />
            Back to Classes
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {classData.name}
              </h1>
              <p className="text-gray-600">Class Code: {classData.code}</p>
            </div>

            {userRole === 'teacher' && (
              <button
                onClick={() =>
                  navigate(`/classes/${getId()}/${classId}/manage`)
                }
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Settings className="mr-2" />
                Manage Class
              </button>
            )}
          </div>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <ErrorOutline className="text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="text-green-500 mr-2" />
            <span className="text-green-700">{success}</span>
            <button
              onClick={() => setSuccess('')}
              className="ml-auto text-green-500 hover:text-green-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Class Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Book className="text-emerald-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Courses</h3>
                <p className="text-2xl font-bold text-emerald-600">
                  {classData.courses.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <People className="text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Students
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {classData.studentIds ? classData.studentIds.length : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <School className="text-purple-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                <p className="text-lg font-semibold text-purple-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Book className="mr-2 text-emerald-600" />
              Courses in this Class
            </h2>

            {userRole === 'teacher' && (
              <button
                onClick={() => setShowAddCourse(true)}
                className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Add className="mr-2" />
                Add Course
              </button>
            )}
          </div>

          {classData.courses.length === 0 ? (
            <div className="text-center py-12">
              <Book
                className="mx-auto text-gray-400 mb-4"
                style={{ fontSize: 48 }}
              />
              <p className="text-gray-500 text-lg mb-4">
                No courses assigned yet
              </p>
              {userRole === 'teacher' && (
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Your First Course
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classData.courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {course.code}
                      </p>
                      {course.description && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {course.description}
                        </p>
                      )}
                    </div>

                    {userRole === 'teacher' && (
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        className="text-red-500 hover:text-red-700 transition-colors ml-2"
                        title="Remove course"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    View Course
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Course Modal */}
        {showAddCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Course to Class
              </h3>

              {availableCourses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    No available courses to add. Create a course first.
                  </p>
                  <button
                    onClick={() => navigate('/courses/create')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Create Course
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableCourses.map((course) => (
                    <div
                      key={course.courseId}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {course.name}
                        </p>
                        <p className="text-sm text-gray-600">{course.code}</p>
                      </div>
                      <button
                        onClick={() => handleAddCourse(course.courseId)}
                        className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddCourse(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassDetails;
