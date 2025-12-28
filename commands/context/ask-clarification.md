---
description: Guidelines for when to ask for clarification vs proceed with assumptions
category: Reference
aliases: [clarify, ask, question]
---

# Ask Clarification - Request Missing Information

Guidelines for when and how to ask for more information during workflows.

## When to Ask for Clarification

### 🔴 Must Ask (Blocking)

| Situation                    | Example Question                                                   |
| ---------------------------- | ------------------------------------------------------------------ |
| Acceptance criteria is vague | "AC says 'improve tooltip' - what specific improvement is needed?" |
| Multiple valid approaches    | "Should I use existing pattern A or pattern B for this?"           |
| Breaking change potential    | "This changes public API - is that acceptable?"                    |
| Missing design               | "No Figma link found - can you share the design?"                  |
| Conflicting requirements     | "AC #2 conflicts with AC #4 - which takes priority?"               |
| Security/data handling       | "This touches user data - any specific handling needed?"           |

### 🟡 Should Ask (Important)

| Situation                  | Example Question                                                         |
| -------------------------- | ------------------------------------------------------------------------ |
| Edge cases not specified   | "What should happen when display_name is empty string vs undefined?"     |
| Performance considerations | "This could impact bundle size - is that acceptable?"                    |
| Scope creep risk           | "Should I also update the related component, or create separate ticket?" |
| Test coverage unclear      | "Should I add unit tests, integration tests, or both?"                   |

### 🟢 Can Proceed (Minor)

| Situation                     | What I Do                            |
| ----------------------------- | ------------------------------------ |
| Styling details not specified | Follow design system defaults        |
| Naming conventions            | Follow existing patterns in codebase |
| File organization             | Follow project structure rules       |
| Error message wording         | Use existing patterns                |

## Clarification Request Format

```markdown
## ❓ Clarification Needed

Before proceeding, I need some information:

### 1. [Category]: [Question]

**Context:** [Why I'm asking]
**Options:**

-   A) [Option 1]
-   B) [Option 2]
    **My recommendation:** [If I have one]

### 2. [Category]: [Question]

...

---

Please provide answers, or say "proceed with recommendations" to use my suggested approach.
```

## Example Clarification Request

```markdown
## ❓ Clarification Needed

Before implementing TICKET-123, I need some information:

### 1. Edge Case Handling

**Context:** The AC says "use display_name when available"
**Question:** What should happen when display_name is an empty string ""?
**Options:**

-   A) Treat empty string as "not available", use original name
-   B) Show empty string (might look broken)
    **My recommendation:** Option A (treat empty as missing)

### 2. Scope Confirmation

**Context:** I found similar code in PackagesV2.tsx that could benefit from this change
**Question:** Should I update PackagesV2.tsx in this ticket, or create a follow-up?
**Options:**

-   A) Include in this ticket (more complete, slightly larger PR)
-   B) Separate ticket (smaller PR, but temporary inconsistency)
    **My recommendation:** Option A (avoid code duplication)

### 3. Test Coverage

**Context:** helpers.ts doesn't have existing tests
**Question:** Should I add unit tests for getModifiedLineItems?
**Options:**

-   A) Yes, add comprehensive tests
-   B) Skip tests (matches current state)
    **My recommendation:** Option A if time permits

---

Please provide answers, or say "proceed with recommendations".
```

## Information Sufficiency Checklist

Before implementation, verify:

### Requirements

-   [ ] Clear acceptance criteria (actionable, measurable)
-   [ ] Edge cases defined (or I can make reasonable assumptions)
-   [ ] Design available (Figma link or clear description)
-   [ ] Backend contract clear (API response structure)

### Technical

-   [ ] Know which files to modify
-   [ ] Found existing patterns to follow
-   [ ] Understand dependencies
-   [ ] No blocking conflicts with open PRs

### Scope

-   [ ] Clear boundaries (what's in/out of scope)
-   [ ] Estimate is reasonable
-   [ ] No hidden complexity discovered

## AI Execution

### At Start of /gather-context or /full-flow:

1. **Fetch all available information** (Jira, Figma, codebase)

2. **Run sufficiency check:**

    ```
    For each checklist item:
      - If info available → ✅
      - If info missing but can assume → ⚠️ (note assumption)
      - If info missing and blocking → ❓ (must ask)
    ```

3. **If any ❓ items exist:**

    - Generate clarification request
    - Wait for user response
    - Do NOT proceed until answered

4. **If only ⚠️ items:**

    - List assumptions being made
    - Ask: "Proceed with these assumptions? (y/n)"

5. **If all ✅:**
    - Proceed with implementation

### Example Flow:

```
📋 Gathering context for TICKET-123...

[... gather info ...]

════════════════════════════════════════════════════════════════
  INFORMATION CHECK
════════════════════════════════════════════════════════════════

✅ Requirements
  ✅ Acceptance criteria: Clear (3 items)
  ⚠️ Edge cases: Assuming empty string = missing
  ✅ Design: Found Figma link
  ✅ Backend: BE-789 defines display_name field

✅ Technical
  ✅ Files to modify: 4 identified
  ✅ Patterns found: getModifiedLineItems, TooltipTitle
  ✅ Dependencies: None blocking
  ✅ Conflicts: No open PRs in same files

✅ Scope
  ⚠️ Boundaries: PackagesV2 also needs update (including)
  ✅ Estimate: Small (2-3 hours)
  ✅ Complexity: Low

════════════════════════════════════════════════════════════════

⚠️ Proceeding with assumptions:
1. Empty string display_name treated as missing (fallback to name)
2. PackagesV2.tsx included in scope (avoid duplication)

Proceed with these assumptions? (y/n)
```

## Handling Responses

### User says "y" or "proceed":

→ Continue with stated assumptions

### User says "n":

→ Ask which assumption is wrong
→ Get correct approach
→ Update plan and re-confirm

### User provides additional context:

→ Incorporate into understanding
→ Update plan
→ Re-run sufficiency check
