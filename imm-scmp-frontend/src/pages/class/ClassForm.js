import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import {
  Class,
  Book,
  School,
  Save,
  ArrowBack,
  ErrorOutline,
  CheckCircle,
  Upload,
  Person,
} from '@mui/icons-material';
import getId from '../../utils/getId';

function ClassForm() {
  const navigate = useNavigate();
  const teacherId = getId() || 'T12345';
  const [formData, setFormData] = useState({
    className: '',
    selectedCourseIds: [],
    selectedStudentIds: [],
    year: new Date().getFullYear().toString(),
  });
  const [availableCourses, setAvailableCourses] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load available courses created by this teacher
    const loadCourses = () => {
      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      // const teacherCourses = storedCourses.filter(
      //   (course) => course.creatorId === teacherId
      // );
      setAvailableCourses(storedCourses);
    };

    // Load available students (mock data or fetch from a source)
    const loadStudents = () => {
      // Replace with actual API call or data source
      const mockStudents = [
        { studentId: 'S001', name: 'John Doe' },
        { studentId: 'S002', name: 'Jane Smith' },
        { studentId: 'S003', name: 'Alice Johnson' },
      ];
      setAvailableStudents(mockStudents);
    };

    loadCourses();
    loadStudents();
  }, [teacherId]);

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

  const handleStudentToggle = (studentId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedStudentIds.includes(studentId);
      const newSelectedStudentIds = isSelected
        ? prev.selectedStudentIds.filter((id) => id !== studentId)
        : [...prev.selectedStudentIds, studentId];
      return { ...prev, selectedStudentIds: newSelectedStudentIds };
    });
    if (error) setError('');
  };

  const handleBatchImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Mock batch import: Assume CSV with student IDs
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const studentIds = text
        .split('\n')
        .map((line) => line.trim())
        .filter(
          (id) => id && availableStudents.some((s) => s.studentId === id)
        );
      setFormData((prev) => ({
        ...prev,
        selectedStudentIds: [
          ...new Set([...prev.selectedStudentIds, ...studentIds]),
        ],
      }));
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.selectedCourseIds.length === 0) {
      setError('Please select at least one course for this class.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.className) {
      setError('Class name is required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const newClass = {
        teacherId,
        className: formData.className,
        year: parseInt(formData.year, 10) || new Date().getFullYear(),
        courseIds: formData.selectedCourseIds,
        studentIds: formData.selectedStudentIds,
        createdTime: new Date().toISOString(),
      };

      const storedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      storedClasses.push(newClass);
      localStorage.setItem('classes', JSON.stringify(storedClasses));

      setSuccess(true);
      setFormData({
        className: '',
        year: new Date().getFullYear().toString(),
        selectedCourseIds: [],
        selectedStudentIds: [],
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
    navigate(`/classes/${teacherId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
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
              <Class className="w-7 h-7 text-white" />
              <h1 className="text-xl font-bold">Create New class</h1>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Typography className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Person className="text-blue-600 w-5 h-5" />
                Teacher ID
              </Typography>
              <TextField
                fullWidth
                name="className"
                value={formData.teacherId}
                onChange={handleChange}
                className="bg-slate-50/50 hover:bg-white"
                placeholder={`${teacherId}`}
                disable
              />
            </div>
            <div className="space-y-2">
              <Typography className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <School className="text-blue-600 w-5 h-5" />
                Class Name
              </Typography>
              <TextField
                fullWidth
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="bg-slate-50/50 hover:bg-white"
                placeholder="Enter the class name (e.g., Computer Science 2024)"
                required
              />
            </div>

            <div className="space-y-2">
              <Typography className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                Year
              </Typography>
              <TextField
                fullWidth
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                className="bg-slate-50/50 hover:bg-white"
                required
              />
            </div>

            <div className="space-y-3">
              <Typography className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Book className="text-blue-600 w-5 h-5" />
                Select Courses for This Class
              </Typography>
              {availableCourses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Book className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <Typography className="text-lg font-medium">
                    No courses available
                  </Typography>
                  <Typography className="text-sm">
                    Create some courses first before creating a class
                  </Typography>
                  <Button
                    onClick={() => navigate('/courses/create')}
                    className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Create Course →
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                  {availableCourses.map((course) => (
                    <div
                      key={course.courseId}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.selectedCourseIds.includes(course.courseId)
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-slate-200 hover:indigo-600 hover:bg-indigo-25'
                      }`}
                      onClick={() => handleCourseToggle(course.courseId)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Typography className="font-semibold text-slate-700">
                            {course.courseName}
                          </Typography>
                          <Typography className="text-sm text-slate-500">
                            {course.courseCode} • {course.objective}
                          </Typography>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.selectedCourseIds.includes(course.courseId)
                              ? 'border-indigo-600 bg-indigo-600'
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
                <div className="mt-3 p-3 bg-indigo-50 rounded-lg">
                  <Typography className="text-sm text-indigo-700 font-medium">
                    Selected: {formData.selectedCourseIds.length} course(s)
                  </Typography>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Typography className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <School className="text-blue-600 w-5 h-5" />
                Select Students for This Class
              </Typography>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                {availableStudents.map((student) => (
                  <div
                    key={student.studentId}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.selectedStudentIds.includes(student.studentId)
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-200 hover:border-indigo-600 hover:bg-indigo-25'
                    }`}
                    onClick={() => handleStudentToggle(student.studentId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Typography className="font-semibold text-slate-700">
                          {student.name}
                        </Typography>
                        <Typography className="text-sm text-slate-500">
                          ID: {student.studentId}
                        </Typography>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.selectedStudentIds.includes(
                            student.studentId
                          )
                            ? 'border-indigo-600 bg-indigo-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {formData.selectedStudentIds.includes(
                          student.studentId
                        ) && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Upload />}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Upload Student List (CSV)
                  <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={handleBatchImport}
                  />
                </Button>
              </div>
              {formData.selectedStudentIds.length > 0 && (
                <div className="mt-3 p-3 bg-indigo-50 rounded-lg">
                  <Typography className="text-sm text-indigo-700 font-medium">
                    Selected: {formData.selectedStudentIds.length} student(s)
                  </Typography>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={
                  isSubmitting || success || availableCourses.length === 0
                }
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="text-white">Creating Class...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="text-white">Class Created!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 text-white" />
                    <span className="text-white">Create Class</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

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
              <Typography className="font-semibold text-base">
                {error || 'Class created successfully!'}
              </Typography>
              <Button
                onClick={() => {
                  setError('');
                  setSuccess(false);
                }}
                className="ml-2 text-white/80 hover:text-white text-base"
              >
                ×
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassForm;
