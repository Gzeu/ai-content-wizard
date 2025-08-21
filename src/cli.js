#!/usr/bin/env node

/**
 * 🚀 AI Content Wizard - Groq-Powered CLI
 * 
 * A powerful CLI tool for AI-powered content generation using Groq's API.
 * 
 * Features:
 * - AI-powered content generation with Groq
 * - Support for multiple models (llama3-8b-8192, mixtral-8x7b-32768, etc.)
 * - Configurable parameters (temperature, max tokens, etc.)
 * - Built-in debugging capabilities
 */

const { program } = require('commander');
const chalk = require('chalk').default;
const inquirer = require('inquirer');
const ora = require('ora').default;
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

// Import our AI provider
const ai = require('../ai-provider');

// ASCII Art Banner
const banner = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║    🧙‍♂️  ✨  AI CONTENT WIZARD  ✨  🧙‍♂️                    ║
║                                                           ║
║    Groq-Powered Content Generation Tool                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`;

// Show banner only once
let bannerShown = false;

function showBanner() {
  if (!bannerShown) {
    console.log(chalk.magenta(banner));
    bannerShown = true;
  }
}

// Main program setup
program
  .name('ai-wizard')
  .description('🧙‍♂️ AI Content Wizard - Groq-Powered Content Generation')
  .version('1.0.0')
  .configureHelp({
    showGlobalOptions: true,
    sortSubcommands: true,
    sortOptions: true
  });

// Global error handling
process.on('unhandledRejection', (error) => {
  console.error(chalk.red('\nAn unexpected error occurred:'));
  console.error(chalk.red(error.message));
  if (process.env.DEBUG_GROQ) {
    console.error(chalk.dim(error.stack));
  }
  process.exit(1);
});

// Generate command
program
  .command('generate <prompt>')
  .description('Generate content using AI')
  .option('-m, --model <model>', 'AI model to use', 'llama3-8b-8192')
  .option('-t, --temp <temperature>', 'Temperature (0.0 to 1.0)', parseFloat, 0.7)
  .option('--max-tokens <tokens>', 'Maximum tokens to generate', parseInt, 2048)
  .option('--debug', 'Enable debug mode', false)
  .action(async (prompt, options) => {
    // Always show banner for now
    showBanner();
    
    if (options.debug) {
      console.log('[DEBUG] Starting generation with options:', JSON.stringify(options, null, 2));
      console.log('[DEBUG] Environment:', {
        NODE_ENV: process.env.NODE_ENV,
        DEBUG_GROQ: process.env.DEBUG_GROQ,
        GROQ_API_KEY: process.env.GROQ_API_KEY ? '*** (set)' : 'Not set!'
      });
    }
    
    const spinner = ora('Generating content...').start();
    
    try {
      if (options.debug) {
        process.env.DEBUG_GROQ = 'true';
        console.log(chalk.dim('\n[DEBUG] Using options:'), options);
        console.log(chalk.dim(`[DEBUG] Model: ${options.model}, Temperature: ${options.temp}, Max Tokens: ${options.maxTokens}`));
      }

      if (!prompt || prompt.trim() === '') {
        throw new Error('Please provide a prompt for content generation');
      }

      const response = await ai.generateText(prompt, {
        model: options.model,
        temperature: options.temp,
        max_tokens: options.maxTokens
      });

      spinner.succeed(chalk.green('Generation complete!'));
      
      // Format the output with a nice border
      const terminalWidth = process.stdout.columns || 80;
      const border = '='.repeat(terminalWidth);
      
      console.log(`
${chalk.blue(border)}
${chalk.bold('PROMPT:')} ${chalk.dim(prompt)}
${chalk.blue(border)}
${response}
${chalk.blue(border)}
`);
    } catch (error) {
      spinner.fail('Generation failed');
      console.error(chalk.red('\nError:'), error.message);
      if (options.debug) {
        console.error(chalk.dim('\n[DEBUG] Stack trace:'), error.stack);
      }
      process.exit(1);
    }
  });

// Models command
program
  .command('models')
  .description('List available AI models')
  .action(() => {
    showBanner();
    console.log('\nAvailable Models:\n');
    
    const models = [
      {
        name: 'llama3-8b-8192',
        description: 'Llama 3 8B (8k context) - Fast and efficient for most tasks'
      },
      {
        name: 'llama3-70b-8192',
        description: 'Llama 3 70B (8k context) - More powerful but slower'
      }
    ];
    
    models.forEach(model => {
      console.log(`• ${chalk.bold(model.name)}`);
      console.log(`  ${model.description}\n`);
    });
  });

// Config command
program
  .command('config')
  .description('View or update configuration')
  .option('--set <key=value>', 'Set a configuration value')
  .action(async (options) => {
    const configPath = path.join(process.cwd(), '.env');
    
    if (options.set) {
      const [key, value] = options.set.split('=');
      if (!key || !value) {
        console.error(chalk.red('Error: Invalid format. Use --set KEY=VALUE'));
        process.exit(1);
      }
      
      // Read current config
      let config = {};
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8');
        content.split('\n').forEach(line => {
          if (line && !line.startsWith('#')) {
            const [k, v] = line.split('=');
            if (k && v) config[k.trim()] = v.trim();
          }
        });
      }
      
      // Update config
      config[key.trim()] = value.trim();
      
      // Write back to file
      const configContent = Object.entries(config)
        .map(([k, v]) => `${k}=${v}`)
        .join('\n');
      
      fs.writeFileSync(configPath, configContent);
      console.log(chalk.green(`✅ Updated ${key} in config`));
    } else {
      // Show current config
      if (fs.existsSync(configPath)) {
        console.log(chalk.bold('\nCurrent Configuration:\n'));
        console.log(fs.readFileSync(configPath, 'utf-8'));
      } else {
        console.log(chalk.yellow('No configuration file found. Run with --help to see available options.'));
      }
    }
  });

// Help command by default
if (process.argv.length <= 2) {
  showBanner();
  console.log(chalk.cyan('\nWelcome to AI Content Wizard!\n'));
  program.outputHelp();
  console.log('\nExamples:');
  console.log('  $ ai-wizard generate "Tell me a fun fact about space"');
  console.log('  $ ai-wizard generate "Write a short story about a robot" --model mixtral-8x7b-32768');
  console.log('  $ ai-wizard models');
  console.log('\nFor more information, visit: https://github.com/yourusername/ai-content-wizard\n');
  process.exit(0);
}

// Parse command line arguments
program.parse(process.argv);
