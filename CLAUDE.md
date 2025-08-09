# AI Collaboration Guidelines for Project Foundation API

## Overview
This document provides guidelines for AI agents and developers working on the Project Foundation API. The project implements a comprehensive backend framework with CRUD operations following modern software architecture principles.

## Project Architecture

### Layer Structure
- **Controllers** (`src/controllers/`): Handle HTTP requests and responses
- **Services** (`src/services/`): Business logic layer
- **Repositories** (`src/repositories/`): Data access layer with generic CRUD operations
- **Models** (`src/models/`): Data models and validation using Sequelize ORM
- **Middleware** (`src/middleware/`): Cross-cutting concerns (auth, validation, error handling)
- **Routes** (`src/routes/`): API endpoint definitions
- **Utils** (`src/utils/`): Utility functions and helpers

## Development Guidelines

### 1. Code Standards
- Follow ESLint configuration in `.eslintrc.js`
- Use consistent error handling with `AppError` class
- Implement proper logging using Winston logger
- Write comprehensive tests for all new features

### 2. API Design Principles
- RESTful endpoint design
- Consistent response format:
  ```json
  {
    "success": boolean,
    "data": object|array,
    "error": string (if applicable),
    "pagination": object (for list endpoints)
  }
  ```
- Proper HTTP status codes
- Input validation using Joi schemas

### 3. Database Operations
- Use repository pattern for data access
- Implement transactions for bulk operations
- Follow migration-based schema changes
- Use UUID for primary keys

### 4. Testing Strategy
- Unit tests for services and utilities
- Integration tests for API endpoints
- Minimum 80% code coverage
- Test both success and error scenarios

### 5. Security Considerations
- Input validation on all endpoints
- Proper error handling without information leakage
- CORS configuration
- Helmet.js for security headers

## Implementation Status

### ✅ Completed (G1: Foundation)
- Project structure and configuration
- Health check endpoint (`GET /health`)
- Logging system with Winston
- Error handling framework
- Basic testing setup

### ⏳ In Progress (G2: Core Framework)
- Application entry point
- Routing system
- Database connection and migrations
- Authentication middleware
- API documentation

### 📋 Planned (G3: CRUD Operations)
- Base model and repository pattern
- Sample entity implementation
- Full CRUD API endpoints
- Search and filtering
- Bulk operations

## Key Files and Their Purpose

- `src/app.js`: Main application entry point
- `src/routes/health.js`: Health check endpoint (G1-S3)
- `src/middleware/errorHandler.js`: Centralized error handling (G1-S5)
- `src/utils/logger.js`: Structured logging configuration (G1-S4)
- `src/models/Entity.js`: Sample entity model (G3-S3)
- `src/repositories/baseRepository.js`: Generic CRUD operations (G3-S2)

## Next Steps for AI Agents

1. **Database Setup**: Implement connection pooling and migration system
2. **Authentication**: Add JWT-based authentication middleware
3. **API Documentation**: Set up Swagger/OpenAPI documentation
4. **Performance**: Add caching layer and query optimization
5. **Monitoring**: Implement health checks and metrics collection

## Collaboration Rules

1. **Always run tests** before committing changes
2. **Update documentation** when adding new features
3. **Follow the established patterns** for consistency
4. **Use meaningful commit messages** following conventional commits
5. **Review error handling** for all new endpoints

## Environment Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start development server
npm run dev

# Run tests
npm test
```

## Contact and Support

For questions about the architecture or implementation details, refer to:
- README.md for project overview
- API documentation at `/api/docs`
- Test files for usage examples
- This CLAUDE.md file for AI collaboration guidelines

