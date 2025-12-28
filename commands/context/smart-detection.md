---
description: Auto-detect AC changes, multiple PRs needed, optimal workflow decisions
category: AI Self-Improvement
aliases: [detect, auto-detect]
---

# Smart Detection - Intelligent Workflow Decisions

Automatic detection of changes, multiple PRs, and smart decision-making.

## 1. AC Change Detection

When acceptance criteria changes, I detect and update affected steps.

### How It Works

```bash
# Compare current AC with what was used for implementation
1. Fetch current Jira AC
2. Compare with AC stored when implementation started
3. Identify what changed
4. Determine affected steps
5. Suggest updates
```

### Detection Output

```
════════════════════════════════════════════════════════════════
  ⚠️ ACCEPTANCE CRITERIA CHANGED
════════════════════════════════════════════════════════════════

Original AC (when branch created):
  ✅ Display name shown when available
  ✅ Tooltip shows original name as title
  ✅ Fallback to original name when missing

Current AC (just fetched):
  ✅ Display name shown when available
  ✅ Tooltip shows original name as title
  ✅ Fallback to original name when missing
  🆕 Display name should be bold (NEW)
  🆕 Add analytics tracking for display name views (NEW)

════════════════════════════════════════════════════════════════
  AFFECTED STEPS
════════════════════════════════════════════════════════════════

The following need updates:

1. 📝 Implementation
   - Add bold styling to display name
   - Add analytics tracking

2. 📋 How to Test (already posted)
   - Needs update to include new AC items

3. 🔍 Self-Review
   - Re-run with new criteria

Actions:
  A) Update implementation + How to Test
  B) Update How to Test only (implementation pending)
  C) Ignore (AC change not relevant)

Choose: (a/b/c)
```

### Auto-Update How to Test

```bash
# When AC changes, I can auto-update the Jira comment
jira issue comment add {TICKET_ID} '**How to Test (Updated):**

[Previous steps remain valid]

**New Items:**
5. **Verify Bold Styling:**
   - Display name should appear in bold

6. **Verify Analytics:**
   - Open browser dev tools → Network tab
   - Confirm tracking event fires on display name view

---
_Updated due to AC changes on {DATE}_'
```

## 2. Multiple PRs Intelligence

When multiple PRs are attached to a ticket, I determine the main one.

### Detection Logic

```
Priority order for "main PR":
1. PR with most recent activity
2. PR with most files changed
3. PR created by you
4. PR with "main" or "primary" in title
5. PR with most review comments (indicates active review)
```

### Detection Output

```
════════════════════════════════════════════════════════════════
  🔗 MULTIPLE PRs DETECTED FOR TICKET-123
════════════════════════════════════════════════════════════════

Found 3 PRs linked to this ticket:

| PR | Title | Author | Status | Files | Activity |
|----|-------|--------|--------|-------|----------|
| #23043 | [TICKET-123] Display name support | you | Draft | 6 | 2h ago |
| #23010 | [TICKET-123] Backend integration | backend-dev | Merged | 3 | 3d ago |
| #22980 | [TICKET-123] Initial prototype | you | Closed | 2 | 1w ago |

════════════════════════════════════════════════════════════════
  ANALYSIS
════════════════════════════════════════════════════════════════

🎯 Main PR: #23043 (Display name support)
   Reason: Most recent activity, authored by you, draft status

📦 Backend PR: #23010 (already merged)
   Context: Backend changes are complete, frontend depends on this

🗑️ Obsolete: #22980 (closed prototype)
   Can be ignored

Working with PR #23043. Correct? (y/n)
```

### Smart Context Gathering

When multiple PRs exist, I gather context from all:

```
From merged PR #23010 (backend):
- New field: display_name added to API response
- Optional field, may be null

From closed PR #22980 (prototype):
- Initial approach: inline styling
- Rejected because: didn't follow component patterns

Applied to current PR #23043:
- Use display_name from backend (#23010)
- Follow component patterns (learned from #22980)
```

## 3. PR Size Alerts

When a PR becomes too large, I suggest splitting.

### Thresholds

| Metric         | Warning  | Critical |
| -------------- | -------- | -------- |
| Lines changed  | > 200    | > 400    |
| Files changed  | > 8      | > 15     |
| Review time    | > 20 min | > 45 min |
| Teams affected | > 2      | > 3      |

### Alert Output

```
════════════════════════════════════════════════════════════════
  ⚠️ PR SIZE ALERT
════════════════════════════════════════════════════════════════

PR #23043 is getting large:

  📊 Lines: 380 (Warning: > 200)
  📁 Files: 12 (Critical: > 8)
  👥 Teams: 3 (@YourOrg/team-a, @YourOrg/team-b, @YourCompany/core-oxide)
  ⏱️ Est. Review: ~35 minutes

════════════════════════════════════════════════════════════════
  RECOMMENDATIONS
════════════════════════════════════════════════════════════════

1. 🔀 Split by CODEOWNERS (recommended)
   Run: /split-pr 23043

2. 📦 Split by feature
   - PR-A: Display name support (core)
   - PR-B: Tooltip updates (UI)
   - PR-C: Analytics (tracking)

3. 📝 Keep as-is with detailed description
   Add clear sections explaining each change

Choose: (1/2/3) or ignore
```

## 4. Process Change Detection

When team processes change, I adapt.

### What I Monitor

-   PR template changes
-   CODEOWNERS updates
-   New lint rules
-   Testing requirements
-   Documentation requirements

### Adaptation Output

```
════════════════════════════════════════════════════════════════
  🔄 PROCESS CHANGE DETECTED
════════════════════════════════════════════════════════════════

I noticed changes in your project:

1. **CODEOWNERS Updated**
   - src/features/checkout/ now owned by @YourOrg/team-a-v2
   - Will use new team for reviews

2. **New Lint Rule Added**
   - useRef must have explicit type
   - Will check in self-review

3. **PR Template Updated**
   - Now requires "Breaking Changes" section
   - Will include in PR creation

Updating my workflow to reflect these changes.
```

## 5. Dependency Intelligence

Detect when changes depend on other work.

```
════════════════════════════════════════════════════════════════
  🔗 DEPENDENCIES DETECTED
════════════════════════════════════════════════════════════════

Your changes depend on:

1. **Backend PR (BE-789)**
   Status: ✅ Merged to staging
   → Safe to proceed

2. **Shared Types (@yourcompany-web/types)**
   Status: ⚠️ PR #22900 pending
   → May need to wait or use type override

3. **Feature Flag (statsig)**
   Status: ✅ Enabled for internal
   → Can test on internal-com.yourcompany.io

Recommendations:
- Proceed with implementation
- Test on staging (backend ready)
- Note type dependency in PR description
```

## AI Execution

These detections run automatically during `/full-flow`:

1. **Before implementation**: Check AC for changes
2. **During PR creation**: Detect size issues
3. **When fetching ticket**: Identify multiple PRs
4. **Throughout**: Monitor process changes

I'll alert you when action is needed, otherwise proceed silently.
