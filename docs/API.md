# API Documentation

## Base URL
`http://localhost:3001`

## Authentication
Currently, no authentication is required. This will be implemented in future versions.

## Endpoints

### Health Check
- **GET /health**
  - Description: Check application health status
  - Response: 200 OK with health information

### Entities

#### List Entities
- **GET /api/entities**
  - Description: Retrieve paginated list of entities
  - Query Parameters:
    - `page` (optional): Page number (default: 1)
    - `limit` (optional): Items per page (default: 10)
    - `search` (optional): Search term for name/description
  - Response: 200 OK with entity list and pagination info

#### Get Entity
- **GET /api/entities/:id**
  - Description: Retrieve single entity by ID
  - Response: 200 OK with entity data, 404 if not found

#### Create Entity
- **POST /api/entities**
  - Description: Create new entity
  - Request Body:
    ```json
    {
      "name": "string (required)",
      "description": "string (optional)",
      "status": "active|inactive (optional, default: active)",
      "metadata": "object (optional)"
    }
    ```
  - Response: 201 Created with entity data

#### Update Entity
- **PUT /api/entities/:id**
  - Description: Update entire entity
  - Request Body: Same as create
  - Response: 200 OK with updated entity, 404 if not found

#### Partial Update Entity
- **PATCH /api/entities/:id**
  - Description: Partially update entity
  - Request Body: Any subset of entity fields
  - Response: 200 OK with updated entity, 404 if not found

#### Delete Entity
- **DELETE /api/entities/:id**
  - Description: Soft delete entity (sets status to inactive)
  - Response: 204 No Content, 404 if not found

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "correlationId": "unique-id",
  "timestamp": "ISO-8601 timestamp"
}
```

## Status Codes
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error
