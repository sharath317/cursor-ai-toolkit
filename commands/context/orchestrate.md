---
description: Spawn specialized sub-agents for parallel task execution (multi-agent)
category: Workflow Orchestration
aliases: [multi-agent, spawn, coordinate]
---

# Orchestrate - Multi-Agent Coordination

Spawn specialized sub-agents for parallel task execution.

## Usage

```
/orchestrate {GOAL}
/orchestrate --ticket {TICKET_ID}
/orchestrate --pr {PR_NUMBER} --mode review
/orchestrate --feature "Add loyalty program"
```

## What This Does

1. **Parses goal** - Breaks down into specialized tasks
2. **Spawns agents** - Each agent handles specific domain
3. **Parallel execution** - Tasks run simultaneously
4. **Coordination** - Merges results, resolves conflicts
5. **Final synthesis** - Unified output

## Available Agents

| Agent                | Role               | Specialization                   |
| -------------------- | ------------------ | -------------------------------- |
| 🏗️ **Architect**     | System design      | Validates patterns, dependencies |
| 🔒 **Security**      | Vulnerability scan | Secrets, SAST, dependencies      |
| 📝 **Documentation** | Docs update        | README, Confluence, JSDoc        |
| 🧪 **Testing**       | Test generation    | Unit, integration, E2E           |
| 🎨 **Styling**       | Design compliance  | Token usage, responsive          |
| 📊 **Analytics**     | Tracking           | Events, metrics, logging         |
| ⚡ **Performance**   | Optimization       | Bundle, runtime, memory          |

## Orchestration Flow

```
┌─────────────────────────────────────────────────────────────┐
│  /orchestrate "Implement TICKET-123"                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  GOAL DECOMPOSITION                                         │
├─────────────────────────────────────────────────────────────┤
│  1. Understand requirements (Architect)                     │
│  2. Implement feature (Main Agent)                          │
│  3. Check security (Security Agent)                         │
│  4. Generate tests (Testing Agent)                          │
│  5. Update docs (Documentation Agent)                       │
│  6. Verify styling (Styling Agent)                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PARALLEL EXECUTION                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ Security │  │ Testing  │  │   Docs   │                   │
│  │  Agent   │  │  Agent   │  │  Agent   │                   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                   │
│       │             │             │                         │
│  ┌────▼─────────────▼─────────────▼────┐                    │
│  │         COORDINATION LAYER          │                    │
│  └─────────────────────────────────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  SYNTHESIS & OUTPUT                                         │
├─────────────────────────────────────────────────────────────┤
│  • Merge all agent outputs                                  │
│  • Resolve any conflicts                                    │
│  • Generate unified report                                  │
│  • Apply all changes atomically                             │
└─────────────────────────────────────────────────────────────┘
```

## Output Format

````
📋 Orchestrating: Implement TICKET-123...

════════════════════════════════════════════════════════════════
  GOAL DECOMPOSITION
════════════════════════════════════════════════════════════════

Feature: Marketing texts for protection packages
Ticket: TICKET-123
Complexity: Medium

Tasks identified:
1. [MAIN] Implement display_name support in LineItems
2. [SECURITY] Validate input sanitization for marketing texts
3. [TESTING] Generate tests for new display logic
4. [DOCS] Update component documentation
5. [STYLING] Verify TooltipTitle spacing

════════════════════════════════════════════════════════════════
  AGENT EXECUTION
════════════════════════════════════════════════════════════════

## 🏗️ Architect Agent

Status: ✅ Complete

Analysis:
- Pattern: Consistent with existing tooltip implementation
- Dependencies: No new external dependencies
- Breaking changes: None
- Recommendation: ✅ Proceed with implementation

## 🔒 Security Agent

Status: ✅ Complete

Scanned:
- [ ] Hardcoded secrets: None found
- [ ] XSS vectors: `display_name` passed through OXRichTextBlock (sanitized) ✅
- [ ] Injection risks: None detected
- [ ] Dependency vulnerabilities: None new

Result: ✅ No security issues

## 🧪 Testing Agent

Status: ✅ Complete

Generated:
```typescript
// LineItems.test.tsx
describe('LineItems', () => {
    it('should render display_name when available', () => { ... });
    it('should fallback to name when display_name missing', () => { ... });
    it('should show title only on desktop', () => { ... });
});
````

Files created:

-   LineItems.test.tsx (3 test cases)
-   helpers.test.ts (5 test cases)

## 📝 Documentation Agent

Status: ✅ Complete

Updated:

-   [ ] Component JSDoc comments
-   [ ] Type definitions (ILineItemInfo.originalName)
-   [ ] README section on marketing texts

Confluence page created:

-   "Protection Package Display Names" (875167748)

## 🎨 Styling Agent

Status: ✅ Complete

Verified:

-   [ ] TooltipTitle uses spacing('xs') ✅
-   [ ] Responsive breakpoint (useOXBreakpoint) ✅
-   [ ] No hardcoded values ✅
-   [ ] Design token compliance ✅

════════════════════════════════════════════════════════════════
SYNTHESIS
════════════════════════════════════════════════════════════════

## Changes Summary

| Agent   | Files Modified | Files Created  |
| ------- | -------------- | -------------- |
| Main    | 5              | 0              |
| Testing | 0              | 2              |
| Docs    | 1              | 1 (Confluence) |

## Conflict Resolution

No conflicts detected between agents.

## Final Checklist

✅ Implementation complete
✅ Security verified
✅ Tests generated
✅ Documentation updated
✅ Styling validated
✅ All agents agree

════════════════════════════════════════════════════════════════
NEXT STEPS
════════════════════════════════════════════════════════════════

Ready to:

1. Create PR with all changes
2. Run full test suite
3. Request review

Run: /jira-pr TICKET-123 to create PR

````

## Agent Configurations

### Architect Agent
```yaml
focus:
  - System design patterns
  - Dependency analysis
  - Breaking change detection
  - Architecture compliance
tools:
  - Dependency graph analysis
  - Pattern matching
  - CODEOWNERS lookup
````

### Security Agent

```yaml
focus:
    - Secret scanning
    - XSS/injection detection
    - Dependency CVEs
    - Auth/authz checks
tools:
    - gitleaks (secrets)
    - semgrep (SAST)
    - npm audit (deps)
```

### Testing Agent

```yaml
focus:
    - Unit test generation
    - Integration tests
    - Edge case coverage
    - Mock generation
tools:
    - /risk-test-gen
    - /mutation-audit
    - Jest templates
```

### Documentation Agent

```yaml
focus:
    - JSDoc updates
    - README maintenance
    - Confluence sync
    - Type documentation
tools:
    - /jira-docs
    - JSDoc generator
    - Confluence API
```

## AI Execution

When user runs `/orchestrate {GOAL}`:

1. **Parse goal** - Break into domain-specific tasks
2. **Assign agents** - Map tasks to specialized agents
3. **Execute parallel** - Run agents simultaneously
4. **Collect results** - Gather outputs from each agent
5. **Resolve conflicts** - Handle overlapping changes
6. **Synthesize** - Merge into unified output
7. **Report** - Summary of all agent actions
