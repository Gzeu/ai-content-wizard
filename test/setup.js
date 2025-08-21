// Load environment variables for tests
require('dotenv').config({ path: '.env.test' });

// Global test setup
process.env.NODE_ENV = 'test';

// Simple console mock to prevent cluttering test output
const originalConsole = { ...console };

// Mocha globals are available when running with mocha
// No need to import them explicitly in the test environment

// Export a function that sets up the test environment
module.exports = function() {
  beforeEach(function() {
    // Store original console methods
    global.console = {
      ...originalConsole,
      log: () => {},
      warn: () => {},
      error: () => {}
    };
  });

  afterEach(function() {
    // Restore original console methods
    global.console = originalConsole;
  });
};
