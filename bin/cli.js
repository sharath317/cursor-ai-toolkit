#!/usr/bin/env node

/**
 * cursor-ai-toolkit CLI
 * AI Self-Improvement Commands for Cursor IDE
 * Learning, Rules, and Context Management
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const VERSION = '1.0.1';
const CURSOR_DIR = '.cursor';
const COMMANDS_DIR = 'commands';

const colors = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

const log = {
    info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    step: (msg) => console.log(`  ${colors.dim}→${colors.reset} ${msg}`),
    header: (msg) => console.log(`\n${colors.bold}${colors.cyan}${msg}${colors.reset}\n`),
};

const BUNDLES = {
    minimal: {
        name: 'Minimal (Core Learning)',
        description: 'Essential self-improvement commands',
        commands: ['learning'],
        count: 4,
    },
    standard: {
        name: 'Standard (Learning + Context)',
        description: 'Learning with context management',
        commands: ['learning', 'context'],
        count: 8,
    },
};

function prompt(question, defaultValue = '') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const defaultText = defaultValue ? ` (${defaultValue})` : '';

    return new Promise((resolve) => {
        rl.question(`${question}${defaultText}: `, (answer) => {
            rl.close();
            resolve(answer || defaultValue);
        });
    });
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyCommands(sourceDir, targetDir, categories) {
    let copiedCount = 0;

    categories.forEach((category) => {
        const srcCategoryDir = path.join(sourceDir, category);

        if (fs.existsSync(srcCategoryDir)) {
            const files = fs.readdirSync(srcCategoryDir).filter((f) => f.endsWith('.md'));

            files.forEach((file) => {
                const srcFile = path.join(srcCategoryDir, file);
                const tgtFile = path.join(targetDir, file);

                if (!fs.existsSync(tgtFile)) {
                    fs.copyFileSync(srcFile, tgtFile);
                    log.step(`Installed: ${file}`);
                    copiedCount++;
                } else {
                    log.step(`Exists: ${file} (skipped)`);
                }
            });
        }
    });

    return copiedCount;
}

async function init(flags = {}) {
    console.log(`
${colors.bold}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 CURSOR AI TOOLKIT v${VERSION}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}
AI Self-Improvement: Learning, Rules & Context Management

`);

    const projectDir = process.cwd();
    const cursorDir = path.join(projectDir, CURSOR_DIR);
    const commandsDir = path.join(cursorDir, COMMANDS_DIR);

    log.header('📦 Select Command Bundle');

    Object.entries(BUNDLES).forEach(([key, bundle], idx) => {
        console.log(`  ${idx + 1}. ${colors.bold}${bundle.name}${colors.reset}`);
        console.log(`     ${bundle.description} (${bundle.count} commands)\n`);
    });

    let selectedBundle = 'standard';
    if (!flags.bundle && !flags.yes) {
        const bundleAnswer = await prompt('Select bundle (1-2)', '2');
        selectedBundle = Object.keys(BUNDLES)[parseInt(bundleAnswer, 10) - 1] || 'standard';
    } else if (flags.bundle) {
        selectedBundle = flags.bundle;
    }

    const bundle = BUNDLES[selectedBundle];
    log.success(`Selected: ${bundle.name}`);

    log.header('📥 Installing Commands');

    ensureDir(commandsDir);

    const packageDir = path.dirname(__dirname);
    const packageCommandsDir = path.join(packageDir, 'commands');

    const copiedCount = copyCommands(packageCommandsDir, commandsDir, bundle.commands);

    console.log(`
${colors.bold}${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ INSTALLATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.cyan}Commands installed:${colors.reset} ${copiedCount}
${colors.cyan}Location:${colors.reset}          ${commandsDir}

${colors.bold}Commands Reference:${colors.reset}

  ${colors.cyan}🧠 Learning${colors.reset}
  /generate-memories     Create persistent memories from patterns
  /generate-rules        Auto-generate .mdc rules from codebase
  /self-heal             Fix bugs and prevent similar issues
  /self-improve          Learn and evolve from user patterns

  ${colors.cyan}📊 Context${colors.reset}
  /context-prune         Manage context window, prevent drift
  /orchestrate           Multi-agent coordination
  /ask-clarification     Request missing information
  /smart-detection       Auto-detect changes and decisions

${colors.dim}Documentation: https://github.com/sharath317/cursor-ai-toolkit${colors.reset}
`);
}

async function status() {
    const projectDir = process.cwd();
    const commandsDir = path.join(projectDir, CURSOR_DIR, COMMANDS_DIR);

    if (!fs.existsSync(commandsDir)) {
        log.warn('AI Toolkit not installed. Run: npx cursor-ai-toolkit');
        process.exit(0);
    }

    const commands = fs.readdirSync(commandsDir).filter((f) => f.endsWith('.md'));

    console.log(`
${colors.bold}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 AI TOOLKIT STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}

${colors.cyan}Version:${colors.reset}  ${VERSION}
${colors.cyan}Commands:${colors.reset} ${commands.length} installed
${colors.cyan}Location:${colors.reset} ${commandsDir}

${colors.bold}Installed Commands:${colors.reset}`);

    commands.forEach((cmd) => {
        console.log(`  - /${cmd.replace('.md', '')}`);
    });

    console.log('');
}

async function listCommands() {
    const packageDir = path.dirname(__dirname);
    const packageCommandsDir = path.join(packageDir, 'commands');

    console.log(`
${colors.bold}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 AVAILABLE COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}
`);

    const categories = ['learning', 'context'];
    const icons = { learning: '🧠', context: '📊' };

    categories.forEach((cat) => {
        const catDir = path.join(packageCommandsDir, cat);
        if (fs.existsSync(catDir)) {
            console.log(`\n${icons[cat]} ${colors.bold}${cat.toUpperCase()}${colors.reset}`);

            const files = fs.readdirSync(catDir).filter((f) => f.endsWith('.md'));
            files.forEach((file) => {
                const name = file.replace('.md', '');
                console.log(`  /${name}`);
            });
        }
    });

    console.log('');
}

function showHelp() {
    console.log(`
${colors.bold}cursor-ai-toolkit v${VERSION}${colors.reset}

AI Self-Improvement Commands for Cursor IDE

${colors.bold}Usage:${colors.reset}
  npx cursor-ai-toolkit [command] [options]

${colors.bold}Commands:${colors.reset}
  init          Install commands (default)
  status        Show current configuration
  list          List all available commands
  help          Show this help

${colors.bold}Options:${colors.reset}
  --bundle      Select bundle (minimal, standard)
  -y, --yes     Non-interactive mode

${colors.bold}Examples:${colors.reset}
  npx cursor-ai-toolkit                   Interactive install
  npx cursor-ai-toolkit --bundle standard Install all commands
  npx cursor-ai-toolkit status            Check installation

${colors.bold}After Installation:${colors.reset}
  /generate-memories    Create persistent memories
  /generate-rules       Auto-generate .mdc rules
  /self-heal            Fix bugs proactively
  /context-prune        Manage context window

${colors.dim}https://github.com/sharath317/cursor-ai-toolkit${colors.reset}
`);
}

const args = process.argv.slice(2);
const flags = {};
let command = null;
const skipNextArg = new Set();

args.forEach((arg, idx) => {
    if (arg === '--bundle' && args[idx + 1]) {
        skipNextArg.add(idx + 1);
    }
});

args.forEach((arg, idx) => {
    if (skipNextArg.has(idx)) {
        return;
    } else if (arg === '-y' || arg === '--yes') {
        flags.yes = true;
    } else if (arg === '--bundle' && args[idx + 1]) {
        flags.bundle = args[idx + 1];
    } else if (!arg.startsWith('-') && command === null) {
        command = arg;
    }
});

switch (command) {
    case 'init':
    case null:
        init(flags);
        break;
    case 'status':
        status();
        break;
    case 'list':
        listCommands();
        break;
    case 'help':
    case '-h':
    case '--help':
        showHelp();
        break;
    default:
        log.error(`Unknown command: ${command}`);
        console.log('Run "npx cursor-ai-toolkit help" for usage');
        process.exit(1);
}
