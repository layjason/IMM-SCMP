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
        year: 2024,
        classId: 'class-1',
        className: 'Class A',
        teacherId: 'T-001',
        courseIds: ['course-001', 'course-002'],
        studentIds: ['S-001', 'S-002', 'S-003'],
        createdTime: '2024-01-15T10:00:00Z',
      },
      {
        year: 2024,
        classId: 'class-2',
        className: 'Class B',
        teacherId: 'T-002',
        courseIds: ['course-003', 'course-004'],
        studentIds: ['S-004', 'S-005'],
        createdTime: '2024-01-10T12:00:00Z',
      },
      {
        year: 2023,
        classId: 'class-3',
        className: 'Class C',
        teacherId: 'teacher-003',
        courseIds: ['course-005'],
        studentIds: ['S-006', 'S-007'],
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
