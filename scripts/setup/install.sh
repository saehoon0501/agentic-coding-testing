#!/bin/bash

# Full-Stack Application Setup Script

set -e

echo "🚀 Setting up Full-Stack Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
cp .env.example .env
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
cp .env.example .env
npm install
cd ..

echo "🐳 Starting Docker services..."
docker-compose up -d postgres

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "🗄️ Setting up database schema..."
docker-compose exec -T postgres psql -U postgres -d fullstack_app < database/schemas/initial_schema.sql

echo "✅ Setup completed successfully!"
echo ""
echo "🎉 Your application is ready!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "To start with Docker:"
echo "  docker-compose up"
echo ""
echo "Access your application:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001"
echo "  Health:   http://localhost:3001/health"
