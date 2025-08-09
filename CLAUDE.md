# AI Collaboration Guidelines for CRUD Application Foundation

## Project Overview
This project implements a full-stack CRUD application with proper infrastructure setup, following a layered architecture pattern. The system is designed to be scalable, maintainable, and suitable for collaborative development between human developers and AI agents.

## Architecture Principles

### Backend Architecture
- **Layered Architecture**: Controller → Service → Repository → Model
- **Separation of Concerns**: Each layer has distinct responsibilities
- **Error Handling**: Centralized error handling with correlation IDs
- **Validation**: Input validation at the controller layer
- **Logging**: Structured logging with Winston

### Frontend Architecture
- **Component-Based**: React components organized by feature
- **Service Layer**: Centralized API communication
- **Error Handling**: Consistent error display and user feedback
- **Responsive Design**: Mobile-first CSS approach

## Development Standards

### Code Quality
1. **All code must follow established patterns**
2. **Testing Requirements**: Unit tests for all models and services
3. **Documentation Standards**: JSDoc comments for all public methods

### AI Agent Collaboration Rules

#### For Backend Development
1. Follow the existing controller → service → repository pattern
2. Add validation middleware for input validation
3. Include comprehensive error handling
4. Write integration tests

#### For Frontend Development
1. Follow the established component structure
2. Use common components when possible
3. Implement proper error states and loading states

## File Organization
```
backend/src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic
├── repositories/    # Data access layer
├── models/          # Data models
├── middleware/      # Express middleware
└── utils/           # Utility functions

frontend/src/
├── components/
│   ├── common/      # Reusable components
│   └── crud/        # Feature-specific components
├── services/        # API integration
└── styles/          # CSS files
```

## Key Patterns

### Error Handling
- Backend: Use try-catch with proper logging
- Frontend: Use error state with user-friendly messages

### Testing
- Write integration tests for all API endpoints
- Write component tests for critical user flows
- Maintain minimum 80% code coverage

## Future Enhancements
- User authentication and authorization
- Real-time updates with WebSockets
- Advanced search and filtering
- Database migration from in-memory to persistent storage

Remember: Consistency is key to maintainable code. Follow existing patterns in the codebase.
