#!/bin/bash

# Build script for the CRUD application

echo "Building CRUD Application Framework..."

# Build backend
echo "Building backend..."
cd backend
npm install
npm run lint
npm test
echo "Backend build completed"

# Build frontend
echo "Building frontend..."
cd ../frontend
npm install
npm run lint
npm test -- --watchAll=false
npm run build
echo "Frontend build completed"

echo "Build completed successfully!"
