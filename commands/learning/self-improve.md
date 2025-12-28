---
description: Learn from user patterns, suggest command improvements, evolve automation
category: AI Self-Improvement
aliases: [improve, evolve, learn]
---

# Self-Improve - Learn and Evolve Commands

Automatically learn from user patterns, suggest improvements, and evolve commands.

## How Self-Learning Works

### 1. Pattern Recognition

I observe and learn from:

| What I Observe              | What I Learn                      |
| --------------------------- | --------------------------------- |
| Commands you run frequently | Create shortcuts or combine steps |
| Steps you always skip       | Add to auto-skip list             |
| Clarifications you give     | Update defaults and assumptions   |
| Corrections you make        | Update rules and patterns         |
| Preferences you express     | Store in memory                   |

### 2. Trigger Phrases

When you say:

-   "always do X" → I create a memory and update commands
-   "never do Y" → I add to skip list
-   "remember that..." → I store as preference
-   "this is wrong because..." → I learn the correction
-   "better way is..." → I update the approach

### 3. Auto-Suggestions

After each workflow, I may suggest:

```
════════════════════════════════════════════════════════════════
  💡 IMPROVEMENT SUGGESTIONS
════════════════════════════════════════════════════════════════

Based on this session, I noticed:

1. **Frequent Pattern**: You always add "How to Test" after PR creation
   → Suggestion: Make this automatic (no confirmation)
   → Accept? (y/n)

2. **Repeated Clarification**: You always want empty string = missing
   → Suggestion: Add as default assumption
   → Accept? (y/n)

3. **Skipped Step**: You skipped Confluence docs in last 5 runs
   → Suggestion: Remove from default flow, make on-demand
   → Accept? (y/n)

4. **New Pattern Detected**: You often run /pr-review after /full-flow
   → Suggestion: Create /full-flow-with-review command
   → Accept? (y/n)
════════════════════════════════════════════════════════════════
```

## Memory Updates

When I learn something, I update my memory:

```bash
# Example: User says "always skip Confluence docs"
# I will:
1. Create memory: "Skip Confluence docs in default full-flow"
2. Update full-flow.md behavior
3. Confirm: "Got it! Confluence docs now on-demand only."
```

## Command Evolution

### How Commands Self-Evolve

1. **Usage Tracking** (mental model):

    - Which commands run most
    - Which steps get skipped
    - Which clarifications repeat

2. **Feedback Loop**:

    ```
    User runs command
         ↓
    I observe outcome
         ↓
    Note any corrections/preferences
         ↓
    Suggest improvements
         ↓
    User accepts/rejects
         ↓
    Update command behavior
    ```

3. **Periodic Review**:

    ```
    Every few sessions, I'll ask:

    "I've noticed some patterns in how you work.
    Would you like me to suggest optimizations to the workflow?"
    ```

## Evolution Examples

### Example 1: Learned Skip

```
Before: Always ask "Add How to Test? (y/n)"
Observed: User says "y" 100% of time
After: Auto-add, just confirm "✅ How to Test added"
```

### Example 2: Learned Default

```
Before: Ask "Empty string = missing or show empty?"
Observed: User always picks "missing"
After: Default to "missing", mention assumption
```

### Example 3: New Shortcut

```
Observed: User often runs /jira-fetch then /jira-branch
Created: /jira-start (combines both)
```

### Example 4: Critical Focus

```
Observed: User says "skip minor issues" frequently
Updated: /pr-review now defaults to critical-only mode
```

## Suggesting New Commands

When I notice a gap, I'll propose:

```
💡 COMMAND SUGGESTION

I noticed you often:
1. Fetch ticket
2. Check if branch exists
3. Create branch if not
4. Start implementation

This could be a single command: /jira-quick-start

Would you like me to create it? (y/n)
```

## Updating Existing Commands

When I learn a better approach:

```
💡 COMMAND UPDATE SUGGESTION

Current: /pr-review posts all issues as comments
Learned: You prefer critical issues only, minor as summary

Proposed change to /pr-review:
- Default: Post only critical/high-impact issues
- Summary: Mention minor issues in summary comment
- Flag: --all to include everything

Apply this update? (y/n)
```

## What I Track (Mentally)

| Category        | Examples                                 |
| --------------- | ---------------------------------------- |
| **Preferences** | Skip confirmations, auto-add docs        |
| **Defaults**    | Empty string handling, test coverage     |
| **Patterns**    | Command sequences, common clarifications |
| **Corrections** | Wrong assumptions I made                 |
| **Skips**       | Steps user never wants                   |

## AI Execution

### During Every Command Run:

1. **Observe**: What did user do differently than expected?
2. **Note**: Any corrections, skips, or preferences expressed?
3. **Learn**: Update mental model
4. **Suggest**: If pattern is strong, propose improvement

### After Multiple Runs:

```
I've worked with you on 5 tickets this week. I noticed:

1. You always use Tampa Airport for testing
   → Should I default to Tampa in test instructions?

2. You prefer smaller PRs (< 200 lines)
   → Should I warn when PR exceeds this?

3. You always add @team-lead as reviewer
   → Should I auto-add as default reviewer?

Update preferences? (y/n for each)
```

## Manual Triggers

```bash
# Ask for suggestions
/self-improve suggest

# Show what I've learned
/self-improve show-learnings

# Reset a specific learning
/self-improve reset "skip confluence"

# Force update a command
/self-improve update pr-review "focus on critical only"
```
