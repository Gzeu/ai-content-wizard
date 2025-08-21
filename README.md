# 🧙‍♂️ AI Content Wizard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A high-performance CLI tool for AI-powered content generation using Groq's ultra-fast inference engine. Create, automate, and manage AI-generated content with ease.

## ✨ Features

- ⚡ **Lightning Fast** - Leverage Groq's high-speed inference engine
- 🤖 **Multiple Models** - Support for various AI models including llama3-8b-8192 and llama3-70b-8192
- 🔧 **Fully Configurable** - Customize temperature, token limits, and more
- 🐛 **Built-in Debugging** - Comprehensive debug mode for development
- 🔒 **Secure** - Environment-based API key management
- 📦 **Easy to Use** - Simple CLI interface with intuitive commands

## 📖 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Configuration](#-configuration)
- [Examples](#-examples)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- Groq API key (get one at [Groq Console](https://console.groq.com/))

### Installation

#### As a global CLI tool (recommended):
```bash
npm install -g ai-content-wizard
```

#### For development:
```bash
# Clone the repository
git clone https://github.com/Gzeu/ai-content-wizard.git
cd ai-content-wizard

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env and add your Groq API key
```

## 🛠️ Usage

### Basic Commands

```bash
# Generate content with default settings
ai-wizard generate "Your prompt here"

# Generate with custom parameters
ai-wizard generate --temperature 0.9 --max-tokens 500 "Your prompt"

# List available models
ai-wizard models

# Get help
ai-wizard --help
```

### Available Models

- `llama3-8b-8192`: Fast and efficient for most tasks (default)
- `llama3-70b-8192`: More powerful but slower

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Required: Your Groq API key
GROQ_API_KEY=your_api_key_here

# Optional: Default model to use (llama3-8b-8192 or llama3-70b-8192)
DEFAULT_MODEL=llama3-8b-8192

# Optional: Default temperature (0.0 to 1.0)
TEMPERATURE=0.7

# Optional: Maximum number of tokens to generate
MAX_TOKENS=2048

# Optional: Enable debug mode (true/false)
DEBUG=false
```

## 📚 API Reference

### Groq Class

The main class for interacting with the Groq API.

#### Constructor
```javascript
const groq = new Groq({
  apiKey: 'your-api-key',  // Required
  model: 'llama3-8b-8192', // Optional, default: 'llama3-8b-8192'
  temperature: 0.7,        // Optional, default: 0.7
  maxTokens: 2048          // Optional, default: 2048
});
```

#### Methods

##### `generateContent(prompt, options)`: `Promise<string>`
Generates content based on the given prompt.

**Parameters:**
- `prompt` (string): The input prompt
- `options` (object): Optional overrides
  - `model` (string): Model to use
  - `temperature` (number): 0.0 to 1.0
  - `maxTokens` (number): Maximum tokens to generate

**Returns:** `Promise<string>` - Generated content

**Example:**
```javascript
const content = await groq.generateContent('Hello, world!', {
  temperature: 0.9,
  maxTokens: 500
});
```

##### `listModels()`: `string[]`
Returns an array of available model names.

**Returns:** `string[]` - Array of model names

**Example:**
```javascript
const models = groq.listModels();
console.log(models); // ['llama3-8b-8192', 'llama3-70b-8192']
```

## 🚀 Examples

### Basic Usage
```javascript
const { Groq } = require('ai-content-wizard');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateResponse() {
  try {
    const response = await groq.generateContent(
      'Write a short story about a robot'
    );
    console.log(response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateResponse();
```

### Advanced Usage with Options
```javascript
const { Groq } = require('ai-content-wizard');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  model: 'llama3-70b-8192', // Use the larger model
  temperature: 0.9,         // More creative responses
  maxTokens: 1000           // Longer responses
});

async function generateCreativeContent() {
  const response = await groq.generateContent(
    'Write a creative product description for a smartwatch',
    {
      temperature: 0.8,
      maxTokens: 300
    }
  );
  console.log(response);
}

generateCreativeContent();
```

### CLI Usage Examples

#### Basic Generation
```bash
# Generate content with default settings
ai-wizard generate "Write a poem about AI"

# Use a specific model
ai-wizard generate --model llama3-70b-8192 "Explain quantum computing"

# Adjust creativity (0.0 to 1.0)
ai-wizard generate --temperature 0.9 "Write a creative story"

# Limit response length
ai-wizard generate --max-tokens 500 "Summarize this article: [paste article]"
```

#### List Available Models
```bash
ai-wizard models
```

## 📚 Documentation

For detailed documentation, please refer to the [Wiki](https://github.com/Gzeu/ai-content-wizard/wiki).

## 🚀 Release Process

This project uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) for automated version management and package publishing. The release process is fully automated through GitHub Actions.

### How It Works

1. **Commit Messages**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.
   - `feat:` A new feature (triggers a minor version bump)
   - `fix:` A bug fix (triggers a patch version bump)
   - `docs:` Documentation only changes
   - `style:` Changes that do not affect the meaning of the code
   - `refactor:` A code change that neither fixes a bug nor adds a feature
   - `perf:` A code change that improves performance
   - `test:` Adding missing tests or correcting existing tests
   - `chore:` Changes to the build process or auxiliary tools

2. **Automatic Versioning**: When code is pushed to the `main` branch, semantic-release will:
   - Analyze commit messages
   - Determine the next version number
   - Generate release notes
   - Create a git tag
   - Publish to npm
   - Create a GitHub release

3. **Manual Releases**: To manually trigger a release, create a new release in the GitHub UI.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using [Groq](https://groq.com/)
- Inspired by the need for fast, reliable AI content generation
- Thanks to all contributors who have helped improve this project
```

## 🔧 Configuration

Edit the `.env` file to configure the application:

```env
# Required: Your Groq API key
GROQ_API_KEY=your_groq_api_key_here

# Optional: Debug settings
DEBUG_GROQ=false
DEBUG_GROQ_VERBOSE=false

# Optional: Request timeout in milliseconds (default: 30000)
GROQ_TIMEOUT_MS=30000

# Model Configuration
DEFAULT_AI_PROVIDER=groq
MAX_TOKENS=2048
TEMPERATURE=0.7
```

## 📖 Available Commands

### Generate Content
```bash
node cli.js generate <prompt> [options]

Options:
  -m, --model <model>    AI model to use (default: llama3-8b-8192)
  -t, --temp <number>    Temperature (0.0 to 1.0, default: 0.7)
  --max-tokens <number>  Maximum tokens to generate (default: 2048)
  --debug                Enable debug mode
```

### List Models
```bash
node cli.js models
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Or run individual test files:

```bash
node test-app.js
```

## 🐛 Debugging

Enable debug logging:

```bash
# Enable basic debug logging
export DEBUG_GROQ=true

# For verbose debug output (includes stack traces)
export DEBUG_GROQ_VERBOSE=true

# Run your command
node cli.js generate "Test prompt"
```

## 📝 Examples

Generate a blog post outline:
```bash
node cli.js generate "Create an outline for a blog post about AI in healthcare"
```

Generate with custom parameters:
```bash
node cli.js generate --temperature 0.9 --max-tokens 500 "Write a creative story about a robot learning to paint"
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT

## 💡 Support

For support, please open an issue in the GitHub repository.
## 📚 More Examples

### Generate Code
```bash
node cli.js generate "Write a Python function to sort a list of dictionaries by a specific key"
```

### Get Technical Explanation
```bash
node cli.js generate --temperature 0.3 "Explain how React hooks work in simple terms"
```

### Creative Writing
```bash
node cli.js generate --temperature 0.9 --max-tokens 1000 "Write a short story about a robot discovering human emotions"
```
## 🔍 Debugging Tips

### Common Issues

1. **API Connection Issues**
   - Verify your `GROQ_API_KEY` is set correctly in `.env`
   - Check your internet connection
   - Try increasing the `GROQ_TIMEOUT_MS` value

2. **Rate Limiting**
   - The Groq API has rate limits. If you hit them, you'll need to wait before making more requests.
   - Check the response headers for rate limit information.

3. **Model Availability**
   - Ensure the model you're trying to use is available in your Groq account
   - Some models may be in beta or require special access

## 🏗️ Project Structure

```
.
├── .env                   # Environment variables
├── .env.example          # Example environment variables
├── ai-provider.js        # Main AI provider implementation
├── cli.js                # Command line interface
├── test-app.js           # Test script for the AI provider
├── test-groq.js          # Direct Groq API test script
└── README.md             # This file
```

## 📚 Additional Resources

- [Groq API Documentation](https://console.groq.com/docs)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Getting Started with Groq](https://console.groq.com/docs/quickstart)

## 🚀 Getting Help

If you encounter any issues or have questions, please:

1. Check the [troubleshooting](#-debugging-tips) section
2. Search the [GitHub issues](https://github.com/yourusername/ai-content-wizard/issues)
3. Open a new issue if your problem isn't already reported

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for their amazing inference engine
- All the open-source contributors who made this project possible
## 🎯 Use Cases

### Content Creation
- Generate blog posts and articles
- Create social media content
- Write product descriptions
- Develop marketing copy

### Development
- Generate code snippets
- Get programming help
- Create documentation
- Write test cases

### Education
- Get explanations of complex topics
- Generate study materials
- Create quizzes and exercises
- Get help with homework

### Business Use Cases
- Automate content creation workflows
- Generate reports and summaries
- Create product documentation
- Develop training materials

### Developers
- Scrape and analyze competitor content
- Automate documentation generation
- Create marketing materials
- Build content-driven applications

### Businesses
- Scale content production
- Maintain consistent social presence
- Analyze market trends
- Automate reporting

## 🧪 Examples

### Generate a Complete Blog Post with Images
```bash
ai-wizard workflow --topic "Sustainable Technology" --full
```

### Create Social Media Campaign
```bash
# Analyze trends
ai-wizard trends -p twitter -k "sustainability,technology"

# Generate content
ai-wizard generate -t social -p "Sustainable tech innovations" -c 5

# Create images
ai-wizard image -p "Green technology concept" -c 3 --style minimalist

# Schedule posts
ai-wizard social -p twitter --auto --schedule "14:00"
```

### Research and Content Creation
```bash
# Scrape relevant content
ai-wizard scrape -k "AI,automation,2025" --analyze

# Generate informed content
ai-wizard generate -t blog -p "AI Automation Trends in 2025"

# Create supporting visuals
ai-wizard image -p "AI automation workflow diagram" -c 2
```

## 🛠️ Advanced Features

### Custom Templates
Create custom content templates in the `templates/` directory.

### Batch Processing
Process multiple prompts from a JSON file.

### Integration APIs
Extend functionality with webhook integrations.

### Analytics Dashboard
Track performance metrics across all platforms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- 📧 Email: support@aicontentwizard.com
- 💬 Discord: [AI Content Wizard Community]
- 📖 Documentation: [Full Docs]
- 🐛 Issues: [GitHub Issues]

---

**Made with ❤️ and AI by the AI Content Wizard Team**

*Transform your content creation workflow today!*
