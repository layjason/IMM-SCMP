import React from 'react';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';

function Toast({ error, success, clearMessages }) {
  if (!error && !success) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
          error ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
        }`}
      >
        :
        <div className="flex items-center gap-3">
          {error ? (
            <ErrorOutline className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{error || success}</span>
          <button
            onClick={clearMessages}
            className="ml-2 text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
