import React, { useState, useEffect } from 'react';
import {
  Edit,
  Delete,
  PersonAdd,
  Class,
  ErrorOutline,
  CheckCircle,
  Close,
} from '@mui/icons-material';

function StudentManagement({ courseId, onClose }) {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editClass, setEditClass] = useState(null);
  const [newClassName, setNewClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock data fetch
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const mockClasses = [
          {
            id: 1,
            name: '班级 A',
            students: [
              {
                id: 1,
                name: '张伟',
                studentId: 'S001',
                email: 'zhangwei@example.com',
              },
              {
                id: 2,
                name: '李娜',
                studentId: 'S002',
                email: 'lina@example.com',
              },
            ],
          },
          { id: 2, name: '班级 B', students: [] },
        ];
        setClasses(mockClasses);
      } catch (err) {
        setError('加载班级列表失败。');
      }
    };
    fetchClasses();
  }, [courseId]);

  // 更新学生列表
  useEffect(() => {
    if (selectedClass) {
      const classData = classes.find((c) => c.id === selectedClass.id);
      setStudents(classData ? classData.students : []);
    } else {
      setStudents([]);
    }
  }, [selectedClass, classes]);

  // 处理添加班级
  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!newClassName) {
      setError('请输入班级名称。');
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClasses([
        ...classes,
        { id: classes.length + 1, name: newClassName, students: [] },
      ]);
      setSuccess('班级添加成功！');
      setNewClassName('');
    } catch (err) {
      setError('添加班级失败。');
    }
  };

  // 处理编辑班级
  const handleEditClass = async (e) => {
    e.preventDefault();
    if (!editClass.name) {
      setError('请输入班级名称。');
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClasses(
        classes.map((c) =>
          c.id === editClass.id ? { ...c, name: editClass.name } : c
        )
      );
      setSuccess('班级更新成功！');
      setEditClass(null);
    } catch (err) {
      setError('更新班级失败。');
    }
  };

  // 处理删除班级
  const handleDeleteClass = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClasses(classes.filter((c) => c.id !== id));
      if (selectedClass && selectedClass.id === id) {
        setSelectedClass(null);
      }
      setSuccess('班级删除成功！');
    } catch (err) {
      setError('删除班级失败。');
    }
  };

  // 处理添加学生
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (
      !newStudent.name ||
      !newStudent.studentId ||
      !newStudent.email ||
      !selectedClass
    ) {
      setError('请填写所有字段并选择班级。');
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClasses(
        classes.map((c) =>
          c.id === selectedClass.id
            ? {
                ...c,
                students: [
                  ...c.students,
                  { id: c.students.length + 1, ...newStudent },
                ],
              }
            : c
        )
      );
      setSuccess('学生添加成功！');
      setNewStudent({ name: '', studentId: '', email: '' });
    } catch (err) {
      setError('添加学生失败。');
    }
  };

  // 处理编辑学生
  const handleEditStudent = async (e) => {
    e.preventDefault();
    if (!editStudent.name || !editStudent.studentId || !editStudent.email) {
      setError('请填写所有字段。');
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClasses(
        classes.map((c) =>
          c.id === selectedClass.id
            ? {
                ...c,
                students: c.students.map((s) =>
                  s.id === editStudent.id ? { ...editStudent } : s
                ),
              }
            : c
        )
      );
      setSuccess('学生信息更新成功！');
      setEditStudent(null);
    } catch (err) {
      setError('更新学生信息失败。');
    }
  };

  // 处理删除学生
  const handleDeleteStudent = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClasses(
        classes.map((c) =>
          c.id === selectedClass.id
            ? { ...c, students: c.students.filter((s) => s.id !== id) }
            : c
        )
      );
      setSuccess('学生删除成功！');
    } catch (err) {
      setError('删除学生失败。');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-700">学生管理</h2>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800"
          >
            <Close className="w-6 h-6" />
          </button>
        </div>

        {/* 班级管理 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-slate-600 mb-3 flex items-center gap-2">
            <Class className="text-blue-600" /> 班级列表
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors duration-200 ${
                  selectedClass?.id === cls.id
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-slate-50 hover:bg-slate-100'
                } border`}
                onClick={() => setSelectedClass(cls)}
              >
                <span className="text-slate-700 font-medium">{cls.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditClass(cls);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClass(cls.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 添加/编辑班级 */}
          <form
            onSubmit={editClass ? handleEditClass : handleAddClass}
            className="space-y-4"
          >
            <input
              type="text"
              value={editClass ? editClass.name : newClassName}
              onChange={(e) =>
                editClass
                  ? setEditClass({ ...editClass, name: e.target.value })
                  : setNewClassName(e.target.value)
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
              placeholder="班级名称"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
              >
                {editClass ? '保存' : '添加班级'}
              </button>
              {editClass && (
                <button
                  onClick={() => setEditClass(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-xl transition-all duration-200"
                >
                  取消
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 学生管理 */}
        {selectedClass && (
          <div>
            <h3 className="text-lg font-medium text-slate-600 mb-3 flex items-center gap-2">
              <PersonAdd className="text-blue-600" /> {selectedClass.name}{' '}
              学生列表
            </h3>
            <div className="mb-6">
              {students.length > 0 ? (
                <ul className="space-y-2">
                  {students.map((student) => (
                    <li
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <span className="text-slate-700 font-medium">
                          {student.name}
                        </span>
                        <span className="text-slate-500 ml-2">
                          ({student.studentId})
                        </span>
                        <span className="text-slate-500 ml-2">
                          {student.email}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditStudent(student)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Delete className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500">暂无学生。</p>
              )}
            </div>

            {/* 编辑学生 */}
            {editStudent && (
              <div className="mb-6">
                <h4 className="text-md font-medium text-slate-600 mb-2">
                  编辑学生
                </h4>
                <form onSubmit={handleEditStudent} className="space-y-4">
                  <input
                    type="text"
                    value={editStudent.name}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                    placeholder="姓名"
                  />
                  <input
                    type="text"
                    value={editStudent.studentId}
                    onChange={(e) =>
                      setEditStudent({
                        ...editStudent,
                        studentId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                    placeholder="学号"
                  />
                  <input
                    type="email"
                    value={editStudent.email}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                    placeholder="邮箱"
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditStudent(null)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-xl transition-all duration-200"
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 添加学生 */}
            <div>
              <h4 className="text-md font-medium text-slate-600 mb-2">
                添加学生
              </h4>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                  placeholder="姓名"
                />
                <input
                  type="text"
                  value={newStudent.studentId}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, studentId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                  placeholder="学号"
                />
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
                  placeholder="邮箱"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
                >
                  添加
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 提示 */}
        {(error || success) && (
          <div className="mt-4">
            <div
              className={`px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
                error
                  ? 'bg-red-500/90 text-white'
                  : 'bg-green-500/90 text-white'
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
    </div>
  );
}

export default StudentManagement;
