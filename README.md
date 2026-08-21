# Miskun Design System

Black-first React components for focused creative tools.

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
- `admin`: 40px, web admin default with `sm` available for dense toolbars
- `editorial`: 48px, spacious marketing and publishing surfaces

Spacing follows the same target model through semantic aliases such as `--mds-stack-gap`, `--mds-inline-gap`, `--mds-field-gap`, `--mds-toolbar-gap`, `--mds-section-padding`, and `--mds-table-cell-padding-*`.

## Import

```tsx
import { Button, Card, Input } from "@miskun/design-system";
import "@miskun/design-system/styles.css";
```

## Foundations

- Typography: Inter-first CSS stack
- Theme: near-black surfaces, crisp borders, bright signal accent
- Targets: desktop, mobile, admin, editorial
- Components: Button, IconButton, Field, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Card, Badge, Tabs, Tooltip, Popover, DropdownMenu, Dialog, Drawer, Breadcrumbs, NavList, SegmentedControl, Alert, Toast, Progress, Spinner, Skeleton, EmptyState, StatusDot, Tag, Kbd, Divider, Table, DataTable, TableToolbar, Pagination, BulkActionBar, MetricCard, ActivityFeed, ListItem, DetailPanel
- Stories: foundation tokens and component variants

## Target

MDS uses target tokens so one component set can adapt to each product surface.

```tsx
import { MDSProvider, Button, Input } from "@miskun/design-system";

<MDSProvider target="admin">
  <Button>Save</Button>
  <Input label="Name" />
</MDSProvider>
```

Use `desktop` for native desktop apps, `mobile` for native mobile apps, `admin` for dense web portals, and `editorial` for marketing, portfolio, and publishing surfaces.

Viewport and target are separate concerns:

- Storybook viewport changes the canvas width and height.
- `MDSProvider` target changes component ergonomics, typography, spacing, and control scale.
- The Storybook `MDS Target` toolbar applies the same `data-mds-target` attribute that `MDSProvider` uses.

## Styles

Consumers should import the stable public entrypoint:

```tsx
import "@miskun/design-system/styles.css";
```

Source styles are split for maintainability:

- `src/styles/tokens.css`: base color, spacing, radius, and typography tokens
- `src/styles/target.css`: target-specific scale and spacing aliases
- `src/styles/base.css`: reset and document-level defaults
- `src/styles/utilities.css`: shared layout/text utility classes
- `src/styles/mds.css`: public source entrypoint that imports the files above
