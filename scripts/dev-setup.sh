#!/bin/bash

# Development startup script
echo "Starting Full-Stack CRUD Foundation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready &> /dev/null; then
    echo "PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Create logs directory
mkdir -p backend/logs

# Copy environment file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "Creating environment file..."
    cp backend/.env.example backend/.env
    echo "Please update backend/.env with your database credentials"
fi

# Run migrations
echo "Running database migrations..."
cd backend && npm run migrate
cd ..

# Start development servers
echo "Starting development servers..."
npm run dev

