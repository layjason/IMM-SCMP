import Papa from 'papaparse';

let courses = [
  {
    id: '1',
    name: 'Advanced React Development',
    title: '程序设计',
    code: 'CS101',
    classId: 'class1',
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
        permission: 'all',
        versions: [{ version: 1, date: '2025-06-07' }],
      },
      {
        id: 2,
        chapterId: 'ch2',
        type: 'video',
        name: 'Context API Tutorial.mp4',
        url: '#',
        date: '2025-06-07',
        permission: 'all',
        versions: [{ version: 1, date: '2025-06-07' }],
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
    title: '数据结构',
    code: 'CS102',
    classId: 'class2',
    chapters: [{ id: 'ch3', name: 'Arrays and Linked Lists', order: 1 }],
    materials: [],
    assignments: [],
  },
];

let users = [
  {
    id: 's1',
    userRole: 'student',
    name: 'Student One',
    classId: 'class1',
    email: 's1@example.com',
    password: 'password1', // Plaintext for mock, hash in production
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
  {
    id: 's2',
    userRole: 'student',
    name: 'Student Two',
    classId: null,
    email: 's2@example.com',
    password: 'password2',
    answers: {},
    favorites: [],
    materialAccess: [],
  },
  {
    id: 't1',
    userRole: 'teacher',
    name: 'Teacher One',
    classId: null,
    email: 't1@example.com',
    password: 'password3',
    answers: {},
    favorites: [],
    materialAccess: [],
  },
  // Mock 8 other students
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `s${i + 3}`,
    userRole: 'student',
    name: `Student ${i + 3}`,
    classId: 'class1',
    email: `s${i + 3}@example.com`,
    password: `password${i + 3}`,
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
    code: 'CLASS101',
    studentIds: ['s1', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'],
  },
  {
    id: 'class2',
    name: 'CS102 Spring 2025',
    code: 'CLASS102',
    studentIds: [],
  },
];

export const authenticateUser = async (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('邮箱或密码错误');
  return { id: user.id, userRole: user.userRole };
};

export const getCourses = async (userId = null) => {
  if (!userId) return courses;
  const user = users.find((u) => u.id === userId);
  if (!user || !user.classId) return [];
  return courses.filter((c) => c.classId === user.classId);
};

export const getStudentData = async (userId) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  return user;
};

export const joinClass = async (userId, classCode) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  if (user.classId) throw new Error('User already in a class');
  const classData = classes.find(
    (c) => c.code.toUpperCase() === classCode.toUpperCase()
  );
  if (!classData) throw new Error('Invalid class code');
  user.classId = classData.id;
  classData.studentIds.push(userId);
  return classData;
};

export const getClassRankings = async (classId, assignmentId) => {
  const classData = classes.find((c) => c.id === classId);
  if (!classData) throw new Error('Class not found');
  const rankings = classData.studentIds
    .map((userId) => {
      const user = users.find((u) => u.id === userId);
      const assignmentAnswers = user.answers[assignmentId] || {};
      const totalScore = Object.values(assignmentAnswers).reduce(
        (sum, q) => sum + (q.score || 0),
        0
      );
      return { userId, name: user.name, score: totalScore };
    })
    .sort((a, b) => b.score - a.score)
    .map((r, index) => ({ ...r, rank: index + 1 }));
  return rankings;
};

export const saveMaterial = async (courseId, file, chapterId, permission) => {
  const course = courses.find((c) => c.id === courseId);
  if (!course) throw new Error('Course not found');
  const extension = file.name.split('.').pop().toLowerCase();
  let type;
  switch (extension) {
    case 'pdf':
      type = 'pdf';
      break;
    case 'ppt':
    case 'pptx':
      type = 'ppt';
      break;
    case 'mp4':
      type = 'video';
      break;
    case 'zip':
      type = 'code';
      break;
    default:
      throw new Error('Unsupported file type');
  }
  const newMaterial = {
    id: course.materials.length + 1,
    chapterId,
    type,
    name: file.name,
    url: `#${file.name}`,
    date: new Date().toISOString().split('T')[0],
    permission,
    versions: [{ version: 1, date: new Date().toISOString().split('T')[0] }],
  };
  course.materials.push(newMaterial);
  return newMaterial;
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
  userId,
  assignmentId,
  questionId,
  answer
) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  if (!user.answers[assignmentId]) {
    user.answers[assignmentId] = {};
  }
  if (!user.answers[assignmentId][questionId]) {
    user.answers[assignmentId][questionId] = {
      answer: '',
      attempts: 0,
      score: 0,
    };
  }
  user.answers[assignmentId][questionId].answer = answer;
  user.answers[assignmentId][questionId].attempts += 1;
  return user.answers[assignmentId][questionId];
};

export const submitAssignment = async (
  userId,
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
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');

  if (!user.answers[assignmentId]) {
    user.answers[assignmentId] = {};
  }

  let totalScore = 0;
  const feedback = assignment.questions.map((q) => {
    const userAnswer = answers[q.id] || '';
    let score = 0;
    let feedbackText = '';

    if (q.type === 'single-choice') {
      const isCorrect = userAnswer === q.correctAnswer;
      score = isCorrect ? q.score : 0;
      feedbackText = isCorrect
        ? `Correct! ${q.explanation}`
        : `Incorrect. Correct answer: ${q.correctAnswer}. ${q.explanation}`;
    } else {
      score = userAnswer.trim() ? q.score / 2 : 0;
      feedbackText = `Manual grading required. Sample solution: ${q.explanation}`;
    }

    user.answers[assignmentId][q.id] = {
      answer: userAnswer,
      attempts: (user.answers[assignmentId][q.id]?.attempts || 0) + 1,
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
  userId,
  courseId,
  assignmentId,
  questionId
) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  const favorite = { courseId, assignmentId, questionId };
  const index = user.favorites.findIndex(
    (f) =>
      f.courseId === courseId &&
      f.assignmentId === assignmentId &&
      f.questionId === questionId
  );
  if (index === -1) {
    user.favorites.push(favorite);
    return true;
  } else {
    user.favorites.splice(index, 1);
    return false;
  }
};

export const getFavorites = async (userId) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  return user.favorites
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

export const logMaterialAccess = async (userId, courseId, materialId) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  user.materialAccess.push({
    courseId,
    materialId,
    accessedAt: new Date().toISOString(),
  });
};
