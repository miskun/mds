---
name: mds-interaction-a11y-review
description: Review MDS interactive components for keyboard behavior, focus management, ARIA state, and disabled interaction handling.
---

# MDS Interaction Accessibility Review

Use this skill when changing MDS components that respond to keyboard, pointer, focus, selection, opening, closing, sorting, or disclosure.

## Scope

Review interaction behavior, not visual taste. Pair this with `skills/mds-component-api-review` when the public API also changes.

## Checklist

Check that interactive components:

- use native elements when possible
- have a clear accessible name
- expose correct ARIA roles, states, and relationships
- support expected keyboard keys for the pattern
- keep focus visible through MDS focus tokens
- move focus predictably after keyboard actions
- skip disabled items during keyboard movement
- prevent disabled items from changing state
- keep pointer and keyboard activation paths consistent
- support controlled and uncontrolled state where expected
- preserve user-provided event handlers

## Pattern Expectations

Tabs should support arrow navigation, `Home`, `End`, roving focus, `role="tablist"`, `role="tab"`, and `aria-selected`.

Segmented controls should support arrow navigation, `Home`, `End`, roving focus, and selected state through `aria-pressed`.

Tree views should expose `role="tree"`, `role="treeitem"`, `aria-level`, `aria-expanded` for branches, and support `ArrowUp`, `ArrowDown`, `ArrowRight`, `ArrowLeft`, `Home`, and `End` for visible tree items.

Menus, popovers, dialogs, drawers, and tooltips should use Radix primitives unless there is a strong reason not to.

For overlays:

- support controlled and uncontrolled open state when the overlay can be opened or closed
- keep trigger behavior consistent through `asChild`
- preserve Radix focus management instead of reimplementing it locally
- expose small styling hooks for content or overlay surfaces when consumers need layout integration
- keep native browser tooltip text disabled when rendering an MDS tooltip
- include Storybook examples for controlled open state and disabled triggers

Tables with sorting or selection should expose table context, sort state, selection state, loading or empty status, and clear accessible labels for header and row controls.

Form controls should connect labels and helper text with native labels, `aria-labelledby`, or `aria-describedby` as appropriate. Error props should set `aria-invalid`, and grouped controls should label the group rather than only the individual items.

Comboboxes should keep focus on the input, expose `aria-controls`, `aria-expanded`, and `aria-activedescendant`, support `ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter`, and `Escape`, skip disabled options during keyboard movement, and keep pointer selection consistent with keyboard selection.

For selectable tables:

- use an indeterminate select-all control when only some visible rows are selected
- expose selected row state with `aria-selected`
- prefer human row labels over internal IDs in checkbox and action labels
- keep select-all behavior scoped to the visible rows shown by the table

For sortable tables:

- label sort controls by the column name
- announce the next sort action, such as ascending, descending, or clearing sort

## Storybook

Stories for changed interactions should include:

- selected or active state
- disabled state
- controlled state when the component supports it
- open or expanded state when relevant
- enough items to test keyboard movement

## Verification

Run the relevant checks for the changed surface:

```sh
npm run typecheck
npm run build
npm run build-storybook
```

When practical, manually exercise keyboard behavior in Storybook before release.
