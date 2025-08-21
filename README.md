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

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- Groq API key (get one at [Groq Console](https://console.groq.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gzeu/ai-content-wizard.git
   cd ai-content-wizard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Groq API key.

## 🛠️ Usage

### Basic Commands

```bash
# Generate content with default settings
node src/cli.js generate "Your prompt here"

# Generate with custom parameters
node src/cli.js generate --temperature 0.9 --max-tokens 500 "Your prompt"

# List available models
node src/cli.js models

# Get help
node src/cli.js --help
```

### Available Models

- `llama3-8b-8192`: Fast and efficient for most tasks (default)
- `llama3-70b-8192`: More powerful but slower

## 🔧 Configuration

Edit the `.env` file to configure default settings:

```env
GROQ_API_KEY=your_api_key_here
TEMPERATURE=0.7
MAX_TOKENS=2048
```

## 📚 Documentation

For detailed documentation, please refer to the [Wiki](https://github.com/Gzeu/ai-content-wizard/wiki).

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
