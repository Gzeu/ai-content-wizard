// Load environment variables for tests
require('dotenv').config({ path: '.env.test' });

// Global test setup
process.env.NODE_ENV = 'test';

// Simple console mock to prevent cluttering test output
const originalConsole = { ...console };

beforeEach(() => {
  // Store original console methods
  global.console = {
    ...originalConsole,
    log: () => {},
    warn: () => {},
    error: () => {}
  };
});

afterEach(() => {
  // Restore original console methods
  global.console = originalConsole;
});
