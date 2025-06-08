export default async function getClasses() {
  try {
    // Attempt to fetch classes from localStorage
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      return JSON.parse(storedClasses);
    }

    // Default mock data with new structure
    const mockClasses = [
      {
        classId: 'class-1',
        className: 'Advanced Calculus',
        teacherId: 'T-001',
        courseIds: ['course-001', 'course-002'],
        studentIds: ['S-001', 'S-002', 'S-003'],
        description: 'Advanced calculus and linear algebra concepts',
        year: 2024,
        semester: 'Fall',
        subject: 'Mathematics',
        schedule: 'Mon, Wed, Fri 10:00-11:00',
        createdTime: '2024-01-15T10:00:00Z',
      },
      {
        classId: 'class-2',
        className: 'Introduction to Computer Science',
        teacherId: 'T-002',
        courseIds: ['course-003', 'course-004'],
        studentIds: ['S-004', 'S-005'],
        description: 'Fundamentals of programming and computer science',
        year: 2024,
        semester: 'Fall',
        subject: 'Computer Science',
        schedule: 'Tue, Thu 14:00-15:30',
        createdTime: '2024-01-10T12:00:00Z',
      },
      {
        classId: 'class-3',
        className: 'Organic Chemistry Lab',
        teacherId: 'teacher-003',
        courseIds: ['course-005'],
        studentIds: ['S-006', 'S-007'],
        description: 'Hands-on laboratory work for organic chemistry',
        year: 2024,
        semester: 'Fall',
        subject: 'Chemistry',
        schedule: 'Wed 13:00-16:00',
        createdTime: '2024-01-20T14:00:00Z',
      },
    ];

    // Save to localStorage for persistence
    localStorage.setItem('classes', JSON.stringify(mockClasses));
    return mockClasses;
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}
