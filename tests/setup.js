// Global test setup
process.env.NODE_ENV = "test";
process.env.DB_NAME = "project_foundation_api_test";
process.env.JWT_SECRET = "test-secret";

// Suppress console logs during tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
