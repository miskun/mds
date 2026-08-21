import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, LayoutDashboard, Settings, User } from "lucide-react";
import { Card, Grid, NavItem, NavList, Panel, Stack, StatusDot } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Navigation/NavList",
  component: NavList,
  subcomponents: { NavItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "NavList presents compact vertical navigation for sidebars, settings areas, and product sections.",
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
          <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
            The active item receives aria-current so assistive technology can identify the current location.
          </p>
        </Stack>
      </Card>
    </Grid>
  ),
};
