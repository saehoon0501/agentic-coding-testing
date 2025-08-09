# AI Collaboration Guidelines for Project Foundation API

## Project Overview
This is a comprehensive backend API foundation project implementing CRUD operations with modern software architecture principles. The project follows a layered architecture pattern with clear separation of concerns.

## AI Agent Collaboration Rules

### 1. Code Quality Standards
- **SOLID Principles**: All code must adhere to SOLID design principles
- **DRY Principle**: Avoid code duplication; create reusable components
- **Clean Code**: Use meaningful variable names, clear function signatures, and proper documentation
- **Error Handling**: All functions must have proper error handling with meaningful error messages

### 2. Architecture Guidelines
- **Layered Architecture**: Maintain clear separation between Controllers, Services, Repositories, and Models
- **Repository Pattern**: All database operations must go through repository classes
- **Service Layer**: Business logic must be encapsulated in service classes
- **Middleware**: Cross-cutting concerns (auth, logging, validation) must use middleware

### 3. Development Workflow
- **Feature Branches**: Create feature branches for new functionality
- **Testing**: All new features require unit and integration tests
- **Documentation**: Update API documentation for any endpoint changes
- **Migration**: Database changes must include proper migration files

### 4. API Design Standards
- **RESTful**: Follow REST conventions for endpoint design
- **Consistent Response Format**: All responses must follow the established JSON format
- **Status Codes**: Use appropriate HTTP status codes
- **Pagination**: Implement pagination for list endpoints
- **Validation**: Validate all input data using Joi schemas

### 5. Security Requirements
- **Authentication**: Protected endpoints must use JWT authentication
- **Input Validation**: Sanitize and validate all user inputs
- **Error Messages**: Avoid exposing sensitive information in error messages
- **CORS**: Configure CORS appropriately for the environment

### 6. Performance Guidelines
- **Database Queries**: Optimize database queries and use indexes appropriately
- **Caching**: Implement caching where beneficial
- **Pagination**: Always paginate large result sets
- **Bulk Operations**: Provide bulk endpoints for operations on multiple records

### 7. Testing Requirements
- **Unit Tests**: Test individual functions and methods
- **Integration Tests**: Test API endpoints end-to-end
- **Coverage**: Maintain minimum 80% test coverage
- **Mocking**: Mock external dependencies in unit tests

### 8. Documentation Standards
- **API Docs**: Use Swagger/OpenAPI for API documentation
- **Code Comments**: Document complex business logic
- **README**: Keep README updated with setup and usage instructions
- **Changelog**: Document significant changes

### 9. Environment Management
- **Environment Variables**: Use environment variables for configuration
- **Secrets**: Never commit secrets to version control
- **Multiple Environments**: Support dev, test, and production environments

### 10. Monitoring and Logging
- **Structured Logging**: Use structured logging with correlation IDs
- **Health Checks**: Implement comprehensive health check endpoints
- **Error Tracking**: Log errors with sufficient context for debugging
- **Performance Monitoring**: Track response times and database query performance

## File Structure Guidelines
```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic layer
├── repositories/    # Data access layer
├── models/          # Database models
├── middleware/      # Cross-cutting concerns
├── routes/          # Route definitions
├── utils/           # Utility functions
└── config/          # Configuration files
```

## Commit Message Format
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test additions or modifications
- chore: Maintenance tasks

## Review Checklist
Before merging any code, ensure:
- [ ] All tests pass
- [ ] Code follows established patterns
- [ ] Documentation is updated
- [ ] Error handling is implemented
- [ ] Security considerations are addressed
- [ ] Performance impact is considered

## Contact and Support
For questions about these guidelines or the project architecture, consult the project documentation or reach out to the development team.
