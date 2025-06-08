import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Book,
  TrackChanges,
  ListAlt,
  School,
  Save,
  ArrowBack,
  ErrorOutline,
  AddCircleOutline,
  RemoveCircleOutline,
  CheckCircle,
} from '@mui/icons-material';
import getId from '../../utils/getId';
import getRole from '../../utils/getRole';

// CourseForm component for creating a new course
function CourseForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: '',
    chapters: [{ chapterNumber: 1, chapterTitle: '' }],
    objective: '',
    assessmentMethod: 'EXAM',
  });
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const role = getRole(getId()) || 'TEACHER';
    console.log('User role:', role);
    setUserRole(role);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleChapterChange = (index, value) => {
    setFormData((prev) => {
      const newChapters = [...prev.chapters];
      newChapters[index] = { ...newChapters[index], chapterTitle: value };
      return { ...prev, chapters: newChapters };
    });
    if (error) setError('');
  };

  const handleAddChapter = () => {
    setFormData((prev) => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        { chapterNumber: prev.chapters.length + 1, chapterTitle: '' },
      ],
    }));
  };

  const handleRemoveChapter = (index) => {
    setFormData((prev) => {
      const newChapters = prev.chapters
        .filter((_, i) => i !== index)
        .map((chapter, i) => ({ ...chapter, chapterNumber: i + 1 }));
      return { ...prev, chapters: newChapters };
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.chapters.some((ch) => !ch.chapterTitle.trim())) {
      setError('All chapter titles must be filled.');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const courseId = `course-${Date.now()}`;
      const courseCode = `CS${Math.floor(Math.random() * 1000)}`;
      const creatorId = getId();
      const createdTime = new Date().toISOString();

      const newCourse = {
        courseId,
        courseName: formData.courseName,
        courseCode,
        syllabus: [],
        objective: formData.objective,
        assessmentMethod: formData.assessmentMethod,
        creatorId,
        createdTime,
        chapters: formData.chapters,
      };

      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      storedCourses.push(newCourse);
      localStorage.setItem('courses', JSON.stringify(storedCourses));

      console.log('Simulated created course:', newCourse);
      setSuccess(true);
      setFormData({
        courseName: '',
        chapters: [{ chapterNumber: 1, chapterTitle: '' }],
        objective: '',
        assessmentMethod: 'EXAM',
      });

      setTimeout(() => {
        navigate(`/courses/${creatorId}`);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to save course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(`/courses/${getId()}`);
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
              <School className="w-7 h-7 text-white" />
              <h1 className="text-xl font-bold">Create New Course</h1>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Book className="text-blue-600 w-5 h-5" />
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                placeholder="Enter the course name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ListAlt className="text-emerald-600 w-5 h-5" />
                Course Chapters
              </label>
              <div className="space-y-3">
                {formData.chapters.map((chapter, index) => (
                  <div
                    key={chapter.chapterNumber}
                    className="flex items-center gap-3"
                  >
                    <span className="text-slate-600 font-medium w-24 text-base">{`Chapter ${chapter.chapterNumber}`}</span>
                    <input
                      type="text"
                      value={chapter.chapterTitle}
                      onChange={(e) =>
                        handleChapterChange(index, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                      placeholder={`Enter title for Chapter ${chapter.chapterNumber}`}
                      required
                    />
                    {userRole === 'TEACHER' && formData.chapters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChapter(index)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        <RemoveCircleOutline className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {userRole === 'TEACHER' && (
                  <button
                    type="button"
                    onClick={handleAddChapter}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-base transition-colors duration-200"
                  >
                    <AddCircleOutline className="w-5 h-5" />
                    Add Chapter
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <TrackChanges className="text-orange-600 w-5 h-5" />
                Learning Objective
              </label>
              <textarea
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base resize-none"
                placeholder="What will students achieve by the end of this course?"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle className="text-purple-600 w-5 h-5" />
                Assessment Method
              </label>
              <select
                name="assessmentMethod"
                value={formData.assessmentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white text-base"
                required
              >
                <option value="EXAM">考试 (Exam)</option>
                <option value="INVESTIGATION">考察 (Investigation)</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || success}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Creating Course...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Course Created!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create Course
                  </>
                )}
              </button>
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
              <span className="font-semibold text-base">
                {error || 'Course saved successfully!'}
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

export default CourseForm;
