# API Documentation

## Overview
This API provides comprehensive CRUD operations for entity management with authentication, search, and bulk operations.

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All responses follow this format:
```json
{
  "success": true|false,
  "data": <response-data>,
  "error": "<error-message>", // Only present on errors
  "pagination": { // Only present on paginated responses
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Endpoints

### Health Check
- **GET /health** - Check service health (no auth required)

### Entity Management
- **POST /api/entities** - Create new entity (auth required)
- **GET /api/entities** - List entities with pagination
- **GET /api/entities/:id** - Get entity by ID
- **PUT /api/entities/:id** - Update entity (auth required)
- **PATCH /api/entities/:id** - Partially update entity (auth required)
- **DELETE /api/entities/:id** - Delete entity (auth required)

### Search and Bulk Operations
- **GET /api/entities/search?q=<query>** - Search entities
- **POST /api/entities/bulk** - Create multiple entities (auth required)
- **DELETE /api/entities/bulk** - Delete multiple entities (auth required)

## Interactive Documentation
Visit `/api-docs` when the server is running for interactive Swagger documentation.

## Error Codes
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (missing or invalid token)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error
