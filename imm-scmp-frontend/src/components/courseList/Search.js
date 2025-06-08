import React from 'react';
import SearchIcon from '@mui/icons-material/Search'; // MUI Search Icon

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full max-w-3xl mx-auto relative drop-shadow-lg">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <SearchIcon sx={{ color: '#1976d2', fontSize: '1.75rem' }} />
      </div>
      <input
        type="text"
        placeholder="Search by title, code, or instructor..."
        className="w-full pl-12 pr-6 py-4 text-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 rounded-full transition-all duration-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
