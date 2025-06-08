// getCourses.js: Fetch courses for the current instructor (simulated with localStorage)
import getId from './getId';

// Fetch courses for the current instructor
const getCourses = async () => {
  try {
    // Get token and instructor ID
    const token = localStorage.getItem('token');
    const instructorId = getId() || 'S12345';

    if (!token) {
      console.error('No authentication token found');
      return [];
    }

    // Read courses from localStorage
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');

    // Filter by instructorId and map to CourseList format
    const courses = storedCourses
      .filter((course) => course.creatorId === instructorId)
      .map((course) => ({
        id: course.courseId,
        title: course.courseName,
        code: course.courseCode,
        description: course.objective,
        instructor: `Instructor ${course.creatorId}`, // Placeholder
        year: new Date(course.createdTime).getFullYear(),
      }));

    console.log('Fetched courses:', courses);

    // // Send GET request to Spring Boot backend (commented out)
    // const response = await fetch(
    //   `http://localhost:3001/api/v1/courses?instructorId=${instructorId}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    // // Handle response
    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(
    //     errorData.message || `Failed to fetch courses (Status: ${response.status})`
    //   );
    // }

    // // Map backend response to CourseList format
    // const courses = await response.json();
    // return courses.map((course) => ({
    //   id: course.courseId,
    //   title: course.courseName,
    //   code: course.courseCode,
    //   description: course.objective,
    //   instructor: `Instructor ${course.creatorId}`,
    //   year: new Date(course.createdTime).getFullYear(),
    // }));

    return courses;
  } catch (err) {
    console.error('Error fetching courses:', err.message);
    return [];
  }
};

export default getCourses;
