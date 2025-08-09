#!/bin/bash

# Development setup script
echo "Setting up Project Foundation API..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create logs directory
mkdir -p logs

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file from .env.example"
    echo "Please update the database credentials in .env file"
fi

# Run database migrations (if database is available)
echo "Running database migrations..."
npm run migrate 2>/dev/null || echo "Database migrations skipped (database not available)"

echo "Setup complete!"
echo "To start the development server, run: npm run dev"
echo "To run tests, run: npm test"
echo "API documentation will be available at: http://localhost:3000/api-docs"
