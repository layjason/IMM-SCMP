import React, { useState, useEffect } from 'react';
import { CheckCircle, ErrorOutline, Close } from '@mui/icons-material';
import {
  getCourses,
  parseCSV,
  saveAssignment,
} from '../../mockData/mockDataUploadAssignment';

function CreateAssignment({ isOpen, onClose }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [formData, setFormData] = useState({
    questions: [
      {
        id: `q${Math.random().toString(36).slice(2)}`,
        type: 'single-choice',
        question: '',
        score: 5,
        options: ['', '', '', ''],
        correctAnswer: '',
        template: '',
      },
    ],
    startTime: new Date().toISOString().slice(0, 16),
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
    allowMultipleSubmissions: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
        if (data.length > 0) setSelectedCourseId(data[0].id);
      } catch (err) {
        setError('Failed to load courses.');
      }
    };
    fetchCourses();
  }, []);

  const handleQuestionChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      ),
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => {
        if (i !== questionIndex) return q;
        return {
          ...q,
          options: q.options.map((opt, j) => (j === optionIndex ? value : opt)),
        };
      }),
    }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: `q${Math.random().toString(36).slice(2)}`,
          type: 'single-choice',
          question: '',
          score: 5,
          options: ['', '', '', ''],
          correctAnswer: '',
          template: '',
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleCSVImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const fileContent = await file.text();
      const questions = await parseCSV(fileContent);
      setFormData((prev) => ({
        ...prev,
        questions: questions.map((q) => ({
          id: q.id,
          type: q.type,
          question: q.question,
          score: q.score,
          options: q.options || ['', '', '', ''],
          correctAnswer: q.correctAnswer || '',
          template: q.template || '',
        })),
      }));
      setSuccess('Questions imported successfully from CSV!');
    } catch (err) {
      setError(`Failed to parse CSV file: ${err.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!selectedCourseId) return 'Please select a course.';
    if (formData.questions.length === 0)
      return 'At least one question is required.';
    for (const q of formData.questions) {
      if (!q.question) return 'Question text is required for all questions.';
      if (q.score <= 0) return 'Score must be positive for all questions.';
      if (q.type === 'single-choice') {
        if (q.options.some((opt) => !opt))
          return 'All options are required for single-choice questions.';
        if (!q.correctAnswer)
          return 'Correct answer is required for single-choice questions.';
      }
    }
    if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      return 'End time must be after start time.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const mockRole = 'teacher';
      if (mockRole !== 'teacher') {
        setError('Access denied. Teachers only.');
        return;
      }
      const assignment = await saveAssignment(selectedCourseId, formData);
      setSuccess(
        `Assignment with ${assignment.questions.length} question(s) created successfully!`
      );
      setFormData({
        questions: [
          {
            id: `q${Math.random().toString(36).slice(2)}`,
            type: 'single-choice',
            question: '',
            score: 5,
            options: ['', '', '', ''],
            correctAnswer: '',
            template: '',
          },
        ],
        startTime: new Date().toISOString().slice(0, 16),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 16),
        allowMultipleSubmissions: false,
      });
      setSelectedCourseId(courses[0]?.id || '');
      onClose();
    } catch (err) {
      setError(`Failed to save assignment: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="mt-[380px] mb-[300px] bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 hover:text-slate-900"
        >
          <Close className="w-6 h-6" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-slate-700 mb-6">
          Create New Assignment
        </h2>

        {/* Course Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-600 mb-4">
            Select Course
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedCourseId === course.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <h4 className="text-md font-semibold text-slate-700">
                  {course.title}
                </h4>
                <p className="text-sm text-slate-500">{course.code}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CSV Import */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Import Questions from CSV
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVImport}
              className="w-full p-3 border border-slate-200 rounded-lg"
            />
            <p className="text-xs text-slate-500 mt-1">
              CSV format: type,question,score,options,correctAnswer,template
            </p>
          </div>

          {/* Questions */}
          <div>
            <h3 className="text-lg font-semibold text-slate-600 mb-4">
              Questions
            </h3>
            {formData.questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="border border-slate-200 rounded-lg p-4 mb-4 relative"
              >
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  disabled={formData.questions.length === 1}
                >
                  <Close className="w-5 h-5" />
                </button>
                <div className="space-y-4">
                  {/* Question Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Question Type
                    </label>
                    <select
                      value={question.type}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, 'type', e.target.value)
                      }
                      className="w-full py-3 px-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="single-choice">Single Choice</option>
                      <option value="programming">
                        Programming (Fill-in-the-Blank)
                      </option>
                    </select>
                  </div>

                  {/* Question */}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, 'question', e.target.value)
                      }
                      className="w-full py-3 px-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter the question"
                      required
                    />
                  </div>

                  {/* Score */}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Score
                    </label>
                    <input
                      type="number"
                      value={question.score}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, 'score', e.target.value)
                      }
                      className="w-full py-3 px-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      required
                    />
                  </div>

                  {/* Single Choice Options */}
                  {question.type === 'single-choice' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-600">
                        Options
                      </label>
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                qIndex,
                                optIndex,
                                e.target.value
                              )
                            }
                            className="w-full py-3 px-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Option ${optIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Correct Answer
                        </label>
                        <select
                          value={question.correctAnswer}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              'correctAnswer',
                              e.target.value
                            )
                          }
                          className="w-full py-3 px-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select correct answer</option>
                          {question.options.map((opt, index) => (
                            <option key={index} value={opt} disabled={!opt}>
                              {opt || `Option ${index + 1} (empty)`}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Programming Template */}
                  {question.type === 'programming' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Code Template (Optional)
                      </label>
                      <textarea
                        value={question.template}
                        onChange={(e) =>
                          handleQuestionChange(
                            qIndex,
                            'template',
                            e.target.value
                          )
                        }
                        className="w-full py-3 px-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="5"
                        placeholder="Enter code template or fill-in-the-blank prompt"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="bg-blue-100 text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200"
            >
              Add Another Question
            </button>
          </div>

          {/* Open Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Start Time
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full py-3 px-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                End Time
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full py-3 px-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Allow Multiple Submissions */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="allowMultipleSubmissions"
              checked={formData.allowMultipleSubmissions}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-200 rounded"
            />
            <label className="text-sm font-medium text-slate-600">
              Allow Multiple Submissions
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Create Assignment
            </button>
          </div>
        </form>

        {/* Placeholder for Grading */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Grading and Feedback
          </h3>
          <p className="text-sm text-slate-500">
            Single-choice questions will be graded automatically upon student
            submission. For programming and fill-in-the-blank questions, you can
            view and grade submissions manually after the end time.
          </p>
          <button
            onClick={() => setError('Manual grading is not yet implemented.')}
            className="mt-4 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300 transition-all duration-200"
            disabled
          >
            View Submissions (Coming Soon)
          </button>
        </div>
      </div>

      {/* Error/Success Toast */}
      {(error || success) && (
        <div className="fixed bottom-6 right-6 z-60">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
              error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {error ? (
                <ErrorOutline className="w-5 h-5" />
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

export default CreateAssignment;
