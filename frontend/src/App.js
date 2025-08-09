import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import EntityList from './components/crud/EntityList';
import EntityForm from './components/crud/EntityForm';
import EntityDetail from './components/crud/EntityDetail';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Full-Stack CRUD Application
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<EntityList />} />
          <Route path="/entities" element={<EntityList />} />
          <Route path="/entities/new" element={<EntityForm />} />
          <Route path="/entities/:id" element={<EntityDetail />} />
          <Route path="/entities/:id/edit" element={<EntityForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      
      <Box component="footer" sx={{ mt: 8, py: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Full-Stack CRUD Foundation © 2024
        </Typography>
      </Box>
    </div>
  );
}

export default App;

