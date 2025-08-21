// Load environment variables for tests
require('dotenv').config({ path: '.env.test' });

// Global test setup
process.env.NODE_ENV = 'test';

// Mock console methods to prevent cluttering test output
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};
