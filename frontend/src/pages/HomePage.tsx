import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="page">
      <h1>Welcome to Full-Stack Application</h1>
      <p>
        This is a comprehensive full-stack web application built with modern technologies
        and best practices.
      </p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>RESTful API with Express and TypeScript</li>
          <li>React frontend with TypeScript</li>
          <li>PostgreSQL database with migrations</li>
          <li>Comprehensive testing suite</li>
          <li>CI/CD pipeline with GitHub Actions</li>
          <li>Docker containerization</li>
          <li>Security and performance monitoring</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
