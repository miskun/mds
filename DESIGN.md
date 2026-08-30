# MDS Design Language

MDS is a black-first design system for interfaces that should feel like precise modern hardware: audio equipment, control surfaces, native tools, and focused product workstations.

The visual goal is not to recreate a specific device. It is to make digital controls feel like physical mechanisms mounted into dark instrument surfaces.

MDS should let ordinary software interfaces read as dedicated physical devices. Navigation can become mode keys, tables can become readouts, alerts can become annunciators, inputs can become recessed wells, and status can become LEDs. Do not add decorative hardware parts unless they clarify a real interaction or state.

## Surfaces

MDS components inherit their surface context.

- Canvas is the default black base surface.
- Panel is a raised surface established by `Panel` and `Card`.
- Components adapt to the inherited surface instead of exposing per-component surface props.

Panels should feel like black machined material. The surface texture should be quiet matte grain: low contrast, non-directional, and mostly visible through lighting and bevel, not through obvious stripes.

## Depth

Depth comes from edge treatment, not bright outlines.

- Use subtle bevels, 1px seating gaps, and restrained inset shadows.
- Avoid bright panel borders unless the component is explicitly a separator or focus treatment.
- Controls on panels should look embedded into the raised plane.
- Controls on canvas may read more like standalone objects on black.

## Geometry

Hardware geometry is decisive.

- Use sharp corners for square LEDs and tactile button caps.
- Use rounded corners for LCD/OLED-like display wells; they should feel like glass windows recessed into a panel rather than cut metal plates.
- Use fully circular shapes for knobs, radio buttons, LEDs, and round buttons.
- Avoid slight decorative rounding when a part should feel machined.

## Controls

Controls should describe a mechanism.

- Tact controls, such as checkbox and radio, sit level with the panel at rest.
- Tact controls press down only a tiny amount.
- Switches do not press down; they move sideways.
- Text inputs and select-like controls on panels should read as recessed wells.
- Text, search, select, combo, and textarea controls become LCD/OLED-like display wells only when they inherit a raised panel surface. Direct-canvas controls stay simpler and should not mimic embedded hardware.
- Display-well corner radius is target-aware: tighter for desktop/admin density, softer for editorial/mobile presentation.
- Display-well text may have a very subtle same-color glow; placeholders should remain muted and mostly unlit.

Motion must match the physical mechanism. Do not use a generic pressed effect across every interactive component.

## Component Organization

Organize components by what they are, not by one place they might appear.

- Controls are interactive primitives: buttons, inputs, dropdowns, checkboxes, radios, switches, and similar mechanisms.
- Forms are compositions of controls: field groups, validation sections, helper text, required state, and action layout.
- Patterns are reusable workflows assembled from primitives, such as search and filter.
- Surface context is independent of component category. A dropdown can live in a form, toolbar, dialog, canvas region, or raised panel.

Every control story should include a surface comparison when the component changes appearance between canvas and panel. The comparison should align the canvas example with the panel example using the same panel padding so visual differences come from inherited surface context rather than layout drift.

## LEDs

State indicators are LEDs, not icons.

- Radio uses a round LED.
- Checkbox uses a square LED.
- Switch uses the same round LED size as radio.
- Off state should still show an unilluminated lens.
- On state should emit light with a shared halo model.

Checked, selected, and active states should feel illuminated rather than merely colored.

## Application Patterns

General app primitives should map to physical roles.

- Navigation items are mode keys.
- Primary actions are command keys.
- Inputs, selects, and search fields become recessed control wells when mounted into panels.
- Metrics and important values are display windows.
- Alerts are annunciator strips.
- Status badges and dots are indicator lamps.
- Tables and lists are readouts inside display bays.
- Charts are screen scopes or instrument displays.

The test for a composed screen is: if this product had dedicated hardware, what physical part would each software primitive become?

## Targets

Target controls scale, spacing, hit area, typography, and ergonomics.

Keep target as the public concept. Do not add public visual modes for this layer. A component should use target tokens plus inherited surface context to reach the right physical feel.
