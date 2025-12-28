---
description: Analyze codebase patterns and auto-generate .mdc rules for enforcement
category: AI Self-Improvement
aliases: [gen-rules, create-rules, extract-patterns]
---

# Generate Rules - Auto-create .mdc Rules from Patterns

Analyze codebase patterns and generate specialized `.mdc` rule files for real-time enforcement.

## Usage

```
/generate-rules                     # Analyze entire codebase
/generate-rules {PATH}              # Analyze specific directory
/generate-rules --domain auth       # Focus on specific domain
```

## What This Does

1. **Analyzes codebase patterns** - Scans for conventions, antipatterns, and styles
2. **Extracts implicit rules** - Identifies what makes "good" code in your repo
3. **Generates .mdc files** - Creates Cursor rules for real-time enforcement
4. **Validates existing rules** - Checks if current rules match actual patterns

## Generated Rule Types

| Rule File                | Purpose             | Auto-detects              |
| ------------------------ | ------------------- | ------------------------- |
| `component-patterns.mdc` | Component structure | File organization, naming |
| `hook-patterns.mdc`      | Hook conventions    | Custom hook patterns      |
| `api-patterns.mdc`       | API client patterns | Error handling, types     |
| `testing-patterns.mdc`   | Test conventions    | AAA pattern, mocks        |
| `domain-{name}.mdc`      | Domain-specific     | Business logic patterns   |

## Analysis Process

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Pattern Extraction                                 │
├─────────────────────────────────────────────────────────────┤
│  • Scan files by type (.tsx, .ts, .styled.ts)               │
│  • Extract import patterns                                  │
│  • Identify naming conventions                              │
│  • Detect hook usage patterns                               │
│  • Find error handling patterns                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Frequency Analysis                                 │
├─────────────────────────────────────────────────────────────┤
│  • Count pattern occurrences                                │
│  • Identify dominant patterns (>70% usage)                  │
│  • Flag antipatterns (patterns in high-churn files)         │
│  • Correlate with git history (stable vs unstable)          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Rule Generation                                    │
├─────────────────────────────────────────────────────────────┤
│  • Create .mdc file with frontmatter                        │
│  • Define glob patterns for application                     │
│  • Write enforcement rules with examples                    │
│  • Add good/bad pattern comparisons                         │
└─────────────────────────────────────────────────────────────┘
```

## Example Output

```
📋 Analyzing codebase patterns...

════════════════════════════════════════════════════════════════
  PATTERN ANALYSIS RESULTS
════════════════════════════════════════════════════════════════

## Detected Patterns

### Component Patterns (423 files analyzed)
✅ Styled component namespace: 98% use `* as S`
✅ Feature folder structure: 87% follow standard
⚠️ Barrel files: 23% still use index.ts (antipattern)
✅ Type separation: 92% use .types.ts files

### Hook Patterns (918 hooks analyzed)
✅ AbortController cleanup: 76% compliance
⚠️ watch() usage: 12% still use (should be useWatch)
✅ Single responsibility: 89% focused hooks
⚠️ God hooks (>15 returns): 8% of hooks

### API Patterns (55 clients analyzed)
✅ ApiError type: 94% usage
✅ Generic response types: 91% typed
⚠️ Retry logic: Only 34% implement

## Generated Rules

📁 Created: .cursor/rules/component-patterns.mdc
   - Styled component namespace enforcement
   - Feature folder structure requirement
   - No barrel files in components

📁 Created: .cursor/rules/hook-patterns.mdc
   - AbortController requirement
   - useWatch over watch()
   - Single responsibility enforcement

📁 Created: .cursor/rules/api-patterns.mdc
   - ApiError typing requirement
   - Response type generics

════════════════════════════════════════════════════════════════
  3 rule files created in .cursor/rules/
════════════════════════════════════════════════════════════════
```

## Commands Used

```bash
# Find dominant patterns
grep -rh "import \* as S" --include="*.tsx" apps/ libraries/ | wc -l

# Find antipatterns
grep -rl "methods\.watch()" --include="*.tsx" apps/ | wc -l

# Check hook returns
grep -A 50 "^export const use" --include="*.ts" apps/*/src/hooks/ | \
  grep -c "return {"

# Correlate with churn
git log --oneline --after="2024-01-01" --name-only | \
  grep "\.tsx$" | sort | uniq -c | sort -rn | head -20
```

## Rule File Format

Generated `.mdc` files follow this structure:

```markdown
---
description: { Description }
globs: ['{glob patterns}']
alwaysApply: { true/false }
---

# {Rule Name}

## Enforced Patterns

### ✅ REQUIRED: {Pattern Name}

\`\`\`typescript
// Good example
\`\`\`

### ❌ FORBIDDEN: {Antipattern Name}

\`\`\`typescript
// Bad example - never generate
\`\`\`

## Rationale

{Why this pattern matters, backed by data}
```

## AI Execution

When user runs `/generate-rules`:

1. **Scan codebase** for file types and patterns
2. **Extract conventions** using regex and AST analysis
3. **Correlate with history** to identify stable vs unstable patterns
4. **Generate .mdc files** with proper frontmatter
5. **Report coverage** and any gaps detected
