# Development Setup Guide

## Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

## Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd fullstack-crud-foundation
npm install
```

### 2. Database Setup
```bash
# Create database
createdb fullstack_crud

# Copy environment file
cp backend/.env.example backend/.env

# Update database credentials in backend/.env
# Run migrations
cd backend && npm run migrate
```

### 3. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend  # Backend on :3001
npm run dev:frontend # Frontend on :3000
```

## Testing
```bash
npm test                # Run all tests
npm run test:backend    # Backend tests only
npm run test:frontend   # Frontend tests only
```

## Building for Production
```bash
npm run build
```

## Project Structure
- `/backend` - Node.js API server
- `/frontend` - React application
- `/docs` - Documentation
- `/.github` - CI/CD workflows

## API Endpoints
- GET /health - Health check
- GET /api/entities - List entities
- POST /api/entities - Create entity
- GET /api/entities/:id - Get entity
- PUT /api/entities/:id - Update entity
- DELETE /api/entities/:id - Delete entity

