# AI Collaboration Guidelines for Full-Stack CRUD Foundation

## Project Overview
This project implements a comprehensive full-stack CRUD application following modern development practices and architectural patterns. It serves as a foundation for building scalable web applications with proper separation of concerns.

## Architecture Principles

### Backend Architecture
- **Layered Architecture**: Controllers → Services → Repositories → Models
- **Repository Pattern**: Abstraction layer for data access
- **Dependency Injection**: Services are injected into controllers
- **Error Handling**: Centralized error handling with correlation IDs
- **Logging**: Structured logging with Winston
- **Validation**: Input validation using Joi schemas

### Frontend Architecture
- **Component-Based**: React components with clear separation of concerns
- **Service Layer**: API integration abstracted into service classes
- **Material-UI**: Consistent UI components and theming
- **Routing**: React Router for navigation
- **State Management**: Local state with hooks (ready for Redux if needed)

## Development Guidelines

### Code Quality Standards
1. **TypeScript Ready**: Project structure supports TypeScript migration
2. **ESLint Configuration**: Consistent code formatting and linting
3. **Test Coverage**: Minimum 80% test coverage required
4. **Documentation**: All public methods must be documented
5. **Error Handling**: Proper error handling at all layers

### API Design Principles
1. **RESTful Design**: Follow REST conventions for all endpoints
2. **Consistent Response Format**: Standardized JSON responses
3. **Pagination**: All list endpoints support pagination
4. **Filtering**: Support for filtering and searching
5. **Versioning**: API versioning strategy in place

## AI Agent Collaboration Rules

### For Backend Development
1. **Repository Pattern**: Always use repository pattern for data access
2. **Service Layer**: Business logic belongs in service layer
3. **Validation**: Validate all inputs at controller level
4. **Error Handling**: Use centralized error handler
5. **Logging**: Include correlation IDs in all logs
6. **Testing**: Write both unit and integration tests

### For Frontend Development
1. **Component Structure**: Keep components focused and reusable
2. **API Integration**: Use service layer for all API calls
3. **Error Handling**: Display user-friendly error messages
4. **Loading States**: Always show loading indicators
5. **Accessibility**: Follow WCAG guidelines
6. **Responsive Design**: Mobile-first approach

## Testing Strategy

### Backend Testing
- **Unit Tests**: Test individual functions and methods
- **Integration Tests**: Test API endpoints end-to-end
- **Database Tests**: Test repository layer with test database
- **Coverage**: Aim for 80%+ code coverage

### Frontend Testing
- **Component Tests**: Test React components in isolation
- **Integration Tests**: Test component interactions
- **API Tests**: Mock API calls and test error handling

## Security Considerations

### Backend Security
- **Input Validation**: Validate all inputs
- **SQL Injection**: Use parameterized queries
- **CORS**: Configure CORS properly
- **Rate Limiting**: Implement rate limiting

### Frontend Security
- **XSS Prevention**: Sanitize user inputs
- **CSRF Protection**: Use CSRF tokens
- **Secure Storage**: Secure token storage
- **HTTPS**: Always use HTTPS in production

This document serves as a comprehensive guide for AI agents and developers working on this project.
