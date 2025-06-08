// Mock data for classes
const mockClasses = [
  {
    id: 1,
    name: '232511',
    code: 'MATH-401-A',
    instructor: 'Dr. Sarah Johnson',
    subject: 'Mathematics',
    year: 2024,
    semester: 'Fall',
    description: 'Advanced calculus and linear algebra concepts',
    studentsCount: 25,
    maxCapacity: 30,
    schedule: 'Mon, Wed, Fri 10:00-11:00',
    courses: [
      { id: 1, title: 'Calculus III', code: 'CALC-301' },
      { id: 2, title: 'Linear Algebra', code: 'LA-250' },
    ],
    createdAt: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Introduction to Computer Science',
    code: 'CS-101-B',
    instructor: 'Prof. Michael Chen',
    subject: 'Computer Science',
    year: 2024,
    semester: 'Fall',
    description: 'Fundamentals of programming and computer science',
    studentsCount: 32,
    maxCapacity: 35,
    schedule: 'Tue, Thu 14:00-15:30',
    courses: [
      { id: 3, title: 'Programming Basics', code: 'PROG-100' },
      { id: 4, title: 'Data Structures', code: 'DS-150' },
    ],
    createdAt: '2024-01-10',
    status: 'active',
  },
  {
    id: 3,
    name: 'Organic Chemistry Lab',
    code: 'CHEM-301-L',
    instructor: 'Dr. Emily Rodriguez',
    subject: 'Chemistry',
    year: 2024,
    semester: 'Fall',
    description: 'Hands-on laboratory work for organic chemistry',
    studentsCount: 18,
    maxCapacity: 20,
    schedule: 'Wed 13:00-16:00',
    courses: [
      { id: 5, title: 'Organic Chemistry I', code: 'OCHEM-201' },
      { id: 6, title: 'Lab Techniques', code: 'LAB-101' },
    ],
    createdAt: '2024-01-20',
    status: 'active',
  },
  {
    id: 4,
    name: 'World History Survey',
    code: 'HIST-202-A',
    instructor: 'Prof. David Thompson',
    subject: 'History',
    year: 2024,
    semester: 'Fall',
    description: 'Comprehensive overview of world civilizations',
    studentsCount: 28,
    maxCapacity: 40,
    schedule: 'Mon, Wed 11:00-12:30',
    courses: [
      { id: 7, title: 'Ancient Civilizations', code: 'HIST-101' },
      { id: 8, title: 'Modern World', code: 'HIST-150' },
    ],
    createdAt: '2024-01-12',
    status: 'active',
  },
  {
    id: 5,
    name: 'Business Statistics',
    code: 'STAT-250-B',
    instructor: 'Dr. Lisa Wang',
    subject: 'Statistics',
    year: 2024,
    semester: 'Fall',
    description: 'Statistical methods for business applications',
    studentsCount: 22,
    maxCapacity: 25,
    schedule: 'Tue, Thu 09:00-10:30',
    courses: [
      { id: 9, title: 'Basic Statistics', code: 'STAT-101' },
      { id: 10, title: 'Business Math', code: 'BMATH-200' },
    ],
    createdAt: '2024-01-18',
    status: 'active',
  },
  {
    id: 6,
    name: 'Digital Marketing Workshop',
    code: 'MKT-301-W',
    instructor: 'Prof. James Miller',
    subject: 'Marketing',
    year: 2024,
    semester: 'Fall',
    description: 'Practical digital marketing strategies and tools',
    studentsCount: 15,
    maxCapacity: 20,
    schedule: 'Fri 14:00-17:00',
    courses: [
      { id: 11, title: 'Marketing Principles', code: 'MKT-101' },
      { id: 12, title: 'Social Media Marketing', code: 'SMM-200' },
    ],
    createdAt: '2024-01-22',
    status: 'active',
  },
];

// Simulate API call delay
const getClasses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClasses);
    }, 500); // Simulate 500ms delay
  });
};

export default getClasses;
