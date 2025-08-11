# CRUD Application Framework

This project implements a full-stack CRUD application with proper infrastructure setup, following the goals outlined in the project plan.

## Project Structure

### Backend (Node.js/Express)
- **src/controllers/**: API endpoint controllers
- **src/models/**: Database entity models
- **src/repositories/**: Data access layer (Repository pattern)
- **src/middleware/**: Express middleware components
- **src/services/**: Business logic services
- **src/config/**: Application configuration
- **src/migrations/**: Database migration files
- **src/utils/**: Utility functions
- **tests/**: Unit and integration tests

### Frontend (React)
- **src/components/**: Reusable UI components
- **src/services/**: API integration layer
- **src/utils/**: Frontend utility functions
- **src/styles/**: CSS and styling files

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

## API Endpoints

### Health Check
- **GET /health** - Application health status

### Entities CRUD
- **GET /api/entities** - List all entities (paginated)
- **GET /api/entities/:id** - Get single entity
- **POST /api/entities** - Create new entity
- **PUT /api/entities/:id** - Update entire entity
- **PATCH /api/entities/:id** - Partial entity update
- **DELETE /api/entities/:id** - Delete entity

## Development Guidelines

- Follow RESTful API conventions
- Implement proper error handling and logging
- Write tests for all new features
- Use consistent code formatting
- Follow the repository pattern for data access

## Testing

- Backend: `npm test` (in backend directory)
- Frontend: `npm test` (in frontend directory)
- Coverage: `npm run coverage`

## Deployment

CI/CD pipeline is configured to automatically:
1. Run tests on code commits
2. Build artifacts
3. Deploy to staging environment

See `scripts/` directory for deployment scripts.
