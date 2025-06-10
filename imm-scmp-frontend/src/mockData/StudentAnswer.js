import Papa from 'papaparse';

let courses = [
  {
    id: '1',
    name: 'Advanced React Development',
    title: '程序设计',
    code: 'CS101',
    assignments: [
      {
        id: 1,
        date: '2025-06-07',
        startTime: '2025-06-06T12:00',
        endTime: '2025-06-09T23:59',
        questions: [
          {
            id: 'q1',
            type: 'single-choice',
            question: 'What is 2+2?',
            score: 5,
            options: ['2', '4', '22', 'Error'],
            correctAnswer: '4',
            explanation: '2 + 2 equals 4 in basic arithmetic.',
          },
          {
            id: 'q2',
            type: 'programming',
            question: 'Write a function to reverse a string in Python.',
            score: 10,
            template: 'def reverse_string(s):\n    # Your code here',
            explanation:
              'Sample solution: def reverse_string(s):\n    return s[::-1]',
          },
        ],
        allowMultipleSubmissions: true,
        answer: '',
      },
    ],
  },
  {
    id: '2',
    name: 'Data Structures',
    title: '数据结构',
    code: 'CS102',
    assignments: [],
  },
];

let students = [
  {
    id: 's1',
    userRole: 'student',
    answers: {}, // { [assignmentId]: { [questionId]: { answer: string, attempts: number, score: number } } }
    favorites: [], // [ { courseId, assignmentId, questionId } ]
  },
];

export const getCourses = async () => {
  return courses;
};

export const getStudentData = async (studentId) => {
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error('Student not found');
  return student;
};

export const parseCSV = (fileContent) => {
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const questions = result.data.reduce((acc, row) => {
          const qType = row.type?.toLowerCase();
          if (!['single-choice', 'programming'].includes(qType)) {
            reject(new Error(`Invalid question type: ${qType}`));
            return acc;
          }
          return [
            ...acc,
            {
              id: `q${Math.random().toString(36).slice(2)}`,
              type: qType,
              question: row.question || '',
              score: parseInt(row.score, 10) || 1,
              options:
                qType === 'single-choice' && row.options
                  ? row.options.split(';').map((o) => o.trim())
                  : ['', '', '', ''],
              correctAnswer:
                qType === 'single-choice' ? row.correctAnswer || '' : '',
              template: qType === 'programming' ? row.template || '' : '',
              explanation: row.explanation || '',
            },
          ];
        }, []);
        resolve(questions);
      },
      error: (err) => reject(err),
    });
  });
};

export const saveAssignment = async (courseId, assignment) => {
  const course = courses.find((c) => c.id === courseId);
  if (!course) throw new Error('Course not found');
  const newAssignment = {
    id:
      courses.reduce(
        (max, c) => Math.max(max, ...c.assignments.map((a) => a.id || 0)),
        0
      ) + 1,
    date: assignment.endTime.split('T')[0],
    startTime: assignment.startTime,
    endTime: assignment.endTime,
    questions: assignment.questions.map((q) => ({
      id: `q${Math.random().toString(36).slice(2)}`,
      type: q.type,
      question: q.question,
      score: parseInt(q.score, 10),
      options: q.options || ['', '', '', ''],
      correctAnswer: q.correctAnswer || '',
      template: q.template || '',
      explanation: q.explanation || '',
    })),
    allowMultipleSubmissions: assignment.allowMultipleSubmissions,
    answer: '',
  };
  course.assignments.push(newAssignment);
  return newAssignment;
};

export const saveStudentAnswer = async (
  studentId,
  assignmentId,
  questionId,
  answer
) => {
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error('Student not found');
  if (!student.answers[assignmentId]) {
    student.answers[assignmentId] = {};
  }
  if (!student.answers[assignmentId][questionId]) {
    student.answers[assignmentId][questionId] = {
      answer: '',
      attempts: 0,
      score: 0,
    };
  }
  student.answers[assignmentId][questionId].answer = answer;
  student.answers[assignmentId][questionId].attempts += 1;
  return student.answers[assignmentId][questionId];
};

