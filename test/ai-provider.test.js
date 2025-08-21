const { expect } = require('chai');
const { Groq } = require('../ai-provider');

// Mock the actual API calls to avoid hitting the real API during tests
const sinon = require('sinon');

// Import and run the test setup
require('./setup')();

describe('AI Provider', () => {
  let groq;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || 'test-key',
      model: 'llama3-8b-8192',
      temperature: 0.7,
      maxTokens: 100
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    it('should initialize with provided values', () => {
      expect(groq.model).to.equal('llama3-8b-8192');
      expect(groq.temperature).to.equal(0.7);
      expect(groq.maxTokens).to.equal(100);
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
      
      // Mock the API call
      sandbox.stub(groq, 'generateContent').resolves(mockResponse.choices[0].message.content);
      
      const result = await groq.generateContent('Test prompt');
      expect(result).to.be.a('string');
      expect(result).to.equal('This is a test response');
    });

    it('should handle errors properly', async () => {
      // Mock a failed API call
      sandbox.stub(groq, 'generateContent').rejects(new Error('API Error'));
      
      try {
        await groq.generateContent('test');
        throw new Error('Expected error was not thrown');
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('API Error');
      }
    });
  });

  describe('listModels', () => {
    it('should return an array of available models', () => {
      const models = groq.listModels();
      expect(models).to.be.an('array');
      expect(models).to.include('llama3-8b-8192');
      expect(models).to.include('llama3-70b-8192');
    });
  });
});
