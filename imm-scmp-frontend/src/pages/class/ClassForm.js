import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Book,
  Description,
  CalendarToday,
  Save,
  ArrowBack,
  CheckCircle,
  ErrorOutline,
  Schedule,
  Group,
  School,
} from '@mui/icons-material';
import getId from '../../utils/getId';
import getRole from '../../utils/getRole';
import getCourses from '../../utils/getCourses';

function ClassForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    className: '',
    classCode: '',
    description: '',
    year: new Date().getFullYear(),
    semester: 'Spring',
    subject: '',
    studentsCount: 0,
    maxCapacity: 30,
    schedule: '',
    courses: [],
  });
  const [userRole, setUserRole] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user role and available courses
  useEffect(() => {
    const role = getRole(getId()) || 'TEACHER';
    setUserRole(role);
    const loadCourses = async () => {
      const courses = await getCourses();
      setAvailableCourses(courses);
    };
    loadCourses();
  }, []);

  // Handle changes to text inputs and select
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? parseInt(value, 10) || 0 : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (error) setError('');
  };

  // Handle course selection
  const handleCourseChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, courses: selected }));
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (
      !formData.className.trim() ||
      !formData.classCode.trim() ||
      !formData.description.trim() ||
      !formData.subject.trim() ||
      !formData.schedule.trim()
    ) {
      setError('All fields are required.');
      setIsSubmitting(false);
      return;
    }

    // Validate capacity
    if (formData.studentsCount > formData.maxCapacity) {
      setError('Current students count cannot exceed maximum capacity.');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Create new class object with all required fields
      const classId = `class-${Date.now()}`;
      const instructorId = getId();
      const createdTime = new Date().toISOString();

      const newClass = {
        classId,
        className: formData.className,
        classCode: formData.classCode,
        description: formData.description,
        instructorId,
        year: formData.year,
        semester: formData.semester,
        subject: formData.subject,
        studentsCount: formData.studentsCount,
        maxCapacity: formData.maxCapacity,
        schedule: formData.schedule,
        courses: formData.courses,
        createdTime,
      };

      // Save to localStorage
      const storedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      storedClasses.push(newClass);
      localStorage.setItem('classes', JSON.stringify(storedClasses));

      console.log('Created class:', newClass);
      setSuccess(true);

      // Navigate back to classes after 2 seconds
      setTimeout(() => {
        navigate(`/classes/${instructorId}`);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to save class. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(`/classes/${getId()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-blue-600 bg-white border border-blue-600 font-medium text-sm px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              <ArrowBack className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <Book className="w-7 h-7 text-white" />
              <h1 className="text-xl font-bold">Create New Class</h1>
            </div>
          </div>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Class Name and Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Book className="text-blue-600 w-5 h-5" />
                  Class Name
                </label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                  placeholder="Enter the class name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Book className="text-blue-600 w-5 h-5" />
                  Class Code
                </label>
                <input
                  type="text"
                  name="classCode"
                  value={formData.classCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                  placeholder="e.g., CLS101"
                  required
                />
              </div>
            </div>

            {/* Row 2: Subject and Year/Semester */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <School className="text-emerald-600 w-5 h-5" />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                  placeholder="e.g., Computer Science"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarToday className="text-purple-600 w-5 h-5" />
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                  required
                >
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarToday className="text-purple-600 w-5 h-5" />
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                  placeholder="2025"
                  required
                />
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Schedule className="text-indigo-600 w-5 h-5" />
                Schedule
              </label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                placeholder="e.g., Mon, Wed, Fri 10:00-11:00 AM"
                required
              />
            </div>

            {/* Row 3: Student Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Group className="text-green-600 w-5 h-5" />
                  Current Students
                </label>
                <input
                  type="number"
                  name="studentsCount"
                  value={formData.studentsCount}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Group className="text-green-600 w-5 h-5" />
                  Maximum Capacity
                </label>
                <input
                  type="number"
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                  placeholder="30"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Description className="text-orange-600 w-5 h-5" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base resize-none"
                placeholder="Describe the class"
                required
              />
            </div>

            {/* Courses */}
            {userRole === 'TEACHER' && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Book className="text-emerald-600 w-5 h-5" />
                  Select Courses
                </label>
                <select
                  name="courses"
                  multiple
                  value={formData.courses}
                  onChange={handleCourseChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                  size="4"
                >
                  {availableCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} ({course.code})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">
                  Hold Ctrl/Cmd to select multiple courses
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || success}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-base"
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
                {error || 'Class saved successfully!'}
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
