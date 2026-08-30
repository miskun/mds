# Miskun Design System

Black-first React components for focused product interfaces.

## Install

```sh
npm install @miskun/design-system react react-dom
```

React and React DOM are peer dependencies. For local sibling-project development, run `npm run build:lib` before testing consumers that read the package through `dist`.

## Run

```sh
npm run dev
npm run storybook
```

The local showcase is a Vite app. Storybook is the component workshop and should be the main place to design, test, and document MDS.

Storybook includes an `MDS Target` toolbar switcher for previewing components as desktop, mobile, web admin, or editorial interfaces. Use Storybook's viewport menu for screen size and the MDS Target menu for component ergonomics.

Component sizes such as `sm`, `md`, and `lg` are semantic within the selected target. A large desktop button is not the same physical size as a large editorial button; both mean "large for this product surface."

Reference `md` control heights are based on common platform conventions:

- `desktop`: 32px, pointer-first native desktop feel
- `mobile`: 48px, touch-first mobile target
- `admin`: 40px, web admin default with `sm` available for compact toolbars
- `editorial`: 48px, spacious marketing and publishing surfaces

Spacing follows the same target model through semantic aliases such as `--mds-stack-gap`, `--mds-inline-gap`, `--mds-field-gap`, `--mds-toolbar-gap`, `--mds-section-padding`, and `--mds-table-cell-padding-*`.

## Import

```tsx
import { Button, Card, Input } from "@miskun/design-system";
import "@miskun/design-system/styles.css";
```

The package builds library output during `prepare`, so unpublished git or `file:` installs have `dist` artifacts available after install.

## Foundations

- Typography: vendored Inter variable fonts with a system fallback stack
- Theme: near-black surfaces, crisp borders, bright signal accent
- Targets: desktop, mobile, admin, editorial
- Stories: getting started, foundations, components, patterns, content, utilities, and data visualization

See [DESIGN.md](./DESIGN.md) for the MDS hardware-inspired visual language: inherited surfaces, quiet matte-grain material, sharp-or-circular geometry, tact motion, and LED state indicators.

## Components

Current component groups:

- Controls: `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `SelectField`, `ComboBox`, `Checkbox`, `RadioGroup`, `Radio`, `Switch`
- Forms: `Field` plus layout, validation, helper text, grouped fields, and action rows composed from controls
- Patterns: composed workflows such as search and filter
- Navigation: `Breadcrumbs`, `BreadcrumbItem`, `Link`, `Tabs`, `Tab`, `SegmentedControl`, `Segment`, `Pagination`, `NavList`, `NavItem`, `SideNav`, `SideNavSection`, `SideNavItem`, `TreeView`, `TreeItem`
- Overlays: `Tooltip`, `Popover`, `DropdownMenu`, `MenuItem`, `MenuCheckboxItem`, `MenuSeparator`, `MenuLabel`, `MenuSub`, `Dialog`, `Drawer`
- Display: `Avatar`, `Badge`, `StatusDot`, `Tag`, `DescriptionList`, `DescriptionItem`, `MetricCard`, `ListItem`, `Text`, `Title`, `Code`, `Prose`, `Kbd`, `Divider`
- Feedback: `Alert`, `Toast`, `EmptyState`, `Progress`, `Spinner`, `Skeleton`
- Data: `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeader`, `TableCell`, `SortHeader`, `DataTable`, `TableToolbar`, `BulkActionBar`, `DetailPanel`, `ActivityFeed`, `ActivityItem`
- Layout and containers: `Stack`, `Cluster`, `Inline`, `Grid`, `PageHeader`, `Panel`, `Card`

Storybook follows the same organization. A dropdown is documented under Controls because it is a selection mechanism, even when it appears inside a form, toolbar, filter bar, dialog, canvas region, or raised panel. Forms document composition rather than ownership of those controls.

## Target

MDS uses target tokens so one component set can adapt to each product surface.

```tsx
import { MDSProvider, Button, Input } from "@miskun/design-system";

<MDSProvider target="admin">
  <Button>Save</Button>
  <Input label="Name" />
</MDSProvider>
```

Use `desktop` for native desktop apps, `mobile` for native mobile apps, `admin` for high-volume web portals, and `editorial` for marketing, portfolio, and publishing surfaces.

Viewport and target are separate concerns:

- Storybook viewport changes the canvas width and height.
- `MDSProvider` target changes component ergonomics, typography, spacing, and control scale.
- The Storybook `MDS Target` toolbar applies the same `data-mds-target` attribute that `MDSProvider` uses.

## Surfaces

MDS components inherit whether they sit directly on the black canvas or inside a raised panel surface. `MDSProvider` establishes the canvas surface, while `Panel` and `Card` establish panel surfaces for their descendants.

Controls can use that inherited surface context to adjust depth without adding per-component props. For example, `Switch` keeps its direct-canvas object treatment on the app canvas, but inside a panel its track reads as recessed and its thumb stays level with the panel plane.

Panel surfaces use a restrained matte-grain material treatment so controls can read like modern hardware without requiring product-specific artwork.

## Styles

Consumers should import the stable public entrypoint:

```tsx
import "@miskun/design-system/styles.css";
```

Source styles are split for maintainability:

- `src/styles/fonts.css`: bundled Inter `@font-face` declarations
- `src/styles/tokens.css`: base color, spacing, radius, and typography tokens
- `src/styles/target.css`: target-specific scale and spacing aliases
- `src/styles/base.css`: reset and document-level defaults
- `src/styles/utilities.css`: shared layout/text utility classes
- `src/styles/mds.css`: public source entrypoint that imports the files above
