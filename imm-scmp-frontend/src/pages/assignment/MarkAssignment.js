import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  CheckCircle,
  ErrorOutline,
  Check,
  Close,
} from '@mui/icons-material';
import {
  getCourses,
  getStudentSubmissions,
  saveTeacherScore,
  submitTeacherScores,
} from '../../mockData/StudentAnswer.js';

function MarkAssignment() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [course, setCourse] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [scores, setScores] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, submissionsData] = await Promise.all([
          getCourses(),
          getStudentSubmissions(assignmentId),
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
        setAssignment(foundAssignment);
        setCourse(foundCourse);
        setSubmissions(submissionsData);
        if (submissionsData.length > 0) {
          setSelectedStudentId(submissionsData[0].studentId);
        }
      } catch (err) {
        setError('Failed to load assignment or submissions.');
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, [assignmentId, navigate]);

  useEffect(() => {
    if (!assignment || !selectedStudentId) return;
    const autosave = setInterval(async () => {
      for (const [questionId, score] of Object.entries(scores)) {
        const feedback = feedbacks[questionId] || '';
        try {
          await saveTeacherScore(
            selectedStudentId,
            assignmentId,
            questionId,
            score,
            feedback
          );
          console.log('Autosaved:', { questionId, score, feedback });
        } catch (err) {
          console.error('Autosave failed:', err);
        }
      }
    }, 10000); // Autosave every 10 seconds
    return () => clearInterval(autosave);
  }, [scores, feedbacks, assignment, selectedStudentId]);

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);
    const studentSubmission = submissions.find(
      (s) => s.studentId === studentId
    );
    if (studentSubmission) {
      setScores(
        studentSubmission.answers.reduce(
          (acc, q) => ({
            ...acc,
            [q.questionId]: q.score || 0,
          }),
          {}
        )
      );
      setFeedbacks(
        studentSubmission.answers.reduce(
          (acc, q) => ({
            ...acc,
            [q.questionId]: q.feedback || '',
          }),
          {}
        )
      );
    } else {
      setScores({});
      setFeedbacks({});
    }
  };

  const handleScoreChange = (questionId, score) => {
    setScores((prev) => ({ ...prev, [questionId]: parseInt(score) || 0 }));
  };

  const handleFeedbackChange = (questionId, feedback) => {
    setFeedbacks((prev) => ({ ...prev, [questionId]: feedback }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitTeacherScores(
        selectedStudentId,
        assignmentId,
        Object.entries(scores).map(([questionId, score]) => ({
          questionId,
          score,
          feedback: feedbacks[questionId] || '',
        }))
      );
      setFeedbackData(result);
      setShowFeedback(true);
      setSuccess('Scores submitted successfully!');
      console.log('Submission result:', result);
    } catch (err) {
      setError('Failed to submit scores.');
      console.error('Submit error:', err);
    }
  };

  if (!assignment || !course) return null;

  const selectedSubmission = submissions.find(
    (s) => s.studentId === selectedStudentId
  );
  const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0);
  const maxScore = assignment.questions.reduce((sum, q) => sum + q.score, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="justify-center flex items-center gap-2 text-slate-600 font-semibold py-2 px-4 hover:text-slate-900 transition-colors duration-200"
          >
            <ArrowBack className="w-5 h-5" />
            Back to Course
          </button>
          <h1 className="text-2xl font-bold text-slate-700">
            Grading for {course.title} ({course.code})
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-6">
            Assignment Due: {new Date(assignment.endTime).toLocaleString()}
          </h2>
          {/* Student Selector */}
          <div className="mb-6">
            <label className="text-lg font-medium text-slate-600 mr-4">
              Select Student:
            </label>
            <select
              value={selectedStudentId}
              onChange={handleStudentChange}
              className="p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {submissions.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  {s.studentName} ({s.studentId})
                </option>
              ))}
            </select>
          </div>
          {selectedSubmission ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {assignment.questions.map((q, index) => {
                const studentAnswer = selectedSubmission.answers.find(
                  (a) => a.questionId === q.id
                );
                const isCorrect =
                  q.type === 'single-choice' &&
                  studentAnswer?.answer === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className="border border-slate-200 rounded-lg p-4"
                  >
                    <h3 className="text-lg font-medium text-slate-600 mb-2">
                      {index + 1}. {q.question} ({q.score} points)
                    </h3>
                    {q.type === 'single-choice' ? (
                      <div className="space-y-2">
                        <p className="text-sm text-slate-600">
                          Student Answer:{' '}
                          {studentAnswer?.answer || 'Not answered'}
                        </p>
                        <p className="text-sm text-slate-600">
                          Correct Answer: {q.correctAnswer}
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {isCorrect ? (
                            <span>
                              <Check className="w-5 h-5 inline mr-1" /> Correct
                            </span>
                          ) : (
                            <span>
                              <Close className="w-5 h-5 inline mr-1" />{' '}
                              Incorrect
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-slate-600">
                          Score: {isCorrect ? q.score : 0} / {q.score}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-slate-600">
                          Student Answer:{' '}
                          {studentAnswer?.answer || 'Not answered'}
                        </p>
                        <label className="text-sm text-slate-600">
                          Score (0-{q.score}):
                          <input
                            type="number"
                            min="0"
                            max={q.score}
                            value={scores[q.id] || 0}
                            onChange={(e) =>
                              handleScoreChange(q.id, e.target.value)
                            }
                            className="ml-2 p-1 border border-slate-200 rounded-lg w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </label>
                        <textarea
                          value={feedbacks[q.id] || ''}
                          onChange={(e) =>
                            handleFeedbackChange(q.id, e.target.value)
                          }
                          className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="4"
                          placeholder="Enter feedback for this answer"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-slate-600">
                  Total Score: {totalScore} / {maxScore}
                </p>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Submit Scores
                </button>
              </div>
            </form>
          ) : (
            <p className="text-slate-600">No submission available.</p>
          )}
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
              Grading Summary
            </h2>
            <p className="text-lg font-semibold text-slate-600 mb-4">
              Total Score: {feedbackData.totalScore} / {feedbackData.maxScore}
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
                  <p className="text-sm text-slate-500">
                    Feedback: {f.feedback || 'No feedback provided.'}
                  </p>
                </div>
              );
            })}
            <div className="flex justify-end">
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

export default MarkAssignment;
