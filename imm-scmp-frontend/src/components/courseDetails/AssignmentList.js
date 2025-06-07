import React from 'react';
import { FileOpen, Download } from '@mui/icons-material';

function MaterialList({ materials }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-slate-600 mb-3 flex items-center gap-2">
        <FileOpen className="text-blue-600" /> Lesson Materials
      </h3>
      {materials.length > 0 ? (
        <ul className="space-y-2">
          {materials.map((material) => (
            <li
              key={material.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <span className="text-slate-700">{material.name}</span>
              <div className="flex gap-2">
                <a
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FileOpen className="w-5 h-5" />
                </a>
                <a
                  href={material.url}
                  download
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">No materials available for this date.</p>
      )}
    </div>
  );
}

export default MaterialList;
