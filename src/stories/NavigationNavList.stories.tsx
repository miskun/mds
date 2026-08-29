import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FileText, LayoutDashboard, Settings, User } from "lucide-react";
import { Card, Grid, NavItem, NavList, Panel, Stack, StatusDot, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Navigation/Nav list",
  component: NavList,
  subcomponents: { NavItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Nav list presents compact vertical navigation for sidebars, settings areas, and product sections.",
      },
    },
  },
} satisfies Meta<typeof NavList>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const SidebarNavigation: Story = {
  parameters: storyDescription("Use active state to mark the current page and icons only when they improve scanning."),
  render: () => (
    <Grid minItemWidth="240px" style={{ maxWidth: 920 }}>
      <Panel padding="sm">
        <NavList label="Workspace navigation">
          <NavItem href="#" active icon={<LayoutDashboard size={16} />}>
            Overview
          </NavItem>
          <NavItem href="#" icon={<FileText size={16} />}>
            Components
          </NavItem>
          <NavItem href="#" icon={<Settings size={16} />}>
            Tokens
          </NavItem>
          <NavItem href="#" icon={<User size={16} />}>
            Team
          </NavItem>
        </NavList>
      </Panel>
      <Card title="Overview">
        <Stack gap="sm">
          <StatusDot tone="success" label="Current page" />
          <Text tone="muted" size="md">
            The active item receives aria-current so assistive technology can identify the current location.
          </Text>
        </Stack>
      </Card>
    </Grid>
  ),
};

export const StateNavigation: Story = {
  parameters: storyDescription("Render nav items as buttons when the selected view is controlled by local state."),
  render: () => {
    const [view, setView] = useState("overview");

    return (
      <Grid minItemWidth="240px" style={{ maxWidth: 820 }}>
        <Panel padding="sm">
          <NavList label="State navigation">
            <NavItem as="button" active={view === "overview"} icon={<LayoutDashboard size={16} />} onClick={() => setView("overview")}>
              Overview
            </NavItem>
            <NavItem as="button" active={view === "components"} icon={<FileText size={16} />} onClick={() => setView("components")}>
              Components
            </NavItem>
            <NavItem as="button" active={view === "settings"} icon={<Settings size={16} />} onClick={() => setView("settings")}>
              Settings
            </NavItem>
          </NavList>
        </Panel>
        <Card title="Selected view">
          <Text tone="muted" size="md">
            {view}
          </Text>
        </Card>
      </Grid>
    );
  },
};
