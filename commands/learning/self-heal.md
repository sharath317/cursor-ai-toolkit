---
description: Fix a bug and proactively find/fix similar antipatterns across the codebase
category: AI Self-Improvement
aliases: [heal, fix-pattern, fix-all]
---

# Self-Heal - Proactive Pattern Fixing

Fix a bug and proactively find/fix similar patterns across the codebase.

## Usage

```
/self-heal {ERROR_LOG}
/self-heal {FILE:LINE} "Description of issue"
/self-heal --pattern "watch()" --fix "useWatch()"
/self-heal --sentry {ISSUE_ID}
```

## What This Does

1. **Analyzes error** - Understands root cause
2. **Fixes immediate issue** - Applies fix to reported location
3. **Finds similar patterns** - Searches codebase for same antipattern
4. **Proactively fixes** - Applies fix to all occurrences
5. **Prevents future** - Adds to .mdc rules if pattern is common

## Self-Healing Process

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Analyze Error                                      │
├─────────────────────────────────────────────────────────────┤
│  • Parse error message and stack trace                      │
│  • Identify root cause pattern                              │
│  • Classify error type                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Fix Immediate Issue                                │
├─────────────────────────────────────────────────────────────┤
│  • Apply targeted fix                                       │
│  • Verify fix compiles                                      │
│  • Run related tests                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Find Similar Patterns                              │
├─────────────────────────────────────────────────────────────┤
│  • Search codebase for same pattern                         │
│  • Filter by risk (same conditions apply)                   │
│  • Rank by likelihood of failure                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Proactive Healing                                  │
├─────────────────────────────────────────────────────────────┤
│  • Apply same fix to all occurrences                        │
│  • Create separate PR or same PR                            │
│  • Document in commit message                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: Prevent Recurrence                                 │
├─────────────────────────────────────────────────────────────┤
│  • Add pattern to .cursor/rules/ if common                  │
│  • Create ESLint rule if applicable                         │
│  • Update /code-standards                                   │
└─────────────────────────────────────────────────────────────┘
```

## Example: Race Condition Fix

````
/self-heal "TypeError: Cannot read property 'data' of null"

────────────────────────────────────────────────────────────────
  ERROR ANALYSIS
────────────────────────────────────────────────────────────────

Error: TypeError: Cannot read property 'data' of null
File: src/features/checkout/src/hooks/useBookingData.ts:45
Stack: useBookingData → useEffect → fetchData → setData

Root Cause: Race condition - component unmounted before async resolved

Pattern Detected:
```typescript
// ❌ Antipattern: No cleanup, state update on unmounted component
useEffect(() => {
    fetchData().then(result => {
        setData(result.data);  // May run after unmount
    });
}, [id]);
````

────────────────────────────────────────────────────────────────
IMMEDIATE FIX
────────────────────────────────────────────────────────────────

Applied to: useBookingData.ts:45

```typescript
// ✅ Fixed: AbortController prevents race condition
useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
        try {
            const result = await api.getData(id, { signal: controller.signal });
            setData(result.data);
        } catch (err) {
            if (!controller.signal.aborted) {
                setError(err as ApiError);
            }
        }
    };

    fetchData();
    return () => controller.abort();
}, [id]);
```

────────────────────────────────────────────────────────────────
SIMILAR PATTERNS FOUND
────────────────────────────────────────────────────────────────

Searching for: `useEffect.*fetchData.*then.*set[A-Z]` without AbortController

| File                 | Line | Risk      | Status          |
| -------------------- | ---- | --------- | --------------- |
| useOfferData.ts      | 23   | 🔴 HIGH   | Same pattern    |
| useUserProfile.ts    | 56   | 🔴 HIGH   | Same pattern    |
| usePaymentMethods.ts | 34   | 🔴 HIGH   | Same pattern    |
| useBranches.ts       | 89   | 🟠 MEDIUM | Similar pattern |
| useVehicles.ts       | 12   | 🟠 MEDIUM | Similar pattern |

Total: 5 files with same antipattern

────────────────────────────────────────────────────────────────
PROACTIVE HEALING
────────────────────────────────────────────────────────────────

Applying fix to 5 additional files...

✅ useOfferData.ts:23 - Fixed
✅ useUserProfile.ts:56 - Fixed
✅ usePaymentMethods.ts:34 - Fixed
✅ useBranches.ts:89 - Fixed
✅ useVehicles.ts:12 - Fixed

All files compile successfully.

────────────────────────────────────────────────────────────────
PREVENTION
────────────────────────────────────────────────────────────────

## Rule Added to .cursor/rules/web-standards.mdc

```markdown
### ✅ REQUIRED: AbortController for async useEffect

All useEffect hooks with async operations MUST include:

1. AbortController setup
2. Signal passed to fetch/API calls
3. Cleanup function returning controller.abort()
4. Aborted check before setState
```

## ESLint Rule Suggestion

Consider adding `eslint-plugin-react-hooks` rule:
`exhaustive-deps` with custom cleanup checker

────────────────────────────────────────────────────────────────
SUMMARY
────────────────────────────────────────────────────────────────

| Action         | Count        |
| -------------- | ------------ |
| Files fixed    | 6            |
| Bugs prevented | ~5 potential |
| Rule added     | 1            |

Commit message:
"Fix race condition in async useEffect across 6 hooks

Applied AbortController pattern to prevent state updates
on unmounted components. Fixes TypeError in useBookingData
and proactively prevents same issue in 5 other hooks."

````

## Pattern Library

| Pattern | Search Regex | Fix Template |
|---------|--------------|--------------|
| Race condition | `useEffect.*then.*set[A-Z]` | AbortController |
| watch() usage | `methods\.watch\(\)` | useWatch |
| Missing memoization | `yup\.object\(` not in useMemo | useMemo wrapper |
| Any type | `: any` | Specific type |
| Console.log | `console\.log` | Remove or debug util |
| Hardcoded pixels | `[0-9]+px` in styled | spacing() token |

## Commands Used

```bash
# Find similar patterns
grep -rn "useEffect.*then.*setState" --include="*.ts" apps/ libraries/

# Check which files lack AbortController
for f in $(grep -rl "useEffect.*fetch" --include="*.ts" apps/); do
    if ! grep -q "AbortController" "$f"; then
        echo "$f"
    fi
done

# Verify fixes compile
pnpm compile
````

## AI Execution

When user runs `/self-heal {ERROR}`:

1. **Parse error** - Extract file, line, message
2. **Identify pattern** - Match to known antipatterns
3. **Apply fix** - To immediate location
4. **Search codebase** - Find similar patterns
5. **Batch fix** - Apply to all occurrences
6. **Update rules** - Add to .mdc if common
7. **Report** - Summary of all changes
