import React, { useState, useEffect, useContext } from 'react';
import { SidebarContext } from '../../utils/SidebarContext'; // 假设与CourseDetails使用相同上下文
import {
  Code,
  ArrowBack,
  CheckCircle,
  ErrorOutline,
  PictureAsPdf,
  Slideshow,
  Movie,
  FileUpload,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import getId from '../../utils/getId';
import getRole from '../../utils/getRole';

const ResourcePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 70;
  const [viewMode, setViewMode] = useState('chapter'); // 'chapter' or 'type'
  const [resources, setResources] = useState([]);
  const [chapters, setChapters] = useState([
    'Chapter 1',
    'Chapter 2',
    'Chapter 3',
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('pdf');
  const [fileChapter, setFileChapter] = useState('Chapter 1');
  const [filePermission, setFilePermission] = useState('all');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock data fetch for resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Mock API call
        const mockResources = [
          {
            id: 1,
            name: 'Introduction to Algebra.pdf',
            type: 'pdf',
            chapter: 'Chapter 1',
            permission: 'all',
            versions: [{ version: 1, date: '2025-06-01' }],
          },
          {
            id: 2,
            name: 'Lecture 1 Slides.ppt',
            type: 'ppt',
            chapter: 'Chapter 1',
            permission: 'classA',
            versions: [
              { version: 1, date: '2025-06-02' },
              { version: 2, date: '2025-06-03' },
            ],
          },
          {
            id: 3,
            name: 'Sorting Algorithms.mp4',
            type: 'video',
            chapter: 'Chapter 2',
            permission: 'all',
            versions: [{ version: 1, date: '2025-06-04' }],
          },
          {
            id: 4,
            name: 'BinaryTree.py',
            type: 'code',
            chapter: 'Chapter 3',
            permission: 'classB',
            versions: [{ version: 1, date: '2025-06-05' }],
          },
        ];
        setResources(mockResources);
      } catch (err) {
        setError('Failed to load resources.');
      }
    };
    fetchResources();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    try {
      // Mock upload
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newResource = {
        id: resources.length + 1,
        name: file.name,
        type: fileType,
        chapter: fileChapter,
        permission: filePermission,
        versions: [
          { version: 1, date: new Date().toISOString().split('T')[0] },
        ],
      };
      setResources([...resources, newResource]);
      setChapters(chapters);
      setSuccess('File uploaded successfully!');
      setUploadModalOpen(false);
      setFile(null);
    } catch (err) {
      setError('Failed to upload file.');
    }
  };

  const filteredResources = selectedCategory
    ? resources.filter((resource) =>
        viewMode === 'chapter'
          ? resource.chapter === selectedCategory
          : resource.type === selectedCategory
      )
    : resources;

  const getIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdf className="w-5 h-5 text-slate-600" />;
      case 'ppt':
        return <Slideshow className="w-5 h-5 text-slate-600" />;
      case 'video':
        return <Movie className="w-5 h-5 text-slate-600" />;
      case 'code':
        return <Code className="w-5 h-5 text-slate-600" />;
      default:
        return null;
    }
  };

  const id = getId();
  const userRole = getRole(id);
  //   const userRole = 'STUDENT';
  return (
    <div
      style={{ marginLeft: `${drawerWidth}px` }}
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}
    >
      {/* Header */}
      <div className="flex justify-center bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className={`mt-20 flex items-center gap-2 text-slate-600 font-semibold py-2 px-6 ${
            drawerWidth === 80 ? 'ml-20' : ''
          }`}
        >
          <ArrowBack className="w-5 h-5" />
          Back to Course
        </button>
        <div className="ml-[-1px] mt-20 max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-700">
            Course Resources
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-end">
          {userRole === 'TEACHER' && (
            <button
              onClick={() => setUploadModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 items-center gap-2 shadow-md hover:shadow-lg"
            >
              <FileUpload className="w-5 h-5" /> Upload Resource
            </button>
          )}
        </div>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
          {/* Sidebar Section */}
          <div className="lg:w-1/3 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6">
            <div className="flex space-x-4 mb-6">
              <button
                className={`flex-1 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  viewMode === 'chapter'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                onClick={() => {
                  setViewMode('chapter');
                  setSelectedCategory(null);
                }}
              >
                By Chapter
              </button>
              <button
                className={`flex-1 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  viewMode === 'type'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                onClick={() => {
                  setViewMode('type');
                  setSelectedCategory(null);
                }}
              >
                By Type
              </button>
            </div>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              {viewMode === 'chapter' ? 'Chapters' : 'Types'}
            </h2>
            <ul className="space-y-2">
              {(viewMode === 'chapter'
                ? chapters
                : ['pdf', 'ppt', 'video', 'code']
              ).map((category) => (
                <li
                  key={category}
                  className={`p-3 cursor-pointer rounded-xl transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Resource List Section */}
          <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Resources {selectedCategory ? `(${selectedCategory})` : '(All)'}
            </h2>
            <div className="space-y-4">
              {filteredResources.length === 0 ? (
                <p className="text-slate-500">No resources available.</p>
              ) : (
                filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="p-4 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      {getIcon(resource.type)}
                      <div>
                        <p className="font-medium text-slate-700">
                          {resource.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          Chapter: {resource.chapter} | Type: {resource.type} |
                          Permission: {resource.permission}
                        </p>
                        <p className="text-sm text-slate-500">
                          Latest Version:{' '}
                          {
                            resource.versions[resource.versions.length - 1]
                              .version
                          }{' '}
                          (
                          {resource.versions[resource.versions.length - 1].date}
                          )
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200">
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200">
                        Download
                      </button>
                      {userRole == 'TEACHER' && (
                        <select className="px-3 py-1 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          {resource.versions.map((v) => (
                            <option key={v.version} value={v.version}>
                              Version {v.version} ({v.date})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Upload Resource
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  File
                </label>
                <input
                  type="file"
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Type
                </label>
                <select
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                >
                  <option value="pdf">PDF</option>
                  <option value="ppt">PPT</option>
                  <option value="video">Video</option>
                  <option value="code">Code</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Chapter
                </label>
                <select
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={fileChapter}
                  onChange={(e) => setFileChapter(e.target.value)}
                >
                  {chapters.map((ch) => (
                    <option key={ch} value={ch}>
                      {ch}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Permission
                </label>
                <select
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filePermission}
                  onChange={(e) => setFilePermission(e.target.value)}
                >
                  <option value="all">All Students</option>
                  <option value="classA">Class A</option>
                  <option value="classB">Class B</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all duration-200"
                  onClick={() => setUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error/Success Toast */}
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
};

export default ResourcePage;
