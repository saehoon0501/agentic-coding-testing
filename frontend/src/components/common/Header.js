import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">CRUD Application</Link>
        </h1>
        <nav className="nav">
          <Link to="/entities" className="nav-link">
            Entities
          </Link>
          <Link to="/entities/new" className="nav-link btn-primary">
            Create New
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
