import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import EntityList from './components/views/EntityList';
import EntityForm from './components/forms/EntityForm';
import EntityDetail from './components/views/EntityDetail';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRUD Application Framework
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
        </Routes>
      </Container>
    </div>
  );
}

export default App;
