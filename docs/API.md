# API Documentation

## Base URL
- Development: `http://localhost:3001`
- Production: `https://your-domain.com`

## Authentication
Currently, no authentication is required. Future versions will implement JWT-based authentication.

## Health Check

### GET /health
Returns the health status of the application.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2023-12-07T10:30:00.000Z",
  "version": "0.1.0",
  "environment": "development",
  "uptime": 3600,
  "memory": {
    "rss": 50331648,
    "heapTotal": 20971520,
    "heapUsed": 15728640,
    "external": 1048576
  }
}
```

## Entities API

### GET /api/entities
Retrieve a paginated list of entities.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term to filter entities by name

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Sample Entity",
      "description": "Entity description",
      "status": "active",
      "metadata": {},
      "createdAt": "2023-12-07T10:00:00.000Z",
      "updatedAt": "2023-12-07T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### GET /api/entities/:id
Retrieve a single entity by ID.

**Response:**
```json
{
  "id": 1,
  "name": "Sample Entity",
  "description": "Entity description",
  "status": "active",
  "metadata": {},
  "createdAt": "2023-12-07T10:00:00.000Z",
  "updatedAt": "2023-12-07T10:00:00.000Z"
}
```

### POST /api/entities
Create a new entity.

**Request Body:**
```json
{
  "name": "New Entity",
  "description": "Entity description",
  "status": "active",
  "metadata": {}
}
```

**Response:** 201 Created with entity data

### PUT /api/entities/:id
Update an existing entity (full update).

**Request Body:**
```json
{
  "name": "Updated Entity",
  "description": "Updated description",
  "status": "inactive",
  "metadata": {}
}
```

**Response:** 200 OK with updated entity data

### PATCH /api/entities/:id
Partially update an existing entity.

**Request Body:**
```json
{
  "status": "inactive"
}
```

**Response:** 200 OK with updated entity data

### DELETE /api/entities/:id
Delete an entity.

**Response:** 204 No Content

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "correlationId": "err-1234567890-abc123",
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

### Status Codes
- `200` - OK
- `201` - Created
- `204` - No Content
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error
