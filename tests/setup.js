// Global test setup
process.env.NODE_ENV = "test";
process.env.DB_NAME = "test_db";

// Suppress console logs during tests
if (process.env.NODE_ENV === "test") {
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
}
