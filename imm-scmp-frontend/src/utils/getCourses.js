import getId from './getId';

export default async function getCourses() {
  try {
    // Get instructor ID
    const instructorId = getId();
    console.log(instructorId);

    // Attempt to fetch courses from localStorage
    const storedCourses = localStorage.getItem('courses');
    let courses = storedCourses ? JSON.parse(storedCourses) : [];

    // If no courses, use default mock data
    if (courses.length === 0) {
      courses = [
        {
          courseId: 'course-001',
          courseName: 'Calculus III',
          objective: 'Master multivariable calculus concepts',
          creatorId: 'T-001',
          createdTime: '2024-01-01T10:00:00Z',
          chapters: [{ chapterNumber: 1, chapterTitle: 'Vectors' }],
          assessmentMethod: 'EXAM',
        },
        {
          courseId: 'course-002',
          courseName: 'Linear Algebra',
          objective: 'Understand matrix operations and linear transformations',
          creatorId: 'T-001',
          createdTime: '2024-01-02T10:00:00Z',
          chapters: [{ chapterNumber: 1, chapterTitle: 'Matrices' }],
          assessmentMethod: 'EXAM',
        },
        {
          courseId: 'course-003',
          courseName: 'Programming Basics',
          objective: 'Learn fundamental programming concepts',
          creatorId: 'T-002',
          createdTime: '2024-01-03T10:00:00Z',
          chapters: [
            { chapterNumber: 1, chapterTitle: 'Introduction to Python' },
          ],
          assessmentMethod: 'EXAM',
        },
        {
          courseId: 'course-004',
          courseName: 'Data Structures',
          objective: 'Explore data structures like lists and trees',
          creatorId: 'T-002',
          createdTime: '2024-01-04T10:00:00Z',
          chapters: [{ chapterNumber: 1, chapterTitle: 'Arrays' }],
          assessmentMethod: 'EXAM',
        },
        {
          courseId: 'course-005',
          courseName: 'Organic Chemistry I',
          objective: 'Study organic compounds and reactions',
          creatorId: 'T-003',
          createdTime: '2024-01-05T10:00:00Z',
          chapters: [{ chapterNumber: 1, chapterTitle: 'Hydrocarbons' }],
          assessmentMethod: 'EXAM',
        },
      ];
      localStorage.setItem('courses', JSON.stringify(courses));
    }

    // Filter by instructorId and map to CourseList/ClassCard format
    return (
      courses
        // .filter((course) => course.creatorId === instructorId)
        .map((course) => ({
          id: course.courseId,
          title: course.courseName,
          code: course.courseCode,
          description: course.objective,
          instructor: `Instructor ${course.creatorId}`,
          year: new Date(course.createdTime).getFullYear(),
          students: 0, // Placeholder, as CourseCard expects this
          progress: 0, // Placeholder, as CourseCard expects this
        }))
    );
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}
