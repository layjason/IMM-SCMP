// Dummy data loader (replace with real DB call later)
const getCourses = async () => {
  return [
    {
      id: '1',
      title: '程序设计',
      code: 'CS101',
      description: 'Learn the basics of programming using Python.',
      instructor: 'Dr. Alice Smith',
      year: 2024,
    },
    {
      id: '2',
      title: '数据结构',
      code: 'CS201',
      description:
        'Understand fundamental data structures like arrays, stacks, and trees.',
      instructor: 'Prof. Bob Johnson',
      year: 2025,
    },
    {
      id: '3',
      title: '计算机伦理',
      code: 'CS100',
      description: 'Computer science fundamentals.',
      instructor: 'Dr. Alice Johnson',
      year: 2023,
    },
    {
      id: '4',
      title: 'JavaScript程序设计',
      code: 'REACT301',
      description: 'Deep dive into React patterns and hooks.',
      instructor: 'Mr. Jason Lay',
      year: 2025,
    },
    {
      id: '5',
      title: '数据库',
      code: 'DB202',
      description: 'Relational databases, indexing, and SQL.',
      instructor: 'Prof. Maria Gomez',
      year: 2024,
    },
    {
      id: '6',
      title: '操作系统',
      code: 'CS301',
      description: 'Processes, memory management, and file systems.',
      instructor: 'Prof. Kim Lee',
      year: 2025,
    },
    {
      id: '7',
      title: '机器学习',
      code: 'ML101',
      description: 'Supervised, unsupervised learning, and models.',
      instructor: 'Dr. Alan Turing',
      year: 2025,
    },
  ];
};

export default getCourses;
