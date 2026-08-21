---
name: mds-component-api-review
description: Review MDS React component APIs for consistency, accessibility, target-aware sizing, and release readiness.
---

# MDS Component API Review

Use this skill before changing exported components, adding new components, or preparing a release.

## Review Stance

Lead with concrete findings. Focus on public API shape, behavior, accessibility, and consistency across the MDS component set.

Avoid broad rewrites during review unless the user asks for fixes. When fixes are requested, keep them scoped to the reviewed contract.

## API Checklist

Check exported components for:

- consistent `className` and native prop passthrough
- useful ref support on leaf DOM components
- consistent naming for `size`, `variant`, `tone`, `disabled`, `invalid`, `loading`, and selection props
- controlled and uncontrolled state patterns where users would expect both
- event names that match React or local component conventions
- stable exports from `src/components/index.ts` and `src/index.ts`
- no accidental exposure of internal helper types

## Accessibility Checklist

Check for:

- keyboard support on interactive controls
- labels or accessible names for controls and icon-only buttons
- focus-visible styling through MDS focus tokens
- correct ARIA roles, states, and relationships
- disabled states that prevent interaction and communicate state
- overlay focus management through Radix primitives where applicable

## Target Checklist

Check that sizing and spacing derive from target-aware tokens:

- `sm`, `md`, and `lg` stay semantic within the active target
- controls use shared height, padding, font, gap, and icon tokens
- tables, lists, panels, toolbars, empty states, and feedback use target spacing tokens
- stories rely on the global `MDS Target` toolbar instead of duplicating target comparisons

## Storybook Checklist

For each changed component, check that stories cover meaningful states:

- default
- disabled
- invalid or error, when relevant
- loading or empty, when relevant
- selected, checked, active, or open, when relevant
- representative target behavior through the toolbar

## Output Format

For reviews, report findings first, ordered by severity, with file and line references.

Use:

```text
No blocking API issues found.
```

when the reviewed surface is clean. Then list residual risks or follow-up checks briefly.
