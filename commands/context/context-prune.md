---
description: Summarize session progress, clean context, prevent AI drift in long chats
category: Context & Analysis
aliases: [prune, summarize, cleanup]
---

# Context Prune - Manage Context Window & Prevent Drift

Clean chat history and summarize progress to maintain AI performance.

## Usage

```
/context-prune
/context-prune --summarize              # Save progress summary
/context-prune --fresh                  # Start clean with context
/context-prune --checkpoint {NAME}      # Named checkpoint
```

## Why This Matters

In 2025, **context window management is the #1 performance bottleneck**:

-   Long conversations cause "context drift"
-   AI forgets earlier decisions
-   Response quality degrades over time
-   Hallucinations increase

## What This Does

1. **Analyzes current context** - Measures token usage, key decisions
2. **Creates checkpoint** - Saves essential state
3. **Prunes irrelevant** - Removes debug output, repeated content
4. **Generates summary** - Compressed handoff for fresh session
5. **Restores critical** - Ensures key context is preserved

## Context Health Indicators

| Indicator          | Healthy | Warning   | Critical  |
| ------------------ | ------- | --------- | --------- |
| Token usage        | < 50%   | 50-80%    | > 80%     |
| Conversation turns | < 20    | 20-40     | > 40      |
| Files discussed    | < 15    | 15-30     | > 30      |
| Decisions made     | Tracked | Some lost | Forgotten |

## Output Format

````
📋 Context Analysis...

════════════════════════════════════════════════════════════════
  CONTEXT HEALTH
════════════════════════════════════════════════════════════════

## Current State

| Metric | Value | Status |
|--------|-------|--------|
| Estimated tokens | 45,000 | 🟡 56% used |
| Conversation turns | 28 | 🟡 Warning |
| Files discussed | 12 | ✅ Healthy |
| Tools invoked | 67 | Normal |

## Drift Detection

⚠️ Potential drift detected:
- Turn 5: Decided to use `useWatch` over `watch()`
- Turn 23: Used `watch()` (inconsistent)

⚠️ Forgotten context:
- Original goal: "Implement TICKET-123"
- Current focus: Debugging unrelated styling

════════════════════════════════════════════════════════════════
  CHECKPOINT CREATED
════════════════════════════════════════════════════════════════

## Session Summary (for handoff)

### Original Goal
Implement marketing texts for protection packages (TICKET-123)

### Key Decisions Made
1. Use `display_name` from backend with Statsig fallback
2. Prevent duplicate titles using `useOXBreakpoint`
3. Keep `originalName` for modal title preservation

### Files Modified
- LineItems.tsx - Added conditional TooltipTitle
- ProtectionPackageCard.styled.ts - Added TooltipTitle component
- helpers.ts - Updated getModifiedLineItems logic
- PackagesV2.tsx - Removed duplicate function

### Current State
- [x] Implementation complete
- [x] Tests passing
- [ ] PR not created
- [ ] How to Test not added

### Next Steps
1. Create PR with `/jira-pr TICKET-123`
2. Add How to Test with `/jira-test TICKET-123`

### Context to Preserve
```typescript
// Key pattern established
const { biggerThanSmall } = useOXBreakpoint();
{biggerThanSmall && originalName && <TooltipTitle ... />}
````

════════════════════════════════════════════════════════════════
RECOMMENDATIONS
════════════════════════════════════════════════════════════════

Option A: Continue in current session

-   Risk: Moderate context drift
-   Token headroom: 44% remaining

Option B: Start fresh session (Recommended)

-   Copy the summary above
-   Paste at start of new conversation
-   Full context restoration guaranteed

Checkpoint saved as: `TICKET-123-checkpoint-2024-12-23`

````

## Checkpoint File Format

When `--checkpoint` is used, creates:

```markdown
# Context Checkpoint: {NAME}

**Created:** {timestamp}
**Session ID:** {id}
**Tokens used:** {count}

## Goal
{original goal}

## Decisions
{numbered list}

## State
{current progress}

## Files
{list of modified files}

## Resume Instructions
Paste this into a new chat to continue:

---
{compressed context for handoff}
---
````

## Auto-Prune Triggers

Consider running `/context-prune` when:

-   Conversation exceeds 30 turns
-   AI starts repeating itself
-   AI forgets earlier decisions
-   Response quality noticeably drops
-   Switching to a different task

## Context Preservation Strategies

### Essential (Always Preserve)

-   Original goal/ticket
-   Key architectural decisions
-   File paths modified
-   Patterns established

### Prunable (Safe to Drop)

-   Debug output
-   Error messages (once resolved)
-   Exploratory searches
-   Redundant explanations

### Compressible

-   Long code blocks → File references
-   Repeated patterns → Single example
-   Discussion → Decision summary

## AI Execution

When user runs `/context-prune`:

1. **Analyze context** - Token count, turn count, drift indicators
2. **Identify decisions** - Extract key choices made
3. **Summarize state** - Current progress and next steps
4. **Create checkpoint** - Portable summary for handoff
5. **Recommend action** - Continue or fresh session
