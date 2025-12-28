# 🧠 Cursor AI Toolkit

> AI Self-Improvement Commands for Cursor IDE - Learning, Rules & Context Management

[![npm version](https://badge.fury.io/js/cursor-ai-toolkit.svg)](https://www.npmjs.com/package/cursor-ai-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Install

```bash
npx cursor-ai-toolkit
```

One command installs 8 AI self-improvement commands for Cursor.

## What is AI Toolkit?

AI Toolkit enhances Cursor's AI capabilities with:

- **Pattern Learning** - Extract patterns from your codebase and create persistent memories
- **Rule Generation** - Auto-generate .mdc rules from established patterns
- **Self-Healing** - Fix bugs and proactively find similar issues
- **Context Management** - Prevent context drift in long conversations

## 📦 Command Bundles

| Bundle | Commands | Use Case |
|--------|----------|----------|
| **Minimal** | 4 | Core learning only |
| **Standard** | 8 | + Context management |

## 🔧 Commands Reference

### 🧠 Learning

| Command | Description |
|---------|-------------|
| `/generate-memories` | Create persistent memories from session patterns |
| `/generate-rules` | Auto-generate .mdc rules from codebase analysis |
| `/self-heal` | Fix a bug and find/fix similar antipatterns |
| `/self-improve` | Learn from user patterns, evolve behavior |

### 📊 Context Management

| Command | Description |
|---------|-------------|
| `/context-prune` | Summarize progress, prevent context drift |
| `/orchestrate` | Multi-agent coordination for complex tasks |
| `/ask-clarification` | Request missing information before proceeding |
| `/smart-detection` | Auto-detect changes and make smart decisions |

## 💡 Example Usage

### Generate Memories from Session

```
/generate-memories

════════════════════════════════════════════════════════════════
  MEMORY GENERATION
════════════════════════════════════════════════════════════════

📊 SESSION ANALYSIS

Patterns detected:
  1. Used useWatch 5 times (consistent)
  2. Applied AbortController pattern 3 times
  3. Skipped optional docs

📝 PROPOSED MEMORIES

1. [Preference] React Hook Form
   "Use useWatch hook instead of methods.watch()"
   Create? (y/n)
```

### Auto-Generate Rules

```
/generate-rules src/components

════════════════════════════════════════════════════════════════
  PATTERN ANALYSIS RESULTS
════════════════════════════════════════════════════════════════

## Detected Patterns (423 files analyzed)

✅ Styled component namespace: 98% use `* as S`
✅ Feature folder structure: 87% follow standard
⚠️ Barrel files: 23% still use index.ts

📁 Created: .cursor/rules/component-patterns.mdc
```

### Self-Healing Bug Fix

```
/self-heal "TypeError: Cannot read property 'data' of null"

Root Cause: Race condition - component unmounted before async resolved

✅ Fixed: useBookingData.ts:45
✅ Found 5 similar patterns
✅ Applied fix to all occurrences
✅ Added to .cursor/rules/web-standards.mdc
```

## 🛠️ CLI Commands

```bash
npx cursor-ai-toolkit              # Interactive install
npx cursor-ai-toolkit --bundle standard -y  # Non-interactive
npx cursor-ai-toolkit status       # Check installation
npx cursor-ai-toolkit list         # List all commands
npx cursor-ai-toolkit help         # Show help
```

## 📂 Installation Structure

After installation:

```
.cursor/
└── commands/
    ├── generate-memories.md
    ├── generate-rules.md
    ├── self-heal.md
    ├── self-improve.md
    ├── context-prune.md
    ├── orchestrate.md
    ├── ask-clarification.md
    └── smart-detection.md
```

## 🤝 Works With

- [Buddy OS](https://github.com/sharath317/buddy-os) - Role-aware autonomous agent
- [Cursor Full-Flow](https://github.com/sharath317/cursor-full-flow) - Jira to PR automation
- [Cursor Quality Suite](https://github.com/sharath317/cursor-quality-suite) - Testing & quality

## 📄 License

MIT © Sharath Chandra

---

**Make your AI smarter with every interaction.**
