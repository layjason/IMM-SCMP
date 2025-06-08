// import getId from './getId';

// Initialize mock courses
const initializeMockCourses = () => {
  const mockCourses = [
    {
      id: 'course-1622998800000',
      title: 'Introduction to Programming',
      code: 'CS101',
      description: 'Learn the basics of programming.',
      instructorId: 'T73066209',
      year: 2025,
      type: 'EXAM',
      chapters: ['Intro', 'Variables', 'Loops'],
      createdTime: '2025-06-08T12:00:00Z',
    },
    {
      id: 'course-1622998800001',
      title: 'Data Structures',
      code: 'CS201',
      description: 'Study advanced data structures.',
      instructorId: 'T73066209',
      year: 2025,
      type: 'INVESTIGATION',
      chapters: ['Arrays', 'Trees', 'Graphs'],
      createdTime: '2025-06-08T12:01:00Z',
    },
    {
      id: 'course-1622998800002',
      title: 'Algorithms',
      code: 'CS301',
      description: 'Explore algorithm design.',
      instructorId: 'T12345678',
      year: 2025,
      type: 'EXAM',
      chapters: ['Sorting', 'Searching'],
      createdTime: '2025-06-08T12:02:00Z',
    },
  ];

  if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify(mockCourses));
  }
};

const getCourses = async (instructorIdFromURL = null) => {
  try {
    const token = localStorage.getItem('token');
    console.log(
      'Fetching courses for instructorId:',
      instructorIdFromURL || 'all'
    );

    if (!token) {
      console.error('No authentication token found');
      return [];
    }

    initializeMockCourses();

    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');

    const courses = storedCourses
      .filter((course) => {
        if (!instructorIdFromURL) return true; // Return all if no instructorId
        return course.instructorId === instructorIdFromURL;
      })
      .map((course) => ({
        id: course.id,
        title: course.title,
        code: course.code,
        description: course.description,
        instructor: `Instructor ${course.instructorId}`,
        year: course.year,
        type: course.type,
        chapters: course.chapters,
      }));

    console.log('Fetched courses:', courses);
    return courses;
  } catch (err) {
    console.error('Error fetching courses:', err.message);
    return [];
  }
};

export default getCourses;
