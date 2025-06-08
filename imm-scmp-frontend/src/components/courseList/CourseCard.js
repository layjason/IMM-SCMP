import React from 'react';
import { useNavigate } from 'react-router-dom';
import getId from '../../utils/getId';
import { ImportContacts, Info } from '@mui/icons-material';

const id = getId();
const CourseCard = ({ course }) => {
  const {
    title,
    code,
    description,
    instructor,
    year,
    students = 0,
    progress = 0,
  } = course;
  const navigate = useNavigate();

  const handleClick = () => navigate(`/courses/${id}/${course.id}`);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 h-[500px] flex flex-col">
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-md font-medium">
            {code}
          </span>
        </div>
        <button className="absolute top-4 right-4 text-white">
          <Info />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute bottom-10 left-4 right-4">
          <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-gray-200 transition-colors duration-200 drop-shadow-md text-center">
            {title}
          </h3>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed group-hover:text-blue-600 group-hover:scale-102 transition-all duration-100 transform origin-left">
          {description}
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              Instructor
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {instructor}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Year</span>
            <span className="text-sm font-semibold text-gray-700">{year}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Students</span>
            <span className="text-sm font-semibold text-gray-700">
              {students}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-500">Progress</span>
            <span className="text-xs font-bold text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <div className="flex space-x-2 mt-auto">
            <button
              onClick={handleClick}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Course
            </button>
            <button
              onClick={() => navigate('/resources')}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <ImportContacts />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
