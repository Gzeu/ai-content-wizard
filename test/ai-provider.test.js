const { expect } = require('chai');
const AIProvider = require('../ai-provider');

// Mock the actual API calls to avoid hitting the real API during tests
const sinon = require('sinon');

// Import and run the test setup
require('./setup')();

describe('AI Provider', () => {
  let sandbox;
  let originalApiKey;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    // Store the original API key
    originalApiKey = process.env.GROQ_API_KEY;
    // Set a test API key
    process.env.GROQ_API_KEY = 'test-key';
    // Reset the instance for each test
    Object.assign(AIProvider, {
      model: 'llama3-8b-8192',
      temperature: 0.7,
      maxTokens: 100
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('configuration', () => {
    it('should have default configuration', () => {
      expect(AIProvider.model).to.equal('llama3-8b-8192');
      expect(AIProvider.temperature).to.equal(0.7);
      expect(AIProvider.maxTokens).to.equal(100);
    });

    it('should throw an error if no API key is provided', () => {
      delete process.env.GROQ_API_KEY;
      expect(() => require('../ai-provider')).to.throw('GROQ_API_KEY is not properly configured in .env file.');
    });
  });

  describe('generateContent', () => {
    it('should return a string response', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'This is a test response'
          }
        }]
      };

      // Mock the callAPI method
      const originalCallAPI = AIProvider.callAPI;
      AIProvider.callAPI = sandbox.stub().resolves(mockResponse);

      try {
        const response = await AIProvider.generateContent('Test prompt');
        expect(response).to.be.a('string');
        expect(response).to.equal('This is a test response');
      } finally {
        // Restore the original method
        AIProvider.callAPI = originalCallAPI;
      }
    });

    it('should throw an error if the API call fails', async () => {
      // Mock the callAPI method to reject
      const originalCallAPI = AIProvider.callAPI;
      AIProvider.callAPI = sandbox.stub().rejects(new Error('API Error'));

      try {
        await expect(AIProvider.generateContent('Test prompt'))
          .to.be.rejectedWith('API Error');
      } finally {
        // Restore the original method
        AIProvider.callAPI = originalCallAPI;
      }
    });
  });

  describe('listModels', () => {
    it('should return an array of available models', () => {
      const models = AIProvider.listModels();
      expect(models).to.be.an('array');
      expect(models).to.include('llama3-8b-8192');
      expect(models).to.include('llama3-70b-8192');
    });
  });

  describe('setModel', () => {
    it('should set the model if it exists', () => {
      const originalModel = AIProvider.model;
      try {
        AIProvider.setModel('llama3-70b-8192');
        expect(AIProvider.model).to.equal('llama3-70b-8192');
      } finally {
        // Restore the original model
        AIProvider.model = originalModel;
      }
    });

    it('should throw an error if the model does not exist', () => {
      expect(() => AIProvider.setModel('non-existent-model')).to.throw('Model not supported');
    });
  });

  describe('setTemperature', () => {
    it('should set the temperature within valid range', () => {
      const originalTemp = AIProvider.temperature;
      try {
        AIProvider.setTemperature(0.5);
        expect(AIProvider.temperature).to.equal(0.5);
      } finally {
        // Restore the original temperature
        AIProvider.temperature = originalTemp;
      }
    });

    it('should throw an error if temperature is out of range', () => {
      expect(() => AIProvider.setTemperature(-1)).to.throw('Temperature must be between 0 and 2');
      expect(() => AIProvider.setTemperature(2.1)).to.throw('Temperature must be between 0 and 2');
    });
  });
});
