import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';
import {
  ArrowBack,
  CheckCircle,
  ErrorOutline,
  People,
} from '@mui/icons-material';
import TeacherControls from '../../components/courseDetails/TeacherControls';
import StudentManagement from '../../components/courseDetails/StudentManagement';
import MaterialList from '../../components/courseDetails/MaterialList';
import AssignmentList from '../../components/courseDetails/AssignmentList';
import getId from '../../utils/getId';
import getRole from '../../utils/getRole';
import getCourses from '../../utils/getCourses';
import { SidebarContext } from '../../utils/SidebarContext';
import CreateAssignment from '../assignment/CreateAssignment';

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ title: '' });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [file, setFile] = useState(null);
  const [showStudentManagement, setShowStudentManagement] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 80;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await getCourses();
        const foundCourse = courses.find((c) => c.id === courseId);
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          throw new Error('Course not found');
        }

        // Mock materials and assignments
        const mockMaterials = [
          {
            id: 1,
            date: '2025-06-07',
            type: 'pdf',
            name: 'Course Material.pdf',
            url: '#',
          },
        ];
        const mockAssignments = [
          {
            id: 1,
            date: '2025-06-07',
            question: 'Complete the course exercise',
            answer: '',
          },
        ];
        setMaterials(mockMaterials);
        setAssignments(mockAssignments);

        const role = getRole(getId()) || 'TEACHER';
        setUserRole(role);
      } catch (err) {
        setError('Failed to load course details.');
      }
    };
    fetchCourse();
  }, [courseId]);

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const dateStr = date.toISOString().split('T')[0];
    const hasMaterials = materials.some((m) => m.date === dateStr);
    const hasAssignments = assignments.some((a) => a.date === dateStr);

    return (
      <div className="flex gap-1 justify-center">
        {hasMaterials && (
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        )}
        {hasAssignments && (
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
        )}
      </div>
    );
  };

  const filteredMaterials = materials.filter(
    (m) => m.date === selectedDate.toISOString().split('T')[0]
  );
  const filteredAssignments = assignments.filter(
    (a) => a.date === selectedDate.toISOString().split('T')[0]
  );

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMaterials([
        ...materials,
        {
          id: materials.length + 1,
          date: selectedDate.toISOString().split('T')[0],
          type: file.name.split('.').pop().toLowerCase(),
          name: file.name,
          url: '#',
        },
      ]);
      setSuccess('File uploaded successfully!');
      setFile(null);
    } catch (err) {
      setError('Failed to upload file.');
    }
  };

  const handleGoToAssignment = (assignmentId) => {
    navigate(`/course/${courseId}/assignment/${assignmentId}`);
  };

  return (
    <div
      className={`ml-[${drawerWidth}px] min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}
    >
      <div className="flex justify-center bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <button
          onClick={() => navigate(`/courses/${getId()}`)}
          className={`mt-20 flex items-center gap-2 text-slate-600 font-semibold py-2 px-6 ${
            drawerWidth === 80 ? 'ml-20' : ''
          }`}
        >
          <ArrowBack className="w-5 h-5" />
          Back to Courses
        </button>
        <div className="ml-[-1px] mt-20 max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-700">{course.title}</h1>
        </div>
      </div>
      <div className="flex justify-end mr-10 mt-5">
        {userRole === 'TEACHER' && (
          <button
            onClick={() => setShowStudentManagement(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 items-center gap-2 shadow-md hover:shadow-lg"
          >
            <People className="w-5 h-5" /> Student Management
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Course Calendar
          </h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            className="border-none bg-transparent"
          />
          <p className="text-sm text-slate-500 mt-4">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Lesson Materials
            <span className="inline-block w-3 h-3 bg-orange-500 rounded-full ml-4 mr-2"></span>
            Assignments
          </p>
        </div>

        <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            {`Content for ${selectedDate.toLocaleDateString('en-US')}`}
          </h2>
          <MaterialList materials={filteredMaterials} />
          <AssignmentList
            assignments={filteredAssignments}
            userRole={userRole}
            handleGoToAssignment={handleGoToAssignment}
          />

          {userRole === 'TEACHER' && (
            <TeacherControls
              setFile={setFile}
              handleFileUpload={handleFileUpload}
              setShowCreateAssignment={setShowCreateAssignment}
            />
          )}
          {showCreateAssignment && userRole === 'TEACHER' && (
            <CreateAssignment
              isOpen={true}
              date={selectedDate}
              onClose={() => setShowCreateAssignment(false)}
              onSave={(newAssignment) => {
                setAssignments([...assignments, newAssignment]);
                setShowCreateAssignment(false);
              }}
            />
          )}
        </div>
        {showStudentManagement && userRole === 'TEACHER' && (
          <StudentManagement
            courseId={courseId}
            onClose={() => setShowStudentManagement(false)}
          />
        )}
      </div>

      {(error || success) && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
              error ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {error ? (
                <ErrorOutline className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{error || success}</span>
              <button
                onClick={() => {
                  setError('');
                  setSuccess('');
                }}
                className="ml-2 text-white/80 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
