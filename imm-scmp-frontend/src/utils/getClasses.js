export default async function getClasses() {
  try {
    // Default mock data with new structure
    const mockClasses = [
      {
        classId: 'class-1',
        classCode: 'C-001',
        className: 'Class A',
        teacherId: 'T0000006',
        courseIds: ['course-001', 'course-002'],
        studentIds: ['S-001', 'S-002', 'S-003'],
        createdTime: '2024-01-15T10:00:00Z',
      },
      {
        classId: 'class-2',
        classCode: 'C-002',
        className: 'Class B',
        teacherId: 'T0000006',
        courseIds: ['course-003', 'course-004'],
        studentIds: ['S-004', 'S-005'],
        createdTime: '2024-01-10T12:00:00Z',
      },
      {
        classId: 'class-3',
        classCode: 'C-003',
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
