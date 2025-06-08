import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Search from '../../components/classList/Search';
import ClassCard from '../../components/classList/ClassCard';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { SidebarContext } from '../../utils/SidebarContext';
// we use the get classes here from our getClasses.js
import getClasses from '../../utils/getClasses';

const ClassList = () => {
  const { isExpanded } = useContext(SidebarContext);
  const drawerWidth = isExpanded ? 300 : 80;
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

  useEffect(() => {
    const loadClasses = async () => {
      const data = await getClasses();
      setClasses(data);
      setFilteredClasses(data);
    };
    loadClasses();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const yearterm = parseInt(searchTerm, 10);
    const filtered = classes.filter(
      (classItem) =>
        classItem.name.toLowerCase().includes(term) ||
        classItem.code.toLowerCase().includes(term) ||
        classItem.instructor.toLowerCase().includes(term) ||
        classItem.subject.toLowerCase().includes(term) ||
        (!isNaN(yearterm) && classItem.year === yearterm)
    );
    setFilteredClasses(filtered);
  }, [searchTerm, classes]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f9fafb',
          p: 3,
          ml: `${drawerWidth}px`,
          mt: '64px',
        }}
      >
        <Box mt={6} mb={6}>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>
        <Box
          display="grid"
          gap={5}
          m={3}
          sx={{ gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' } }}
        >
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem) => (
              <ClassCard key={classItem.id} classData={classItem} />
            ))
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              gridColumn="span 3"
            >
              No classes found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ClassList;
