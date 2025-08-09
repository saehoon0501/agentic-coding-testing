# Full-Stack CRUD Foundation Project

This project implements a comprehensive full-stack application with CRUD operations, following modern development practices and architectural patterns.

## Project Structure

### Backend (/backend)
- **src/controllers**: API endpoint controllers
- **src/models**: Data models and entity definitions
- **src/repositories**: Data access layer with repository pattern
- **src/middleware**: Express middleware components
- **src/services**: Business logic services
- **src/config**: Application configuration
- **src/migrations**: Database migration files
- **src/utils**: Utility functions and helpers
- **tests**: Unit and integration tests

### Frontend (/frontend)
- **src/components**: React components
- **src/services**: API integration layer
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
- Implement proper error handling
- Follow REST API conventions
- Use TypeScript for type safety

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

## Architecture

This project follows a layered architecture:
1. **Controllers**: Handle HTTP requests/responses
2. **Services**: Business logic layer
3. **Repositories**: Data access abstraction
4. **Models**: Data structure definitions
5. **Middleware**: Cross-cutting concerns

## Testing

- Unit tests: `npm run test:unit`
- Integration tests: `npm run test:integration`
- Coverage report: `npm run test:coverage`

## Deployment

CI/CD pipeline is configured with GitHub Actions for automated testing and deployment.

