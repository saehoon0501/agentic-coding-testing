# AI Collaboration Guidelines for CRUD Application Framework

## Project Overview
This is a full-stack CRUD application framework implementing proper infrastructure setup, following industry best practices for scalable web applications.

## Architecture Principles

### Backend Architecture
- **Repository Pattern**: All data access goes through repository classes
- **Service Layer**: Business logic is encapsulated in service classes
- **Middleware-based**: Express middleware for cross-cutting concerns
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: Input validation using Joi schemas
- **Logging**: Structured logging with Winston

### Frontend Architecture
- **Component-based**: React components with clear separation of concerns
- **Service Layer**: API communication through dedicated service classes
- **Material-UI**: Consistent UI components using MUI
- **Routing**: React Router for navigation
- **State Management**: Local state with hooks (can be extended with Redux/Context)

## Development Rules

### Code Quality Standards
1. **All code must follow ESLint rules** - No exceptions
2. **Write tests for all new features** - Minimum 80% coverage
3. **Use TypeScript-style JSDoc comments** for better documentation
4. **Follow RESTful API conventions** for all endpoints
5. **Implement proper error handling** at all levels

### Database Guidelines
1. **Always use migrations** for schema changes
2. **Include rollback scripts** for all migrations
3. **Use transactions** for multi-step operations
4. **Implement soft deletes** where appropriate
5. **Add proper indexes** for performance

### Security Requirements
1. **Input validation** on all endpoints
2. **SQL injection prevention** through parameterized queries
3. **CORS configuration** for cross-origin requests
4. **Rate limiting** for API endpoints (to be implemented)
5. **Authentication/Authorization** (to be implemented)

## API Design Standards

### Endpoint Naming
- Use plural nouns: `/api/entities`
- Use HTTP methods appropriately: GET, POST, PUT, PATCH, DELETE
- Use proper status codes: 200, 201, 400, 404, 500

### Response Format
All successful responses should follow this structure for consistency.

### Error Format
All error responses should include proper error information with correlation IDs for debugging.

## Testing Guidelines

### Backend Testing
- **Unit tests** for models, services, and utilities
- **Integration tests** for API endpoints
- **Mock external dependencies** in unit tests
- **Use real database** for integration tests

### Frontend Testing
- **Component tests** using React Testing Library
- **Service tests** for API integration
- **Mock API calls** in component tests
- **Test user interactions** and edge cases

## AI Agent Collaboration Rules

### When Adding New Features
1. **Analyze existing patterns** before implementing
2. **Follow established conventions** for naming and structure
3. **Update tests** for any code changes
4. **Update documentation** for API changes
5. **Consider backward compatibility** for breaking changes

### Code Review Checklist
- [ ] Follows project structure conventions
- [ ] Includes appropriate tests
- [ ] Has proper error handling
- [ ] Uses consistent naming conventions
- [ ] Includes necessary documentation
- [ ] Handles edge cases appropriately

### Communication Guidelines
- **Document all assumptions** in code comments
- **Explain complex business logic** with clear comments
- **Use descriptive commit messages** following conventional commits
- **Update README** for significant changes

## Performance Considerations

### Backend Performance
- Use database indexes appropriately
- Implement pagination for large datasets
- Use connection pooling for database connections
- Cache frequently accessed data (to be implemented)

### Frontend Performance
- Lazy load components where appropriate
- Optimize bundle size with code splitting
- Use React.memo for expensive components
- Implement proper loading states

## Future Enhancements

### Planned Features
1. **Authentication & Authorization** - JWT-based auth system
2. **Real-time Updates** - WebSocket integration
3. **File Upload** - Support for file attachments
4. **Advanced Search** - Full-text search capabilities
5. **Audit Logging** - Track all data changes
6. **API Rate Limiting** - Prevent abuse
7. **Caching Layer** - Redis integration
8. **Monitoring** - Application performance monitoring

---

**Remember**: This is a living document. Update it as the project evolves and new patterns emerge.
