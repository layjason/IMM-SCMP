import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/common/Search';
import ClassCard from '../../components/ClassCard';
import { SidebarContext } from '../../utils/SidebarContext';
import getClasses from '../../utils/getClasses';
import { AddCircle } from '@mui/icons-material';

// Placeholder: Assume AuthContext provides the current teacher's ID
const AuthContext = React.createContext({ currentTeacherId: null });
const useAuth = () => useContext(AuthContext);

const ClassList = () => {
  const { isExpanded } = useContext(SidebarContext);
  const { currentTeacherId } = useAuth(); // e.g., 'T-001'
  const navigate = useNavigate();
  const drawerWidth = isExpanded ? 300 : 80;
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

  const loadClasses = async () => {
    const data = await getClasses();
    const teacherClasses = data.filter(
      (classItem) => classItem.teacherId === currentTeacherId
    );
    setClasses(teacherClasses);
    setFilteredClasses(teacherClasses);
  };

  useEffect(() => {
    if (currentTeacherId) {
      loadClasses();
    }
  }, [currentTeacherId]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const yearTerm = parseInt(searchTerm, 10);
    const filtered = classes.filter(
      (classItem) =>
        classItem.className.toLowerCase().includes(term) ||
        classItem.teacherId.toLowerCase().includes(term) ||
        (!isNaN(yearTerm) && classItem.year === yearTerm)
    );
    setFilteredClasses(filtered);
  }, [searchTerm, classes]);

  const handleClassUpdate = async (updatedClass) => {
    if (updatedClass.teacherId !== currentTeacherId) {
      alert('You can only update your own classes.');
      return;
    }
    const updatedClasses = classes.map((c) =>
      c.classId === updatedClass.classId ? updatedClass : c
    );
    setClasses(updatedClasses);
    setFilteredClasses(updatedClasses);
    await loadClasses();
  };

  const handleAddNewClass = () => {
    navigate('/classform'); // Redirect to ClassForm
  };

  if (!currentTeacherId) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            mt: '60px',
            flexGrow: 1,
            p: 3,
            marginLeft: `${drawerWidth}px`,
            transition: 'margin 0.3s ease',
            bgcolor: 'background.default',
            minHeight: '100vh',
          }}
        >
          <Typography variant="h6" color="error">
            Please log in as a teacher to view or add classes.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div
      style={{ marginLeft: `${drawerWidth}px` }}
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}
    >
      <Box pt={15} mb={6}>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={handleAddNewClass}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded transition-all duration-200 items-center gap-2 shadow-md hover:shadow-lg"
          >
            <AddCircle /> Add New Class
          </Button>
        </div>
        <Box
          display="grid"
          gap={5}
          m={3}
          sx={{ gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' } }}
        >
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem) => (
              <ClassCard
                key={classItem.classId}
                classData={classItem}
                onUpdate={handleClassUpdate}
              />
            ))
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ gridColumn: '1 / -1', textAlign: 'center' }}
            >
              No classes found.
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

// Wrap component with AuthContext provider
const ClassListWithAuth = (props) => {
  const authValue = { currentTeacherId: 'T-001' }; // Placeholder
  return (
    <AuthContext.Provider value={authValue}>
      <ClassList {...props} />
    </AuthContext.Provider>
  );
};

export default ClassListWithAuth;
