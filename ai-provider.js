const https = require('https');

class AIProvider {
  constructor() {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      throw new Error('GROQ_API_KEY is not properly configured in .env file.');
    }
    this.apiKey = process.env.GROQ_API_KEY;
    this.validModels = ['llama3-8b-8192', 'llama3-70b-8192'];
    this.config = {
      model: 'llama3-8b-8192',
      temperature: Math.min(Math.max(parseFloat(process.env.TEMPERATURE) || 0.7, 0), 1),
      max_tokens: Math.min(parseInt(process.env.MAX_TOKENS) || 2048, 8192),
    };

    // Debug logging
    if (process.env.DEBUG_GROQ) {
      console.log('[DEBUG] AI Provider initialized with config:', {
        model: this.config.model,
        temperature: this.config.temperature,
        max_tokens: this.config.max_tokens,
        validModels: this.validModels,
        hasApiKey: !!this.apiKey
      });
    }
  }

  async generateText(prompt, options = {}) {
    const config = { ...this.config, ...options };
    
    // Validate model
    if (!this.validModels.includes(config.model)) {
      throw new Error(`Invalid model: ${config.model}. Valid models are: ${this.validModels.join(', ')}`);
    }

    // Prepare the request data
    const postData = JSON.stringify({
      model: config.model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: Math.max(0, Math.min(1, config.temperature)), // Ensure between 0 and 1
      max_tokens: Math.max(1, Math.min(8192, config.max_tokens)) // Ensure reasonable limits
    });

    if (process.env.DEBUG_GROQ) {
      console.log('[DEBUG] Sending request to Groq API with model:', config.model);
      console.log('[DEBUG] Request payload:', postData);
    }

    const requestOptions = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    // Debug logging can be enabled by setting DEBUG_GROQ environment variable
    if (process.env.DEBUG_GROQ) {
      console.log('[DEBUG] Sending request to Groq API...');
      console.log(`[DEBUG] Request URL: https://${requestOptions.hostname}${requestOptions.path}`);
    }

    return new Promise((resolve, reject) => {
      const req = https.request(requestOptions, (res) => {
        let data = '';
        if (process.env.DEBUG_GROQ) {
          console.log(`[DEBUG] Response status: ${res.statusCode}`);
        }
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            
            if (response.error) {
              const errorMsg = response.error.message || 'Error from Groq API';
              if (process.env.DEBUG_GROQ) {
                console.error('[DEBUG] API Error:', response.error);
              }
              reject(new Error(errorMsg));
              return;
            }
            
            if (response.choices?.[0]?.message?.content) {
              if (process.env.DEBUG_GROQ) {
                console.log('[DEBUG] Successfully processed Groq API response');
              }
              resolve(response.choices[0].message.content);
            } else {
              const errorMsg = 'Unexpected response format from Groq API';
              if (process.env.DEBUG_GROQ) {
                console.error('[DEBUG] Unexpected response format:', JSON.stringify(response, null, 2));
              }
              reject(new Error(errorMsg));
            }
          } catch (e) {
            console.error('Error parsing Groq API response:', e);
            console.log('Raw response that caused error:', data);
            reject(e);
          }
        });
      });

      req.on('error', (error) => {
        if (process.env.DEBUG_GROQ) {
          console.error('[DEBUG] Request error:', {
            message: error.message,
            code: error.code,
            stack: process.env.DEBUG_GROQ_VERBOSE ? error.stack : undefined
          });
        }
        reject(error);
      });

      // Handle timeout
      const timeoutMs = parseInt(process.env.GROQ_TIMEOUT_MS, 10) || 30000;
      req.setTimeout(timeoutMs, () => {
        const timeoutError = new Error(`Request timeout after ${timeoutMs}ms`);
        timeoutError.code = 'ETIMEDOUT';
        if (process.env.DEBUG_GROQ) {
          console.error('[DEBUG] Request timed out');
        }
        req.destroy(timeoutError);
      });

      // Log request headers and body in debug mode
      if (process.env.DEBUG_GROQ) {
        console.log('[DEBUG] Request Headers:', requestOptions.headers);
        console.log('[DEBUG] Request Body:', postData);
      }

      // Handle response
      req.on('response', (res) => {
        if (process.env.DEBUG_GROQ) {
          console.log(`[DEBUG] Response Status: ${res.statusCode} ${res.statusMessage}`);
          console.log('[DEBUG] Response Headers:', res.headers);
        }
      });

      req.on('error', (error) => {
        if (process.env.DEBUG_GROQ) {
          console.error('[DEBUG] Request Error:', {
            message: error.message,
            code: error.code,
            stack: process.env.DEBUG_GROQ_VERBOSE ? error.stack : undefined
          });
        }
        reject(error);
      });

      // Send the request
      req.write(postData);
      req.end();
    });
  }
}

module.exports = new AIProvider();
