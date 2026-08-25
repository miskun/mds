# Miskun Design System Agent Guide

MDS is a black-first React design system for four product targets: desktop, mobile, admin, and editorial.

## Core Model

Use `target` as the public concept.

- `desktop`: native desktop applications
- `mobile`: native mobile applications
- `admin`: web admin portals and data-heavy tools
- `editorial`: marketing sites, portfolios, and publishing surfaces

Targets control component scale, spacing rhythm, typography, hit areas, and interface ergonomics.

Use:

```tsx
<MDSProvider target="admin">
  <App />
</MDSProvider>
```

Never introduce alternative public concepts for this layer.

## Architecture

- Components live in `src/components`.
- Stories live in `src/stories`.
- Package entry is `src/index.ts`.
- Public CSS entry is `src/styles/mds.css`.
- Style sources are split into:
  - `src/styles/tokens.css`
  - `src/styles/target.css`
  - `src/styles/base.css`
  - `src/styles/utilities.css`

## Target-Aware Sizing

Every component must derive sizing-related decisions from the active MDS target and semantic size tokens.

Components should use target-aware tokens for:

- control height
- horizontal padding
- vertical padding
- internal gaps
- margins between related elements
- icon size
- typography size
- table/list row padding
- panel and surface padding
- empty/loading/feedback spacing

Do not hardcode component dimensions when a semantic token exists or should exist.

`sm`, `md`, and `lg` are semantic sizes within the active target. They should not represent fixed global dimensions.

Example:

```css
.mds-button--md {
  height: var(--mds-control-height-md);
  padding-inline: var(--mds-control-padding-x-md);
  font-size: var(--mds-control-font-size-md);
}
```

If a component needs a repeated size, spacing, or rhythm decision, add a semantic token to the target system instead of hardcoding it locally.

## Component Rules

- Export components from `src/components/index.ts`.
- Use target-aware CSS tokens for sizing, spacing, typography, and control dimensions.
- Keep `sm`, `md`, and `lg` semantic within the active target.
- Expose `className`, native prop passthrough, and useful refs on DOM-backed components.
- Compose consumer ARIA props with MDS-generated labels, descriptions, and state on the actual focusable control.
- Prefer Radix primitives for overlays, menus, dialogs, popovers, and focus-managed UI.
- Use lucide icons when an icon is needed.
- Keep components accessible by default: labels, focus states, ARIA roles, and keyboard behavior.

## Storybook Rules

- Add or update stories for every component change.
- Use the global `MDS Target` toolbar to test targets.
- Use Storybook viewport controls only for screen size.
- Do not create stories that compare all targets side-by-side unless the story is specifically documentation for target behavior.
- Include meaningful states where relevant: default, disabled, invalid, loading, empty, and selected.

## Verification

For inner-loop MDS work, use Storybook and targeted checks without rebuilding package output after every small change.

For commit-ready changes that may be consumed by a sibling project through the package entry, run:

```sh
npm run build:lib
```

This refreshes local `dist/` output without making every visual iteration heavier.

Run:

```sh
npm run typecheck
npm run build
npm run build-storybook
```

Package changes should preserve:

- `dist/index.js`
- `dist/index.cjs`
- `dist/styles.css`
- `dist/types/index.d.ts`

## Project Skills

Use `skills/mds-source-hygiene` before commits or source reviews that touch comments, docs, or written guidance.

Use `skills/mds-commit-hygiene` before creating git commits in this repository.

Use `skills/mds-component-api-review` before changing exported components, adding new components, or preparing releases.

Use `skills/mds-interaction-a11y-review` when changing keyboard, focus, selection, sorting, overlay, or disclosure behavior.

When a repeated review pattern emerges during MDS work, update the relevant project skill in the same change.
