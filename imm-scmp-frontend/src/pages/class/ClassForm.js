import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Class,
  Book,
  School,
  Save,
  ArrowBack,
  ErrorOutline,
  CheckCircle,
} from '@mui/icons-material';
import getId from '../../utils/getId';
import getRole from '../../utils/getRole';

// ClassForm component for creating a new class
function ClassForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    className: '',
    selectedCourseIds: [],
  });
  const [availableCourses, setAvailableCourses] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const role = getRole(getId()) || userRole;
    const teacherId = getId() || 'T12345';
    console.log('User role:', role);
    setUserRole(role);

    // Load available courses created by this teacher
    const loadCourses = () => {
      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const teacherCourses = storedCourses.filter(
        (course) => course.creatorId === teacherId
      );
      setAvailableCourses(teacherCourses);
    };

    loadCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleCourseToggle = (courseId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedCourseIds.includes(courseId);
      const newSelectedCourseIds = isSelected
        ? prev.selectedCourseIds.filter((id) => id !== courseId)
        : [...prev.selectedCourseIds, courseId];

      return { ...prev, selectedCourseIds: newSelectedCourseIds };
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.selectedCourseIds.length === 0) {
      setError('Please select at least one course for this class.');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const classId = `class-${Date.now()}`;
      const teacherId = getId() || 'T12345';
      const createdTime = new Date().toISOString();

      const newClass = {
        classId,
        className: formData.className,
        teacherId,
        courseIds: formData.selectedCourseIds,
        studentIds: [], // Empty initially
        createdTime,
      };

      const storedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      storedClasses.push(newClass);
      localStorage.setItem('classes', JSON.stringify(storedClasses));

      console.log('Simulated created class:', newClass);

      setSuccess(true);
      setFormData({
        className: '',
        selectedCourseIds: [],
      });

      setTimeout(() => {
        navigate(`/classes/${teacherId}`);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create class. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(`/classes/${getId() || 'T12345'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-emerald-600 bg-white border border-emerald-600 font-medium text-sm px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              <ArrowBack className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <Class className="w-7 h-7 text-white" />
              <h1 className="text-xl font-bold">Create New Class</h1>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <School className="text-emerald-600 w-5 h-5" />
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                placeholder="Enter the class name (e.g., Computer Science 2024)"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Book className="text-blue-600 w-5 h-5" />
                Select Courses for This Class
              </label>

              {availableCourses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Book className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-medium">No courses available</p>
                  <p className="text-sm">
                    Create some courses first before creating a class
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/courses/create')}
                    className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Create Course →
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                  {availableCourses.map((course) => (
                    <div
                      key={course.courseId}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.selectedCourseIds.includes(course.courseId)
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-25'
                      }`}
                      onClick={() => handleCourseToggle(course.courseId)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-700">
                            {course.courseName}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {course.courseCode} • {course.objective}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.selectedCourseIds.includes(course.courseId)
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-slate-300'
                          }`}
                        >
                          {formData.selectedCourseIds.includes(
                            course.courseId
                          ) && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {formData.selectedCourseIds.length > 0 && (
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-emerald-700 font-medium">
                    Selected: {formData.selectedCourseIds.length} course(s)
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={
                  isSubmitting || success || availableCourses.length === 0
                }
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Creating Class...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Class Created!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create Class
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error/Success Toast */}
      {(error || success) && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ${
              error ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {error ? (
                <ErrorOutline className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span className="font-semibold text-base">
                {error || 'Class created successfully!'}
              </span>
              <button
                onClick={() => {
                  setError('');
                  setSuccess(false);
                }}
                className="ml-2 text-white/80 hover:text-white text-base"
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

export default ClassForm;
