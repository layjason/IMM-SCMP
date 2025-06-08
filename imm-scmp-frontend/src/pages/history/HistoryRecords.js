import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  GetApp,
  CheckCircle,
  ErrorOutline,
} from '@mui/icons-material';
import Papa from 'papaparse';
import {
  getCourses,
  getStudentData,
  getClassRankings,
  logMaterialAccess,
} from '../../mockData/mockDataHistory.js';
import { SidebarContext } from '../../utils/SidebarContext.js';

function HistoryRecords() {
  const navigate = useNavigate();
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 80;
  const [activeTab, setActiveTab] = useState('learningrecords');
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const studentId = 's1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, studentData] = await Promise.all([
          getCourses(),
          getStudentData(studentId),
        ]);
        if (studentData.userRole !== 'student') {
          setError('Access denied. Students only.');
          navigate('/courses');
          return;
        }
        setCourses(coursesData);
        setStudent(studentData);
      } catch (err) {
        setError('Failed to load data.');
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, [navigate]);

  const handleMaterialClick = async (courseId, materialId) => {
    try {
      await logMaterialAccess(studentId, courseId, materialId);
      setSuccess('Material access logged.');
    } catch (err) {
      setError('Failed to log material access.');
    }
  };

  const getFeedbackText = (q, answer) => {
    if (q.type === 'single-choice') {
      return answer === q.correctAnswer
        ? `Correct! ${q.explanation}`
        : `Incorrect. Correct answer: ${q.correctAnswer}. ${q.explanation}`;
    }
    return `Manual grading required. Sample solution: ${q.explanation}`;
  };

  const exportPracticeRecords = () => {
    const records = [];
    courses.forEach((course) => {
      course.assignments.forEach((assignment) => {
        const answers = student.answers[assignment.id] || {};
        assignment.questions.forEach((q, index) => {
          const answerData = answers[q.id] || {};
          records.push({
            Course: course.title,
            CourseCode: course.code,
            AssignmentID: assignment.id,
            QuestionNumber: index + 1,
            Question: q.question,
            Type: q.type,
            Answer: answerData.answer || 'No answer submitted',
            Score: answerData.score || 0,
            MaxScore: q.score,
            Feedback: getFeedbackText(q, answerData.answer),
          });
        });
      });
    });
    const csv = Papa.unparse(records);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `practice_records_${studentId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSuccess('Practice records exported as CSV.');
  };

  const exportPracticeReport = async (assignmentId, courseId) => {
    try {
      const course = courses.find((c) => c.id === courseId);
      const assignment = course.assignments.find(
        (a) => a.id === parseInt(assignmentId)
      );
      const answers = student.answers[assignmentId] || {};
      const totalScore = Object.values(answers).reduce(
        (sum, q) => sum + (q.score || 0),
        0
      );
      const maxScore = assignment.questions.reduce(
        (sum, q) => sum + q.score,
        0
      );
      const rankings = await getClassRankings(student.classId, assignmentId);
      const studentRank =
        rankings.find((r) => r.studentId === studentId)?.rank || 'N/A';

      const records = assignment.questions.map((q, index) => {
        const answerData = answers[q.id] || {};
        return {
          StudentName: student.name,
          StudentID: studentId,
          Course: course.title,
          CourseCode: course.code,
          AssignmentID: assignmentId,
          AssignmentDate: new Date(assignment.date).toLocaleDateString(),
          TotalScore: totalScore,
          MaxScore: maxScore,
          ClassRank: `${studentRank} / ${rankings.length}`,
          QuestionNumber: index + 1,
          Question: q.question,
          Answer: answerData.answer || 'No answer submitted',
          Score: answerData.score || 0,
          MaxQuestionScore: q.score,
          Feasibility: answerData.score === q.score ? 'Correct' : 'Incorrect',
        };
      });

      const csv = Papa.unparse(records);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `practice_report_${assignmentId}_${studentId}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSuccess(
        `Practice report exported as CSV for Assignment ${assignmentId}.`
      );
    } catch (err) {
      setError('Failed to export practice report.');
      console.error('Export error:', err);
    }
  };

  if (!student || !courses.length) return null;

  return (
    <div
      style={{ marginLeft: drawerWidth }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-blue-600 font-semibold py-2 px-4 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowBack className="w-5 h-5" />
            Back to Courses
          </button>
          <h1 className="text-2xl font-bold text-gray-700">Learning History</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex border-b mb-6">
            {['Learning Records', 'Practice Records', 'Practice Reports'].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab.toLowerCase().replace(' ', ''))
                  }
                  className={`px-4 py-2 font-semibold ${
                    activeTab === tab.toLowerCase().replace(' ', '')
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Learning Records Tab */}
          {activeTab === 'learningrecords' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Learning Records
              </h2>
              {courses.map((course) => (
                <div key={course.id} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    {course.title} ({course.code})
                  </h3>
                  <div className="space-y-2">
                    {course.chapters.map((chapter) => (
                      <div key={chapter.id} className="border-b py-2">
                        <p className="text-gray-600">{chapter.name}</p>
                        {course.materials
                          .filter((m) => m.chapterId === chapter.id)
                          .map((material) => (
                            <div
                              key={material.id}
                              className="flex justify-between items-center text-sm text-gray-500"
                            >
                              <a
                                href={material.url}
                                onClick={() =>
                                  handleMaterialClick(course.id, material.id)
                                }
                                className="text-blue-600 hover:underline"
                              >
                                {material.name} ({material.type})
                              </a>
                              <span>
                                Accessed:{' '}
                                {student.materialAccess.find(
                                  (ma) =>
                                    ma.courseId === course.id &&
                                    ma.materialId === material.id
                                )?.accessedAt || 'Not accessed'}
                              </span>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Practice Records Tab */}
          {activeTab === 'practicerecords' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Practice Records
                </h2>
                <button
                  onClick={exportPracticeRecords}
                  className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700"
                >
                  <GetApp className="w-5 h-5" />
                  Export Records as CSV
                </button>
              </div>
              {courses.map((course) => (
                <div key={course.id} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    {course.title} ({course.code})
                  </h3>
                  {course.assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="border rounded-lg p-4 mb-4"
                    >
                      <p className="text-gray-600">
                        Assignment {assignment.id} - Due:{' '}
                        {new Date(assignment.date).toLocaleDateString()}
                      </p>
                      {assignment.questions.map((q, index) => {
                        const answerData =
                          student.answers[assignment.id]?.[q.id] || {};
                        return (
                          <div key={q.id} className="mt-2">
                            <p className="text-sm font-medium text-gray-600">
                              {index + 1}. {q.question} ({answerData.score || 0}{' '}
                              / {q.score})
                            </p>
                            <p className="text-sm text-gray-500">
                              Answer:{' '}
                              {answerData.answer || 'No answer submitted'}
                            </p>
                            <p className="text-sm text-gray-500">
                              Feedback:{' '}
                              {q.type === 'single-choice'
                                ? answerData.answer === q.correctAnswer
                                  ? `Correct! ${q.explanation}`
                                  : `Incorrect. Correct answer: ${q.correctAnswer}. ${q.explanation}`
                                : `Manual grading required. Sample solution: ${q.explanation}`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Practice Reports Tab */}
          {activeTab === 'practicereports' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Practice Reports
              </h2>
              {courses.map((course) => (
                <div key={course.id} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    {course.title} ({course.code})
                  </h3>
                  {course.assignments.map((assignment) => {
                    const answers = student.answers[assignment.id] || {};
                    const totalScore = Object.values(answers).reduce(
                      (sum, q) => sum + (q.score || 0),
                      0
                    );
                    const maxScore = assignment.questions.reduce(
                      (sum, q) => sum + q.score,
                      0
                    );
                    return (
                      <div
                        key={assignment.id}
                        className="border rounded-lg p-4 mb-4"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-600">
                              Assignment {assignment.id} - Due:{' '}
                              {new Date(assignment.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Score: {totalScore} / {maxScore}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              exportPracticeReport(assignment.id, course.id)
                            }
                            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700"
                          >
                            <GetApp className="w-5 h-5" />
                            Export Report as CSV
                          </button>
                        </div>
                        <div className="mt-2">
                          <button
                            onClick={async () => {
                              try {
                                const rankings = await getClassRankings(
                                  student.classId,
                                  assignment.id
                                );
                                alert(
                                  `Your rank: ${rankings.find((r) => r.studentId === studentId)?.rank || 'N/A'} / ${rankings.length}`
                                );
                              } catch (err) {
                                setError('Failed to load rankings.');
                              }
                            }}
                            className="text-blue-500 hover:underline"
                          >
                            View Class Rank
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error/Success Toast */}
      {(error || success) && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
              error ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
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
                className="ml-2 text-white"
              >
                x
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryRecords;