export const submitAssignment = async (
  studentId,
  courseId,
  assignmentId,
  answers
) => {
  const course = courses.find((c) => c.id === courseId);
  if (!course) throw new Error('Course not found');
  const assignment = course.assignments.find(
    (a) => a.id === parseInt(assignmentId)
  );
  if (!assignment) throw new Error('Assignment not found');
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error('Student not found');

  if (!student.answers[assignmentId]) {
    student.answers[assignmentId] = {};
  }

  let totalScore = 0;
  const feedback = assignment.questions.map((q) => {
    const studentAnswer = answers[q.id] || '';
    let score = 0;
    let feedbackText = '';

    if (q.type === 'single-choice') {
      const isCorrect = studentAnswer === q.correctAnswer;
      score = isCorrect ? q.score : 0;
      feedbackText = isCorrect
        ? `Correct! ${q.explanation}`
        : `Incorrect. Correct answer: ${q.correctAnswer}. ${q.explanation}`;
    } else {
      // Programming: Mock grading (e.g., check if non-empty)
      score = studentAnswer.trim() ? q.score / 2 : 0; // Half score for attempt
      feedbackText = `Manual grading required. Sample solution: ${q.explanation}`;
    }

    student.answers[assignmentId][q.id] = {
      answer: studentAnswer,
      attempts: (student.answers[assignmentId][q.id]?.attempts || 0) + 1,
      score,
    };

    totalScore += score;
    return { questionId: q.id, score, feedback: feedbackText };
  });

  return {
    totalScore,
    maxScore: assignment.questions.reduce((sum, q) => sum + q.score, 0),
    feedback,
  };
};

export const toggleFavorite = async (
  studentId,
  courseId,
  assignmentId,
  questionId
) => {
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error('Student not found');
  const favorite = { courseId, assignmentId, questionId };
  const index = student.favorites.findIndex(
    (f) =>
      f.courseId === courseId &&
      f.assignmentId === assignmentId &&
      f.questionId === questionId
  );
  if (index === -1) {
    student.favorites.push(favorite);
    return true; // Favorited
  } else {
    student.favorites.splice(index, 1);
    return false; // Unfavorited
  }
};

export const getFavorites = async (studentId) => {
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error('Student not found');
  return student.favorites
    .map((f) => {
      const course = courses.find((c) => c.id === f.courseId);
      const assignment = course?.assignments.find(
        (a) => a.id === parseInt(f.assignmentId)
      );
      const question = assignment?.questions.find((q) => q.id === f.questionId);
      return { ...f, question };
    })
    .filter((f) => f.question); // Filter out invalid references
};

export const getStudentSubmissions = () => {
  return [
    {
      studentId: 's1',
      studentName: '李明',
      answers: [
        { questionId: 'q1', answer: 'A', score: 5, feedback: '' },
        { questionId: 'q2', answer: 'Sample code', score: 0, feedback: '' },
      ],
    },
    {
      studentId: 's2',
      studentName: '王芳',
      answers: [
        { questionId: 'q1', answer: 'B', score: 0, feedback: '' },
        { questionId: 'q2', answer: 'Another code', score: 0, feedback: '' },
      ],
    },
  ];
};

export const saveTeacherScore = async (
  studentId,
  assignmentId,
  questionId,
  score,
  feedback
) => {
  console.log('Saved score:', {
    studentId,
    assignmentId,
    questionId,
    score,
    feedback,
  });
  return true;
};

export async function submitTeacherScores(studentId, assignmentId, scores) {
  // Validate inputs
  if (!studentId || !assignmentId || !Array.isArray(scores)) {
    throw new Error(
      'Invalid input: studentId, assignmentId, or scores missing'
    );
  }

  // Simulate saving scores to a mock database
  const totalScore = scores.reduce((sum, s) => sum + (s.score || 0), 0);
  const maxScore = scores.reduce((sum, s) => sum + (s.score ? s.score : 0), 0); // Adjust based on assignment questions
  const feedback = scores.map((s) => ({
    questionId: s.questionId,
    score: s.score || 0,
    feedback: s.feedback || '',
  }));

  // Simulate API response
  return {
    totalScore,
    maxScore,
    feedback,
  };
}
