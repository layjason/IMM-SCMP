import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Book,
  Code,
  TrackChanges,
  ListAlt,
  School,
  Save,
  Edit,
  ArrowBack,
  CheckCircle,
  ErrorOutline,
} from '@mui/icons-material';
import getId from '../../utils/getId';

function CourseForm() {
  const courseId = null;
  const isEdit = !!courseId;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    outline: '',
    goals: '',
    assessment: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const mockCourse = {
        name: 'Advanced React Development',
        code: 'REACT301',
        outline:
          'Comprehensive course covering advanced React concepts including hooks, context, performance optimization, and modern development patterns.',
        goals:
          'Master advanced React patterns, understand performance optimization techniques, and build scalable applications.',
        assessment:
          'Project-based assessments, code reviews, and a final capstone project demonstrating mastery of advanced concepts.',
      };
      setFormData(mockCourse);
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    // api get request to get courses list
    // put request to update the list
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(isEdit ? 'Updating course:' : 'Creating course:', formData);
      setSuccess(true);
      setTimeout(() => {
        console.log('Would navigate to /courses');
      }, 2000);
    } catch (err) {
      setError('Failed to save course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    console.log('Would navigate back to /courses');
    navigate(`/courses/${getId()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group"
            >
              <ArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Courses</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              {isEdit ? (
                <Edit className="w-8 h-8" />
              ) : (
                <School className="w-8 h-8" />
              )}
              <h1 className="text-xl font-bold">
                {isEdit ? 'Update Course' : 'Create New Course'}
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              {isEdit
                ? 'Modify course details and update your curriculum'
                : 'Design and structure your new course curriculum'}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Book className="text-blue-600" />
                  Course Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                  placeholder="Enter the course name"
                  required
                />
              </div>

              {/* Course Code */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Code className="text-indigo-600" />
                  Course Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                  placeholder="e.g., CS101, MATH201"
                  required
                />
              </div>

              {/* Course Outline */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ListAlt className="text-emerald-600" />
                  Course Outline
                </label>
                {/*change to pdf?*/}
                <textarea
                  name="outline"
                  value={formData.outline}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white resize-none"
                  placeholder="Describe the course structure, topics covered, and learning progression..."
                  required
                />
              </div>

              {/* Goals */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <TrackChanges className="text-orange-600" />
                  Learning Goals
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white resize-none"
                  placeholder="What will students achieve by the end of this course?"
                  required
                />
              </div>

              {/* Assessment */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle className="text-purple-600" />
                  Assessment Methods
                </label>
                <textarea
                  name="assessment"
                  value={formData.assessment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white resize-none"
                  placeholder="How will students be evaluated? (exams, projects, assignments, etc.)"
                  required
                />
                {/*选择题*/}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || success}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      {isEdit ? 'Updating Course...' : 'Creating Course...'}
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Course {isEdit ? 'Updated' : 'Created'} Successfully!
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {isEdit ? 'Update Course' : 'Create Course'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
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
                <ErrorOutline className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span className="font-medium">
                {error || 'Course saved successfully!'}
              </span>
              <button
                onClick={() => {
                  setError('');
                  setSuccess(false);
                }}
                className="ml-2 text-white/80 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
      <span>test</span>
    </div>
  );
}

export default CourseForm;
