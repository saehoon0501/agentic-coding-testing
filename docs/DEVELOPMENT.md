# Development Setup Guide

## Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- Git

## Initial Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd crud-application-framework
```

### 2. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Database Setup
```bash
# Create database
createdb crud_app

# Run migrations
cd backend
npm install
npm run migrate
```

### 4. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Running the Application

### Development Mode
```bash
# From root directory - runs both backend and frontend
npm run dev

# Or run separately:
npm run dev:backend  # Backend on port 3001
npm run dev:frontend # Frontend on port 3000
```

### Production Mode
```bash
npm run build
npm start
```

## Testing

### Run All Tests
```bash
npm test
```

### Backend Tests Only
```bash
cd backend
npm test
npm run coverage
```

### Frontend Tests Only
```bash
cd frontend
npm test
```

## Database Operations

### Run Migrations
```bash
cd backend
npm run migrate
```

### Create New Migration
1. Create new .sql file in `backend/src/migrations/`
2. Name it with sequence number: `002_add_new_table.sql`
3. Run migrations: `npm run migrate`

## Code Quality

### Linting
```bash
# Backend
cd backend
npm run lint
npm run lint:fix

# Frontend
cd frontend
npm run lint
npm run lint:fix
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in .env
   - Ensure database exists

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill process using the port: `lsof -ti:3001 | xargs kill`

3. **Module Not Found**
   - Delete node_modules and package-lock.json
   - Run `npm install` again

4. **Migration Errors**
   - Check database connection
   - Verify migration SQL syntax
   - Check migration hasn't been run already

### Getting Help
- Check project documentation in `docs/`
- Review CLAUDE.md for development guidelines
- Check GitHub issues for known problems
