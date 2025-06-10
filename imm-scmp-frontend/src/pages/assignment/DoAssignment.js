import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  CheckCircle,
  Close,
  ErrorOutline,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import {
  getCourses,
  getStudentData,
  saveStudentAnswer,
  submitAssignment,
  toggleFavorite,
} from '../../mockData/StudentAnswer.js';

function DoAssignment() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [course, setCourse] = useState(null);
  const [answers, setAnswers] = useState({});
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const studentId = 's1'; // Mock student ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, studentData] = await Promise.all([
          getCourses(),
          getStudentData(studentId),
        ]);
        let foundAssignment = null;
        let foundCourse = null;
        for (const c of coursesData) {
          const a = c.assignments.find((a) => a.id === parseInt(assignmentId));
          if (a) {
            foundAssignment = a;
            foundCourse = c;
            break;
          }
        }
        if (!foundAssignment) {
          setError('Assignment not found.');
          navigate('/courses');
          return;
        }
        if (studentData.userRole !== 'student') {
          setError('Access denied. Students only.');
          navigate('/courses');
          return;
        }
        setAssignment(foundAssignment);
        setCourse(foundCourse);
        setStudent(studentData);
        setAnswers(
          foundAssignment.questions.reduce(
            (acc, q) => ({
              ...acc,
              [q.id]: studentData.answers[assignmentId]?.[q.id]?.answer || '',
            }),
            {}
          )
        );
        setFavorites(studentData.favorites.map((f) => f.questionId));
        // Debug logs
        console.log('Assignment:', foundAssignment);
        console.log(
          'isWithinTime:',
          new Date() >= new Date(foundAssignment.startTime) &&
            new Date() <= new Date(foundAssignment.endTime)
        );
        console.log(
          'Answers:',
          foundAssignment.questions.reduce(
            (acc, q) => ({
              ...acc,
              [q.id]: studentData.answers[assignmentId]?.[q.id]?.answer || '',
            }),
            {}
          )
        );
      } catch (err) {
        setError('Failed to load assignment.');
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, [assignmentId, navigate]);

  useEffect(() => {
    if (!assignment || !student) return;
    const autosave = setInterval(async () => {
      for (const [questionId, answer] of Object.entries(answers)) {
        try {
          await saveStudentAnswer(studentId, assignmentId, questionId, answer);
          console.log('Autosaved:', { questionId, answer });
        } catch (err) {
          console.error('Autosave failed:', err);
        }
      }
    }, 10000); // Autosave every 10 seconds
    return () => clearInterval(autosave);
  }, [answers, assignment, student]);

  const handleAnswerChange = (questionId, answer) => {
    console.log('Answer changed:', { questionId, answer });
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    if (now < new Date(assignment.startTime)) {
      setError('Assignment not yet started.');
      return;
    }
    if (now > new Date(assignment.endTime)) {
      setError('Assignment has ended.');
      return;
    }
    try {
      const result = await submitAssignment(
        studentId,
        course.id,
        assignmentId,
        answers
      );
      setFeedbackData(result);
      setShowFeedback(true);
      setSuccess('Assignment submitted successfully!');
      console.log('Submission result:', result);
    } catch (err) {
      setError('Failed to submit assignment.');
      console.error('Submit error:', err);
    }
  };

  const handleRetry = () => {
    setShowFeedback(false);
    const newAnswers = {};
    feedbackData.feedback.forEach((f) => {
      if (f.score === 0) {
        newAnswers[f.questionId] = answers[f.questionId] || '';
      } else {
        newAnswers[f.questionId] = answers[f.questionId];
      }
    });
    setAnswers(newAnswers);
    console.log('Retry answers:', newAnswers);
  };

  const handleFavoriteToggle = async (questionId) => {
    try {
      const isFavorited = await toggleFavorite(
        studentId,
        course.id,
        assignmentId,
        questionId
      );
      setFavorites((prev) =>
        isFavorited
          ? [...prev, questionId]
          : prev.filter((id) => id !== questionId)
      );
      setSuccess(isFavorited ? 'Question favorited!' : 'Question unfavorited.');
      console.log('Favorite toggled:', { questionId, isFavorited });
    } catch (err) {
      setError('Failed to update favorite status.');
      console.error('Favorite error:', err);
    }
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
    setError('Copy and paste are disabled to prevent cheating.');
  };

  if (!assignment || !course) return null;

  const isWithinTime =
    new Date() >= new Date(assignment.startTime) &&
    new Date() <= new Date(assignment.endTime);
  const canRetry =
    assignment.allowMultipleSubmissions &&
    feedbackData?.feedback?.some((f) => f.score === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className=" bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
          <button
            onClick={() => navigate(`/assignment/${studentId}`)}
            className="justify-center flex items-center gap-2 text-slate-600 font-semibold py-2 px-4 hover:text-slate-900 transition-colors duration-200"
          >
            <ArrowBack className="w-5 h-5" />
            Back to My Assignment
          </button>
          <h1 className="text-2xl font-bold text-slate-700">
            Assignment for {course.title} ({course.code})
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-6">
            Assignment Due: {new Date(assignment.endTime).toLocaleString()}
          </h2>
          {!isWithinTime && (
            <p className="text-red-500 mb-4">
              {new Date() < new Date(assignment.startTime)
                ? 'Assignment has not started yet.'
                : 'Assignment has ended.'}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {assignment.questions.map((q, index) => (
              <div
                key={q.id}
                className="border border-slate-200 rounded-lg p-4 relative"
              >
                <button
                  type="button"
                  onClick={() => handleFavoriteToggle(q.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  {favorites.includes(q.id) ? (
                    <Favorite className="w-5 h-5" />
                  ) : (
                    <FavoriteBorder className="w-5 h-5" />
                  )}
                </button>
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  {index + 1}. {q.question} ({q.score} points)
                </h3>
                {q.type === 'single-choice' ? (
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={option}
                          checked={answers[q.id] === option}
                          onChange={() => handleAnswerChange(q.id, option)}
                          disabled={!isWithinTime}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                          onCopy={preventCopyPaste}
                          onPaste={preventCopyPaste}
                        />
                        <span className="text-slate-600">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={answers[q.id] || q.template || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="8"
                    placeholder="Enter your code or answer here"
                    disabled={!isWithinTime}
                    onCopy={preventCopyPaste}
                    onPaste={preventCopyPaste}
                  />
                )}
              </div>
            ))}
            {isWithinTime && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Submit Assignment
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && feedbackData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setShowFeedback(false)}
              className="absolute top-4 right-4 text-slate-600 hover:text-slate-900"
            >
              <Close className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-slate-700 mb-6">
              Assignment Feedback
            </h2>
            <p className="text-lg font-semibold text-slate-600 mb-4">
              Score: {feedbackData.totalScore} / {feedbackData.maxScore}
            </p>
            {feedbackData.feedback.map((f, index) => {
              const question = assignment.questions.find(
                (q) => q.id === f.questionId
              );
              return (
                <div key={f.questionId} className="mb-4">
                  <p className="text-md font-medium text-slate-600">
                    {index + 1}. {question.question} ({f.score} /{' '}
                    {question.score})
                  </p>
                  <p className="text-sm text-slate-500">{f.feedback}</p>
                </div>
              );
            })}
            <div className="flex justify-end gap-4">
              {canRetry && (
                <button
                  onClick={handleRetry}
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700"
                >
                  Retry Incorrect Questions
                </button>
              )}
              <button
                onClick={() => setShowFeedback(false)}
                className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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

export default DoAssignment;
