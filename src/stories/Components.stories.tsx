import type { Meta, StoryObj } from "@storybook/react-vite";
import { Download, Search } from "lucide-react";
import { Button, Card, Checkbox, IconButton, Input, Select, Switch } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Layout",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const TargetToolbar: Story = {
  parameters: storyDescription("Use the global MDS Target toolbar to preview the same composition across desktop, mobile, admin, and editorial targets."),
  render: () => (
    <Card eyebrow="Target" title="Toolbar-controlled component row">
      <div className="mds-cluster">
        <Input aria-label="Search components" placeholder="Find components" />
        <Button icon={<Download size={16} />}>Export</Button>
        <IconButton label="Search" icon={<Search size={16} />} />
        <Checkbox label="Selected" defaultChecked />
      </div>
    </Card>
  ),
};

export const Panel: Story = {
  parameters: storyDescription("Cards compose controls without changing their public API or target-aware sizing."),
  render: () => (
    <Card
      eyebrow="MDS"
      title="Component Panel"
      action={
        <Button size="sm" variant="secondary" icon={<Search size={14} />}>
          Search
        </Button>
      }
    >
      <div className="mds-stack">
        <Input label="Name" defaultValue="Miskun Design System" />
        <Select label="Target" defaultValue="admin">
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
          <option value="admin">Admin</option>
          <option value="editorial">Editorial</option>
        </Select>
        <Switch label="Published" hint="Visible in component documentation." defaultChecked />
      </div>
    </Card>
  ),
};
