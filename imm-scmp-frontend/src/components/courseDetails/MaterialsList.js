import React from 'react';
import { Assignment } from '@mui/icons-material';

function AssignmentList({ assignments, userRole, handleGoToAssignment }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-slate-600 mb-3 flex items-center gap-2">
        <Assignment className="text-orange-600" /> Assignments
      </h3>
      {assignments.length > 0 ? (
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="p-3 bg-slate-50 rounded-lg">
              <div className="flex justify-between items-center gap-4">
                <p className="text-slate-700 font-medium flex-1">
                  {assignment.question}
                </p>
                {userRole === 'student' && (
                  <button
                    onClick={() => handleGoToAssignment(assignment.id)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
                  >
                    Go to do Assignment
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">
          No assignments available for this date.
        </p>
      )}
    </div>
  );
}

export default AssignmentList;
