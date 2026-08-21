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
- ref support on structural primitives that users compose, measure, scroll, or focus
- consistent naming for `size`, `variant`, `tone`, `disabled`, `invalid`, `loading`, and selection props
- consistent form props across text, choice, switch, and grouped controls: `label`, `hint`, `error`, `invalid`, and `required` where relevant
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
- API docs on the canonical `MDS/Components/...` story when exported props change

Keep Storybook organized by documentation intent:

- `MDS/Getting Started`: setup, provider, target model, first usage
- `MDS/Foundations`: tokens, typography, spacing, color, focus, target scale
- `MDS/Components`: component examples, usage guidance, and prop tables
- `MDS/Patterns`: repeated workflows that combine multiple components
- `MDS/Utilities`: small helpers and utility classes
- `MDS/Content`: interface copy guidance
- `MDS/Data Visualization`: charts, palettes, legends, and dashboard visualization guidance

Keep components grouped topically:

- `Actions`: buttons and action triggers
- `Forms`: fields, text inputs, selects, checkboxes, radios, and switches
- `Navigation`: tabs, segmented controls, breadcrumbs, and nav lists
- `Overlays`: tooltips, popovers, dropdown menus, dialogs, and drawers
- `Display`: badges, tags, status dots, keyboard hints, dividers, cards, and records
- `Feedback`: alerts, toasts, empty states, progress, spinners, and skeletons
- `Data`: tables, data tables, pagination, toolbars, metrics, bulk actions, and detail surfaces
- `Layout`: layout compositions and containers

For foundation docs:

- document token values with intended use, not only visual samples
- include target baseline values and explain how semantic sizes resolve by target
- keep token naming rules visible: base tokens, semantic aliases, component tokens, and state tokens
- prefer semantic target-aware aliases in component examples

For pattern docs:

- document workflows that combine components, not standalone primitive states
- include success, blocked, empty, loading, or recovery states when the workflow needs them
- show controlled state for selection, sorting, dialogs, drawers, or filters when relevant
- keep workflow copy action-oriented and reusable across product surfaces

For content docs:

- cover labels, actions, hints, errors, empty states, confirmations, and status text
- prefer specific product language over implementation language
- show both recommended and avoided wording when that makes the rule clearer
- keep examples aligned with component and pattern copy already used in Storybook

For data visualization docs:

- use uPlot as the intended low-level chart engine
- keep MDS responsible for React wrappers, target-aware layout, palettes, legends, states, and accessibility
- separate categorical series colors from semantic status colors
- document chart loading, empty, and error states before adding chart components
- pair charts with metrics, filters, tables, or export paths when exact values matter

For layout components:

- keep layout primitives under `MDS/Components/Layout`
- derive gaps from target-aware spacing tokens
- prefer semantic layout props over one-off local layout CSS
- keep primitives low on visual styling so composed components own surface, border, and copy treatment

For API docs:

- use `tags: ["autodocs"]` with the exported component as `component`
- include closely related primitives as `subcomponents`
- keep TypeScript prop comments short and product-neutral
- document defaults and native prop passthrough in story args or descriptions
- avoid separate API-only stories when the component examples can host the prop tables

## Output Format

For reviews, report findings first, ordered by severity, with file and line references.

Use:

```text
No blocking API issues found.
```

when the reviewed surface is clean. Then list residual risks or follow-up checks briefly.
