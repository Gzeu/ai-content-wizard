const { expect } = require('chai');
const sinon = require('sinon');
const https = require('https');

// Import the AIProvider instance
const AIProvider = require('../ai-provider');

// Import and run the test setup
require('./setup')();

describe('AI Provider', () => {
  let sandbox;
  let originalApiKey;
  let originalConfig;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    // Store the original API key and config
    originalApiKey = process.env.GROQ_API_KEY;
    originalConfig = { ...AIProvider.config };
    
    // Set a test API key
    process.env.GROQ_API_KEY = 'test-key';
    
    // Reset the instance for each test
    AIProvider.config = {
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 2048
    };
  });

  afterEach(() => {
    // Restore originals
    process.env.GROQ_API_KEY = originalApiKey;
    AIProvider.config = originalConfig;
    sandbox.restore();
  });

  describe('configuration', () => {
    it('should have default configuration', () => {
      expect(AIProvider.config.model).to.equal('llama3-8b-8192');
      expect(AIProvider.config.temperature).to.equal(0.7);
      expect(AIProvider.config.max_tokens).to.equal(2048);
    });

    it('should throw an error if no API key is provided', () => {
      delete process.env.GROQ_API_KEY;
      // Need to require a fresh instance to test the constructor
      const createAIProvider = () => {
        // Clear the module cache to force a fresh require
        delete require.cache[require.resolve('../ai-provider')];
        return require('../ai-provider');
      };
      expect(createAIProvider).to.throw('GROQ_API_KEY is not properly configured in .env file.');
    });
  });

  describe('generateText', () => {
    it('should return a string response', async () => {
      // Mock the actual API call
      const mockResponse = {
        choices: [{
          message: {
            content: 'This is a test response'
          }
        }]
      };

      // Stub the https.request method
      const requestStub = {
        on: sandbox.stub(),
        write: sandbox.stub(),
        end: sandbox.stub()
      };
      
      // Simulate successful response
      requestStub.on.withArgs('response').yields({
        statusCode: 200,
        on: (event, callback) => {
          if (event === 'data') {
            callback(JSON.stringify(mockResponse));
          }
          if (event === 'end') {
            callback();
          }
        }
      });
      
      sandbox.stub(https, 'request').returns(requestStub);

      const response = await AIProvider.generateText('Test prompt');
      expect(response).to.be.a('string');
      expect(response).to.equal('This is a test response');
    });

    it('should throw an error if the API call fails', async () => {
      // Stub the https.request method to simulate an error
      const requestStub = {
        on: sandbox.stub(),
        write: sandbox.stub(),
        end: sandbox.stub()
      };
      
      // Simulate error
      requestStub.on.withArgs('error').yields(new Error('API Error'));
      
      sandbox.stub(https, 'request').returns(requestStub);

      await expect(AIProvider.generateText('Test prompt'))
        .to.be.rejectedWith('API Error');
    });
  });

  describe('model validation', () => {
    it('should accept valid models', async () => {
      // Stub the actual API call
      const requestStub = {
        on: sandbox.stub(),
        write: sandbox.stub(),
        end: sandbox.stub()
      };
      
      // Simulate successful response
      requestStub.on.withArgs('response').yields({
        statusCode: 200,
        on: (event, callback) => {
          if (event === 'data') {
            callback(JSON.stringify({ choices: [{ message: { content: 'response' } }] }));
          }
          if (event === 'end') {
            callback();
          }
        }
      });
      
      sandbox.stub(https, 'request').returns(requestStub);

      // Test with valid model
      AIProvider.config.model = 'llama3-70b-8192';
      const response = await AIProvider.generateText('Test prompt');
      expect(response).to.equal('response');
    });

    it('should reject invalid models', async () => {
      // Test with invalid model
      AIProvider.config.model = 'invalid-model';
      await expect(AIProvider.generateText('Test prompt'))
        .to.be.rejectedWith(`Invalid model: invalid-model. Valid models are: ${AIProvider.validModels.join(', ')}`);
    });
  });
});
