import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import EntityList from './components/crud/EntityList';
import EntityForm from './components/crud/EntityForm';
import EntityDetail from './components/crud/EntityDetail';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<EntityList />} />
          <Route path="/entities" element={<EntityList />} />
          <Route path="/entities/new" element={<EntityForm />} />
          <Route path="/entities/:id" element={<EntityDetail />} />
          <Route path="/entities/:id/edit" element={<EntityForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
