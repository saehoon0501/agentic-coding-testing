#!/bin/bash

# Development setup script
echo "Setting up CRUD Application development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ $NODE_VERSION -lt 16 ]; then
    echo "Error: Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "Node.js version: $(node -v) ✓"

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
if [ ! -f package.json ]; then
    echo "Error: backend/package.json not found"
    exit 1
fi

npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install backend dependencies"
    exit 1
fi

# Create logs directory
mkdir -p logs

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file from .env.example"
fi

cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
if [ ! -f package.json ]; then
    echo "Error: frontend/package.json not found"
    exit 1
fi

npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Install root dependencies
echo "Installing root dependencies..."
npm install

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "To start development:"
echo "  npm run dev          # Start both backend and frontend"
echo "  npm run backend:dev  # Start only backend"
echo "  npm run frontend:dev # Start only frontend"
echo ""
echo "To run tests:"
echo "  npm test             # Run all tests"
echo "  npm run backend:test # Run backend tests"
echo "  npm run frontend:test# Run frontend tests"
echo ""
echo "Backend will run on: http://localhost:3001"
echo "Frontend will run on: http://localhost:3000"
