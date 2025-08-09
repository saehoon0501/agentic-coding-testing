# API Endpoints Documentation

## Health Check
- **GET** `/health` - System health status

## Entities API (v1)

### Create Entity
- **POST** `/api/v1/entities`
- **Body**: `{ "name": "string", "description": "string", "status": "active|inactive|pending" }`
- **Response**: `201 Created`

### Get All Entities
- **GET** `/api/v1/entities?page=1&limit=10&sort=createdAt&order=desc`
- **Response**: `200 OK` with pagination

### Get Entity by ID
- **GET** `/api/v1/entities/:id`
- **Response**: `200 OK` or `404 Not Found`

### Update Entity
- **PUT** `/api/v1/entities/:id`
- **Body**: Complete entity object
- **Response**: `200 OK` or `404 Not Found`

### Partial Update
- **PATCH** `/api/v1/entities/:id`
- **Body**: Partial entity object
- **Response**: `200 OK` or `404 Not Found`

### Delete Entity
- **DELETE** `/api/v1/entities/:id`
- **Response**: `204 No Content` or `404 Not Found`

### Search Entities
- **GET** `/api/v1/entities/search?q=searchterm&filters={"status":"active"}`
- **Response**: `200 OK` with search results

### Bulk Operations
- **POST** `/api/v1/entities/bulk` - Bulk create
- **DELETE** `/api/v1/entities/bulk` - Bulk delete

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "pagination": {} // for list endpoints
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "correlationId": "uuid"
}
```
