import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ErrorOutline, Close } from '@mui/icons-material';
// import getId from '../../utils/getId';
import getRole from '../../utils/getRole';
import getId from '../../utils/getId';

function Profile() {
  const [user, setUser] = useState({ email: '', name: '', role: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getId();
    const userRole = getRole(userId);
    const fetchUser = async () => {
      try {
        // const response = await fetch('http://localhost:8080/api/user', {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json', 'User-Id': userId },
        // });
        // if (!response.ok) throw new Error('无法获取用户信息');
        // const data = await response.json();
        // setUser({ email: data.email, name: data.name, role: data.role });
        // console.log(getRole(getId));
        setUser({
          email: `${userId}@gmail.com`,
          name: `${userId}`,
          role: userRole,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    setError('');
    setSuccess('');
    if (!user.name) {
      setError('姓名不能为空');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'User-Id': localStorage.getItem('userId'),
        },
        body: JSON.stringify({ name: user.name }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '更新失败');
      }
      setSuccess('资料更新成功');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdatePassword = async () => {
    setError('');
    setSuccess('');
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('请填写所有密码字段');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('新密码与确认密码不匹配');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'User-Id': localStorage.getItem('userId'),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '密码更新失败');
      }
      setSuccess('密码更新成功');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 w-full max-w-3xl relative">
        {/* Close button at top-right corner */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
          aria-label="Close"
        >
          <Close className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold text-slate-700 mb-4 pr-12">
          个人中心
        </h1>
        <p className="text-lg text-slate-500 mb-6">
          查看和更新您的信息，管理账户安全。
        </p>

        <h2 className="text-xl font-semibold text-slate-700 mb-4">个人信息</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              邮箱
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              姓名
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              角色
            </label>
            <select
              value={user.role}
              disabled
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-100 cursor-not-allowed"
            >
              <option value="TEACHER">教师</option>
              <option value="ASSISTANT">助教</option>
              <option value="STUDENT">学生</option>
            </select>
          </div>
          <button
            onClick={handleUpdateProfile}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            更新资料
          </button>
        </div>

        <h2 className="text-xl font-semibold text-slate-700 mt-6 mb-4">
          修改密码
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              当前密码
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
              placeholder="请输入当前密码"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              新密码
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
              placeholder="请输入新密码"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              确认新密码
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50/50 hover:bg-white"
              placeholder="请确认新密码"
            />
          </div>
          <button
            onClick={handleUpdatePassword}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            更新密码
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-red-600 hover:text-red-800 font-medium py-2 mt-6 transition-colors duration-200"
        >
          注销账号
        </button>

        {(error || success) && (
          <div className="fixed bottom-6 right-6 z-50">
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

export default Profile;
