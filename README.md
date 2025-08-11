# CRUD Application Framework

This project implements a full-stack CRUD application with proper infrastructure setup, following standardized project conventions and best practices.

## Project Structure

```
crud-application-framework/
├── README.md                 # Project overview and setup instructions
├── package.json              # Root workspace configuration and scripts
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore patterns
├── docs/                    # Project documentation
│   ├── API.md               # API documentation
│   └── DEVELOPMENT.md       # Development guidelines
│
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/     # API endpoint controllers
│   │   ├── models/          # Database entity models  
│   │   ├── repositories/    # Data access layer (Repository pattern)
│   │   ├── middleware/      # Express middleware components
│   │   ├── services/        # Business logic services
│   │   ├── config/          # Application configuration
│   │   ├── migrations/      # Database migration files
│   │   └── utils/           # Utility functions
│   ├── tests/               # Unit and integration tests
│   └── package.json         # Backend dependencies
│
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API integration layer
│   │   ├── utils/           # Frontend utility functions
│   │   └── styles/          # CSS and styling files
│   ├── tests/               # Frontend tests
│   └── package.json         # Frontend dependencies
│
├── crud-framework/          # Reusable CRUD framework components
│   ├── src/                 # Framework source code
│   ├── config/              # Framework configuration
│   ├── tests/               # Framework tests
│   └── package.json         # Framework dependencies
│
└── scripts/                 # Build and deployment scripts
    ├── build.sh
    └── deploy-staging.sh
```

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- PostgreSQL (v12 or higher)
- Git for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd crud-application-framework
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your database and configuration details
   ```

3. **Install all dependencies (recommended)**
   ```bash
   npm install
   ```

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Run migrations: `npm run migrate`
4. Start development server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

### Full Stack Development
```bash
# Start both backend and frontend concurrently
npm run dev

# Run tests for both applications
npm run test

# Build both applications
npm run build
```

## API Endpoints

### Health Check
- **GET /health** - Application health status

### Entities CRUD
- **GET /api/entities** - List all entities (paginated)
- **GET /api/entities/:id** - Get single entity
- **POST /api/entities** - Create new entity
- **PUT /api/entities/:id** - Update entire entity
- **PATCH /api/entities/:id** - Partial entity update
- **DELETE /api/entities/:id** - Delete entity

## Development Guidelines

- Follow RESTful API conventions
- Implement proper error handling and logging
- Write tests for all new features
- Use consistent code formatting
- Follow the repository pattern for data access

## Testing

- Backend: `npm test` (in backend directory)
- Frontend: `npm test` (in frontend directory)
- Coverage: `npm run coverage`

## Deployment

CI/CD pipeline is configured to automatically:
1. Run tests on code commits
2. Build artifacts
3. Deploy to staging environment

See `scripts/` directory for deployment scripts.