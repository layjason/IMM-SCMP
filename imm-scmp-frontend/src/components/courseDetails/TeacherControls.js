import React from 'react';
import { Upload, Assignment } from '@mui/icons-material';

function TeacherControls({
  //   file,
  setFile,
  handleFileUpload,
  setShowCreateAssignment,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-600 mb-3 flex items-center gap-2">
          <Upload className="text-blue-600" /> 上传课件
        </h3>
        <form onSubmit={handleFileUpload} className="flex items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white"
            accept=".pdf,.ppt,.pptx,.mp4,.zip"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
          >
            上传
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-lg font-medium text-slate-600 mb-3 flex items-center gap-2">
          <Assignment className="text-orange-600" /> 发布习题
        </h3>
        <button
          type="button"
          onClick={() => setShowCreateAssignment(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
        >
          发布习题
        </button>
      </div>
    </div>
  );
}

export default TeacherControls;
