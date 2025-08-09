# CRUD Application Foundation

This project implements a full-stack CRUD application with proper infrastructure setup, following the architectural plan for scalable development.

## Project Structure

### Backend (/backend)
- **src/controllers**: API endpoint controllers
- **src/models**: Data models and entity definitions
- **src/repositories**: Data access layer with repository pattern
- **src/middleware**: Request/response middleware components
- **src/services**: Business logic services
- **src/config**: Application configuration
- **src/migrations**: Database migration files
- **src/utils**: Utility functions and helpers
- **tests**: Unit and integration tests

### Frontend (/frontend)
- **src/components**: React components organized by feature
- **src/services**: API integration and HTTP client
- **src/utils**: Frontend utility functions
- **src/styles**: CSS and styling files
- **public**: Static assets

## Getting Started

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Set up environment variables: `cp .env.example .env`
4. Run migrations: `npm run migrate`
5. Start development server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## Development Guidelines

- Follow the established project structure
- Write tests for all new features
- Use the repository pattern for data access
- Implement proper error handling and logging
- Follow RESTful API conventions

## API Endpoints

### Health Check
- GET /health - Application health status

### Entities (Sample CRUD)
- GET /api/entities - List all entities (paginated)
- GET /api/entities/:id - Get single entity
- POST /api/entities - Create new entity
- PUT /api/entities/:id - Update entity (full)
- PATCH /api/entities/:id - Update entity (partial)
- DELETE /api/entities/:id - Delete entity

## Architecture Decisions

This project follows a layered architecture with:
- Controller layer for HTTP handling
- Service layer for business logic
- Repository layer for data access
- Model layer for data representation

The frontend uses a component-based architecture with:
- Reusable common components
- Feature-specific CRUD components
- Centralized API service layer
- Proper error handling and loading states

