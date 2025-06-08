import Papa from 'papaparse';

let courses = [
  {
    id: '1',
    name: 'Advanced React Development',
    title: 'Software Engineering',
    code: 'CS101',
    chapters: [
      { id: 'ch1', name: 'React Basics', order: 1 },
      { id: 'ch2', name: 'Hooks and Context', order: 2 },
    ],
    materials: [
      {
        id: 1,
        chapterId: 'ch1',
        type: 'pdf',
        name: 'React Hooks Guide.pdf',
        url: '#',
        date: '2025-06-07',
      },
      {
        id: 2,
        chapterId: 'ch2',
        type: 'video',
        name: 'Context API Tutorial.mp4',
        url: '#',
        date: '2025-06-07',
      },
    ],
    assignments: [
      {
        id: 1,
        date: '2025-06-08',
        startTime: '2025-06-08T00:00',
        endTime: '2025-06-08T23:59',
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
    title: 'Data Structures',
    code: 'CS102',
    chapters: [{ id: 'ch3', name: 'Arrays and Linked Lists', order: 1 }],
    materials: [],
    assignments: [],
  },
];

let students = [
  {
    id: 's1',
    userRole: 'student',
    name: 'Student One',
    classId: 'class1',
    answers: {
      1: {
        q1: { answer: '4', attempts: 1, score: 5 },
        q2: {
          answer: 'def reverse_string(s):\n    return s[::-1]',
          attempts: 1,
          score: 5,
        },
      },
    },
    favorites: [],
    materialAccess: [
      { courseId: '1', materialId: 1, accessedAt: '2025-06-07T10:00' },
      { courseId: '1', materialId: 2, accessedAt: '2025-06-07T12:00' },
    ],
  },
  // Mock 9 other students for ranking
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `s${i + 2}`,
    userRole: 'student',
    name: `Student ${i + 2}`,
    classId: 'class1',
    answers: {
      1: {
        q1: { answer: i % 2 ? '4' : '2', attempts: 1, score: i % 2 ? 5 : 0 },
        q2: {
          answer: i % 3 ? 'def reverse_string(s):\n    return s[::-1]' : '',
          attempts: 1,
          score: i % 3 ? 5 : 0,
        },
      },
    },
    favorites: [],
    materialAccess: [],
  })),
];

let classes = [
  {
    id: 'class1',
    name: 'CS101 Spring 2025',
    studentIds: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'],
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

export const getClassRankings = async (classId, assignmentId) => {
  const classData = classes.find((c) => c.id === classId);
  if (!classData) throw new Error('Class not found');
  const rankings = classData.studentIds
    .map((studentId) => {
      const student = students.find((s) => s.id === studentId);
      const assignmentAnswers = student.answers[assignmentId] || {};
      const totalScore = Object.values(assignmentAnswers).reduce(
        (sum, q) => sum + (q.score || 0),
        0
      );
      return { studentId, name: student.name, score: totalScore };
    })
    .sort((a, b) => b.score - a.score)
    .map((r, index) => ({ ...r, rank: index + 1 }));
  return rankings;
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
      score = studentAnswer.trim() ? q.score / 2 : 0;
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
      f.questionId === f.questionId
  );
  if (index === -1) {
    student.favorites.push(favorite);
    return true;
  } else {
    student.favorites.splice(index, 1);
    return false;
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
    .filter((f) => f.question);
};

export const logMaterialAccess = async (studentId, courseId, materialId) => {
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error('Student not found');
  student.materialAccess.push({
    courseId,
    materialId,
    accessedAt: new Date().toISOString(),
  });
};
