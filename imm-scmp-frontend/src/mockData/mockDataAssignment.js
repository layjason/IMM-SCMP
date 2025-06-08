export const getCourses = async () => {
  return [
    {
      id: '1',
      title: '程序设计',
      code: 'CS101',
      description: 'Learn the basics of programming using Python.',
      instructor: 'Dr. Alice Smith',
      year: 2024,
      assignments: [
        {
          id: 1,
          date: '2025-06-07',
          question: 'Write a Python function',
          answer: '',
          completed: false,
        },
        {
          id: 2,
          date: '2025-06-08',
          question: 'Implement a loop',
          answer: 'Done',
          completed: true,
        },
      ],
    },
    {
      id: '2',
      title: '数据结构',
      code: 'CS201',
      description:
        'Understand fundamental data structures like arrays, stacks, and trees.',
      instructor: 'Prof. Bob Johnson',
      year: 2025,
      assignments: [
        {
          id: 3,
          date: '2025-06-07',
          question: 'Implement a stack',
          answer: '',
          completed: false,
        },
      ],
    },
    {
      id: '3',
      title: '计算机伦理',
      code: 'CS100',
      description: 'Computer science fundamentals.',
      instructor: 'Dr. Alice Johnson',
      year: 2023,
      assignments: [],
    },
    {
      id: '4',
      title: 'JavaScript程序设计',
      code: 'REACT301',
      description: 'Deep dive into React patterns and hooks.',
      instructor: 'Mr. Jason Lay',
      year: 2025,
      assignments: [
        {
          id: 4,
          date: '2025-06-07',
          question: 'Implement a custom hook',
          answer: 'Done',
          completed: true,
        },
        {
          id: 5,
          date: '2025-06-07',
          question: 'Create a context',
          answer: '',
          completed: false,
        },
      ],
    },
  ];
};

export const getCourseById = async (courseId) => {
  const courses = await getCourses();
  return courses.find((course) => course.id === courseId) || null;
};

export const getAssignmentById = async (assignmentId) => {
  const courses = await getCourses();
  for (const course of courses) {
    const assignment = course.assignments.find(
      (a) => a.id === Number(assignmentId)
    );
    if (assignment) {
      return { ...assignment, courseId: course.id, courseTitle: course.title };
    }
  }
  return null;
};
