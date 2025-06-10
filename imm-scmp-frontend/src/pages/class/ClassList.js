import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Search from '../../components/courseList/Search';
import ClassCard from './ClassCard';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { SidebarContext } from '../../utils/SidebarContext';
import getClasses from '../../utils/getClasses';
import getId from '../../utils/getId';
import getRole from '../../utils/getRole';

// Placeholder: Assume AuthContext provides the current teacher's ID
// Replace this with your actual authentication context or mechanism
const AuthContext = React.createContext({ currentTeacherId: null });
const useAuth = () => useContext(AuthContext);
const id = getId();
const userRole = getRole(id);

const ClassList = () => {
  const { isExpanded } = useContext(SidebarContext);
  // Replace 'T-001' with logic to get the authenticated teacher's ID
  const { currentTeacherId } = useAuth(); // e.g., 'T-001'
  const drawerWidth = isExpanded ? 300 : 80;
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addForm, setAddForm] = useState({
    teacherId: currentTeacherId || '', // Pre-fill with current teacher's ID
    className: '',
    description: '',
    schedule: '',
    subject: '',
    semester: 'Fall',
    year: new Date().getFullYear().toString(),
  });

  const loadClasses = async () => {
    const data = await getClasses();
    // Filter classes to show only those belonging to the current teacher
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
        classItem.subject.toLowerCase().includes(term) ||
        (!isNaN(yearTerm) && classItem.year === yearTerm)
    );
    setFilteredClasses(filtered);
  }, [searchTerm, classes]);

  const handleClassUpdate = async (updatedClass) => {
    // Ensure the updated class belongs to the current teacher
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

  const handleOpenAddDialog = () => {
    setAddForm({
      teacherId: currentTeacherId || '', // Pre-fill with current teacher's ID
      className: '',
      description: '',
      schedule: '',
      subject: '',
      semester: 'Fall',
      year: new Date().getFullYear().toString(),
    });
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    // Prevent changing teacherId
    if (name === 'teacherId') return;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClass = async () => {
    // Validate that teacherId matches the current teacher
    if (addForm.teacherId !== currentTeacherId) {
      alert('You can only create classes for yourself.');
      return;
    }

    const storedClasses = JSON.parse(localStorage.getItem('classes') || '[]');

    const newClassId = `class-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newClass = {
      classId: newClassId,
      className: addForm.className || `New Class for ${addForm.teacherId}`,
      classCode: `NEW-${addForm.teacherId.split('-')[1] || '001'}`,
      teacherId: addForm.teacherId,
      courseIds: [],
      studentIds: [],
      description: addForm.description || 'Newly created class',
      year: parseInt(addForm.year, 10) || new Date().getFullYear(),
      semester: addForm.semester,
      subject: addForm.subject || 'General',
      schedule: addForm.schedule || 'TBD',
      createdTime: new Date().toISOString(),
    };

    const updatedClasses = [...storedClasses, newClass];
    localStorage.setItem('classes', JSON.stringify(updatedClasses));
    // Update state to include only the current teacher's classes
    const teacherClasses = updatedClasses.filter(
      (c) => c.teacherId === currentTeacherId
    );
    setClasses(teacherClasses);
    setFilteredClasses(teacherClasses);
    handleCloseAddDialog();
  };

  // Show a message if no teacher is logged in
  if (!currentTeacherId) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Sidebar />
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
      style={{ paddingTop: '100px', marginLeft: `${drawerWidth}px` }}
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}
    >
      <Box
        component="main"
        className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {userRole == 'TEACHER' && (
            <div className="flex justify-end">
              <Button
                variant="contained"
                onClick={handleOpenAddDialog}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 items-center gap-2 shadow-md hover:shadow-lg"
              >
                Add New Class
              </Button>
            </div>
          )}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
              mt: 3,
            }}
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

        {/* Add Class Dialog */}
        <Dialog
          open={openAddDialog}
          onClose={handleCloseAddDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Class</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Teacher ID"
              name="teacherId"
              value={addForm.teacherId}
              onChange={handleAddChange}
              margin="normal"
              required
              disabled // Make teacherId non-editable
              helperText="Your teacher ID"
            />
            <TextField
              fullWidth
              label="Class Name"
              name="className"
              value={addForm.className}
              onChange={handleAddChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Class Code"
              name="classCode"
              value={addForm.classCode}
              onChange={handleAddChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={addForm.description}
              onChange={handleAddChange}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Schedule"
              name="schedule"
              value={addForm.schedule}
              onChange={handleAddChange}
              margin="normal"
              helperText="e.g., Mon, Wed, Fri 10:00-11:00"
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={addForm.subject}
              onChange={handleAddChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Semester</InputLabel>
              <Select
                name="semester"
                value={addForm.semester}
                onChange={handleAddChange}
                label="Semester"
              >
                <MenuItem value="Fall">Fall</MenuItem>
                <MenuItem value="Spring">Spring</MenuItem>
                <MenuItem value="Summer">Summer</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Year"
              name="year"
              type="number"
              value={addForm.year}
              onChange={handleAddChange}
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Cancel</Button>
            <Button
              onClick={handleAddClass}
              color="primary"
              variant="contained"
              disabled={!addForm.teacherId || !addForm.year}
            >
              Add Class
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

// Wrap component with AuthContext provider for demonstration
// Replace with your actual authentication provider
const ClassListWithAuth = (props) => {
  // Example: Replace with your auth logic (e.g., Firebase, JWT, etc.)
  const authValue = { currentTeacherId: 'T-001' }; // Placeholder
  return (
    <AuthContext.Provider value={authValue}>
      <ClassList {...props} />
    </AuthContext.Provider>
  );
};

export default ClassListWithAuth;
