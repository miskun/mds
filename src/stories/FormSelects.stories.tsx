import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ComboBox, Grid, Select, SelectField, Stack, Text } from "../components";
import "../showcase.css";

const componentOptions = [
  { value: "button", label: "Button", description: "Primary action trigger", group: "Actions" },
  { value: "split-button", label: "Split button", description: "Action with secondary choices", group: "Actions" },
  { value: "input", label: "Input", description: "Single-line text field", group: "Forms" },
  { value: "combo-box", label: "Combo box", description: "Searchable selection control", group: "Forms" },
  { value: "data-table", label: "Data table", description: "Sortable record table", group: "Data" },
  { value: "tree-view", label: "Tree view", description: "Nested hierarchy navigation", group: "Navigation" },
  { value: "deprecated-menu", label: "Deprecated menu", description: "Unavailable for new work", group: "Navigation", disabled: true },
];

const meta = {
  title: "MDS/Components/Forms/Selects",
  component: ComboBox,
  subcomponents: { SelectField, Select },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Selects cover MDS-rendered dropdowns, searchable selection workflows, and native browser selects with target-aware triggers, menu rows, validation, and helper text.",
      },
    },
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const NativeSelect: Story = {
  parameters: storyDescription("Use native Select for short, stable option lists where browser and platform behavior is preferred."),
  render: () => (
    <Grid minItemWidth="260px" style={{ maxWidth: 760 }}>
      <Select label="Default target" hint="Native select keeps platform semantics." defaultValue="admin">
        <option value="desktop">Desktop</option>
        <option value="mobile">Mobile</option>
        <option value="admin">Admin portal</option>
        <option value="editorial">Editorial</option>
      </Select>
      <Select label="Release channel" error="Choose a release channel before publishing." defaultValue="">
        <option value="" disabled>
          Select channel
        </option>
        <option value="alpha">Alpha</option>
        <option value="beta">Beta</option>
        <option value="stable">Stable</option>
      </Select>
    </Grid>
  ),
};

export const RegularSelect: Story = {
  parameters: storyDescription("Use SelectField for short MDS-rendered option lists that do not need search."),
  render: () => (
    <Grid minItemWidth="260px" style={{ maxWidth: 760 }}>
      <SelectField
        label="Default target"
        defaultValue="admin"
        options={[
          { value: "desktop", label: "Desktop" },
          { value: "mobile", label: "Mobile" },
          { value: "admin", label: "Admin portal" },
          { value: "editorial", label: "Editorial" },
        ]}
      />
      <SelectField
        label="Release channel"
        error="Choose a release channel before publishing."
        placeholder="Select channel"
        options={[
          { value: "alpha", label: "Alpha" },
          { value: "beta", label: "Beta" },
          { value: "stable", label: "Stable" },
        ]}
      />
    </Grid>
  ),
};

export const SearchableSingleSelect: Story = {
  parameters: storyDescription("Use ComboBox when option discovery, grouping, descriptions, disabled states, keyboard selection, or filtering matter."),
  render: () => (
    <ComboBox
      label="Primary component"
      hint="Type to filter across groups and descriptions."
      options={componentOptions}
      defaultValue="combo-box"
      style={{ maxWidth: 440 }}
    />
  ),
};

export const MultiSelect: Story = {
  parameters: storyDescription("Multi-select renders selected options as removable tags and keeps the list open for repeated choices."),
  render: () => {
    const [value, setValue] = useState<string[]>(["button", "combo-box"]);

    return (
      <Stack style={{ maxWidth: 520 }}>
        <ComboBox
          multiple
          label="Included components"
          hint="Selected values remain visible above the search field."
          options={componentOptions}
          value={value}
          onValueChange={(nextValue) => setValue(Array.isArray(nextValue) ? nextValue : [nextValue])}
        />
        <Text tone="soft" size="sm">Selected: {value.join(", ")}</Text>
      </Stack>
    );
  },
};

export const States: Story = {
  parameters: storyDescription("SelectField covers regular dropdown validation and disabled states. ComboBox adds loading, empty, filtering, and disabled options."),
  render: () => (
    <Grid minItemWidth="280px" style={{ maxWidth: 920 }}>
      <SelectField label="Required component" error="Choose at least one component." placeholder="Choose component" options={componentOptions} clearable />
      <ComboBox label="Loading" hint="Use while remote options are resolving." options={[]} loading />
      <ComboBox label="No matches" options={componentOptions} placeholder="Type zzz" emptyMessage="No matching components" />
      <SelectField
        label="Deprecated package"
        hint="Disabled fields keep their message relationship."
        options={componentOptions}
        defaultValue="deprecated-menu"
        disabled
      />
    </Grid>
  ),
};
