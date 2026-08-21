import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FileText, Settings } from "lucide-react";
import { NavItem, NavList, Segment, SegmentedControl, Tab, Tabs } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/API/Navigation",
  component: Tabs,
  subcomponents: { Tab, SegmentedControl, Segment, NavList, NavItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navigation primitives expose controlled state where selection matters and use keyboard behavior that matches the component pattern.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Accessible label for the tab list.",
    },
    value: {
      control: "text",
      description: "Controlled selected tab value.",
    },
    defaultValue: {
      control: "text",
      description: "Initial selected tab value for uncontrolled tabs.",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsProps: Story = {
  args: {
    label: "Sections",
    defaultValue: "overview",
    children: (
      <>
        <Tab value="overview">Overview</Tab>
        <Tab value="components">Components</Tab>
        <Tab value="tokens">Tokens</Tab>
      </>
    ),
  },
};

export const ControlledNavigation: Story = {
  render: () => {
    const [target, setTarget] = useState("admin");
    const [section, setSection] = useState("overview");

    return (
      <div className="mds-stack" style={{ maxWidth: 640 }}>
        <Tabs value={section} onValueChange={setSection}>
          <Tab value="overview">Overview</Tab>
          <Tab value="components">Components</Tab>
          <Tab value="tokens">Tokens</Tab>
          <Tab value="changelog" disabled>
            Changelog
          </Tab>
        </Tabs>
        <SegmentedControl label="Target" value={target} onValueChange={setTarget}>
          <Segment value="admin">Admin</Segment>
          <Segment value="desktop">Desktop</Segment>
          <Segment value="mobile">Mobile</Segment>
          <Segment value="editorial">Editorial</Segment>
        </SegmentedControl>
        <NavList>
          <NavItem href="#" active icon={<FileText size={16} />}>
            Components
          </NavItem>
          <NavItem href="#" icon={<Settings size={16} />}>
            Settings
          </NavItem>
        </NavList>
      </div>
    );
  },
};
