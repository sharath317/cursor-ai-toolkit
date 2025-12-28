---
description: Convert learned patterns into persistent Cursor memories
category: AI Self-Improvement
aliases: [memories, remember, learn-patterns]
---

# Generate Memories - Persistent Learning

Convert session learnings, user preferences, and established patterns into Cursor's memory system for cross-session persistence.

## Usage

```
/generate-memories                    # Review and generate from current session
/generate-memories --from-session     # Extract from this conversation
/generate-memories --from-rules       # Extract key rules as memories
/generate-memories --list             # Show existing memories
/generate-memories --prune            # Remove outdated memories
```

## What Gets Memorized

### User Preferences

```
"Always use useWatch instead of watch()"
"Prefer AbortController for async cleanup"
"Skip Confluence docs in full-flow"
"Use Tampa Airport for testing"
```

### Project Patterns

```
"This project uses styled-components with S.* namespace"
"Forms require OXForm wrapper"
"Design tokens from core-oxide are mandatory"
```

### Common Decisions

```
"Empty string from API = treat as missing"
"Use biggerThanSmall for mobile breakpoint"
"Keep originalName for modal title preservation"
```

### Team Conventions

```
"PR size should be < 15 files"
"Always add How to Test section"
"Commit messages without ticket prefixes"
```

## Memory Categories

| Category       | Examples                  | Persistence    |
| -------------- | ------------------------- | -------------- |
| **Preference** | "Always X over Y"         | Long-term      |
| **Pattern**    | "Use this approach for Z" | Long-term      |
| **Context**    | "Current project uses..." | Project-scoped |
| **Temporary**  | "Currently working on..." | Session-only   |

## Output Format

```
════════════════════════════════════════════════════════════════
  MEMORY GENERATION
════════════════════════════════════════════════════════════════

📊 SESSION ANALYSIS

Patterns detected in this session:
  1. Used useWatch 5 times (consistent)
  2. Applied AbortController pattern 3 times
  3. Skipped Confluence docs
  4. Used Tampa Airport for all test scenarios

Preferences expressed:
  1. "always use useWatch" (explicit)
  2. "keep it simple" (implied)
  3. "no ticket prefixes in commits" (correction)

Corrections made:
  1. Changed watch() → useWatch (I was wrong)
  2. Removed hardcoded px values (reminded)

════════════════════════════════════════════════════════════════
  PROPOSED MEMORIES
════════════════════════════════════════════════════════════════

📝 NEW MEMORIES TO CREATE

1. [Preference] React Hook Form
   "Use useWatch hook instead of methods.watch() to prevent
   unnecessary re-renders in form components."

   Create? (y/n)

2. [Pattern] Async Effect Cleanup
   "All useEffect hooks with async operations must use
   AbortController for cleanup and check signal.aborted
   before setState."

   Create? (y/n)

3. [Preference] Test Locations
   "Use Tampa Airport (TPA) as default location for testing
   car rental flows."

   Create? (y/n)

4. [Preference] Commit Messages
   "Keep commit messages natural and simple. No ticket
   prefixes (fix:, feat:), no Jira IDs, no PR references."

   Create? (y/n)

════════════════════════════════════════════════════════════════
  EXISTING MEMORIES TO UPDATE
════════════════════════════════════════════════════════════════

📝 MEMORY UPDATES

1. [Update] "Common review issues in YourCompany codebase"
   Current: Lists 5 issues
   Add: "Empty string from API should be treated as missing"

   Update? (y/n)

════════════════════════════════════════════════════════════════
  OUTDATED MEMORIES
════════════════════════════════════════════════════════════════

⚠️ POTENTIALLY OUTDATED

1. "Use Redux for global state"
   Last used: 6 months ago
   Conflict: Project now uses React Query

   Delete? (y/n)

════════════════════════════════════════════════════════════════
```

## Memory Format

Each memory should be:

```markdown
**Title:** {Short descriptive title}

**Content:** {One paragraph, max 200 words}

-   What the preference/pattern is
-   When to apply it
-   Brief rationale (optional)

**Scope:**

-   Global (all projects)
-   Project (this workspace)
-   Temporary (this session)
```

## AI Execution

When user runs `/generate-memories`:

### Step 1: Analyze Session

```
1. Review conversation history
2. Identify patterns (repeated actions)
3. Extract explicit preferences ("always...", "never...")
4. Note corrections (I was wrong about...)
```

### Step 2: Categorize

```
1. User Preferences (explicit requests)
2. Learned Patterns (consistent behavior)
3. Corrections (mistakes to avoid)
4. Context (project-specific)
```

### Step 3: Propose Memories

```
1. Draft memory for each finding
2. Check against existing memories
3. Identify updates vs new
4. Identify conflicts
```

### Step 4: User Approval

```
1. Present each memory
2. Get y/n approval
3. Create/update via update_memory tool
4. Confirm creation
```

## Integration with Self-Improve

```
┌─────────────────────────────────────────────────────────────┐
│  SELF-IMPROVEMENT LOOP                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Session Activity                                           │
│       ↓                                                     │
│  Pattern Detection (/self-improve)                          │
│       ↓                                                     │
│  Memory Generation (/generate-memories)                     │
│       ↓                                                     │
│  Cross-Session Persistence (Cursor Memories)                │
│       ↓                                                     │
│  Future Sessions (Auto-applied)                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Memory Lifecycle

### Creation

-   From explicit user request
-   From repeated patterns
-   From corrections

### Usage

-   Cited when applied: [[memory:ID]]
-   Guides behavior silently
-   Overridden by explicit user instruction

### Maintenance

-   Pruned if contradicted
-   Updated if augmented
-   Deleted if outdated

## Best Practices

1. **Quality over Quantity**
    - Only memorize genuinely useful patterns
    - Avoid obvious/trivial preferences
2. **Be Specific**

    - "Use useWatch for form fields" (good)
    - "Forms are important" (too vague)

3. **Include Rationale**

    - "Use X because Y" is better than just "Use X"

4. **Scope Appropriately**

    - Global: True for all projects
    - Project: Specific to this codebase
    - Session: Just for current task

5. **Review Periodically**
    - `/generate-memories --prune` monthly
    - Remove outdated patterns
    - Update evolved practices
