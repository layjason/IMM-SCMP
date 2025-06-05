import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const menuItems =
    role === 'TEACHER' || role === 'ASSISTANT'
      ? [
          { text: 'Create Course', path: '/courses/create' },
          { text: 'Manage Classes', path: '/classes' },
          { text: 'Upload Resources', path: '/resources/upload' },
        ]
      : [
          { text: 'My Courses', path: '/courses' },
          { text: 'My Exercises', path: '/exercises' },
          { text: 'My History', path: '/history' },
        ];

  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240 } }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
