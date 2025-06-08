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
        endTime: '2025-06-07T23:59',
        questions: [
          {
            id: 'q1',
            type: 'single-choice',
            question: 'What is 2+2?',
            score: 5,
            options: ['2', '4', '22', 'Error'],
            correctAnswer: '4',
          },
        ],
        allowMultipleSubmissions: false,
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

export const getCourses = async () => {
  return courses;
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
    })),
    allowMultipleSubmissions: assignment.allowMultipleSubmissions,
    answer: '',
  };
  course.assignments.push(newAssignment);
  return newAssignment;
};

export const gradeAssignment = (assignment, studentAnswers) => {
  const totalScore = assignment.questions.reduce((sum, q) => sum + q.score, 0);
  const feedbacks = assignment.questions.map((q, index) => {
    if (q.type === 'single-choice') {
      const isCorrect = studentAnswers[index] === q.correctAnswer;
      return {
        questionId: q.id,
        score: isCorrect ? q.score : 0,
        feedback: isCorrect
          ? 'Correct!'
          : `Incorrect. Correct answer: ${q.correctAnswer}`,
      };
    }
    return {
      questionId: q.id,
      score: 0,
      feedback: 'Manual grading required',
    };
  });
  return {
    totalScore: feedbacks.reduce((sum, f) => sum + f.score, 0),
    maxScore: totalScore,
    feedbacks,
  };
};
