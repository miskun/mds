import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeCheck, Bell, Boxes, FileText, Home, Search, Settings, User } from "lucide-react";
import { Badge, Card, Grid, Panel, SideNav, SideNavItem, SideNavSection, Stack, Text, Title } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Navigation/SideNav",
  component: SideNav,
  subcomponents: { SideNavSection, SideNavItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SideNav provides persistent structural navigation for apps, admin portals, settings areas, and documentation shells.",
      },
    },
  },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const AppSidebar: Story = {
  parameters: storyDescription("Use SideNav when navigation is a persistent region instead of a compact list inside content."),
  render: () => (
    <Grid minItemWidth="260px" style={{ maxWidth: 980 }}>
      <Panel padding="sm">
        <SideNav
          label="Project navigation"
          header={
            <Stack gap="xs">
              <Title level={2} size="compact">Miskun Studio</Title>
              <Text tone="soft" size="sm">Design system workspace</Text>
            </Stack>
          }
          footer={<SideNavItem href="#" icon={<User size={16} />}>Account</SideNavItem>}
        >
          <SideNavSection heading="Workspace">
            <SideNavItem href="#" current icon={<Home size={16} />}>Overview</SideNavItem>
            <SideNavItem href="#" icon={<Boxes size={16} />} trailing={<Badge tone="accent">12</Badge>}>
              Components
            </SideNavItem>
            <SideNavItem href="#" icon={<FileText size={16} />}>Documentation</SideNavItem>
          </SideNavSection>
          <SideNavSection heading="Operations">
            <SideNavItem href="#" icon={<Search size={16} />}>Search</SideNavItem>
            <SideNavItem href="#" icon={<Bell size={16} />} trailing="3">Notifications</SideNavItem>
            <SideNavItem href="#" icon={<Settings size={16} />}>Settings</SideNavItem>
          </SideNavSection>
        </SideNav>
      </Panel>
      <Card title="Current surface" eyebrow="Overview">
        <Stack gap="sm">
          <Text>
            SideNav uses target tokens for row height, icon size, indentation, and typography, so the same component fits desktop, mobile, admin, and editorial shells.
          </Text>
          <Text tone="muted">Current items use <code>aria-current="page"</code> for assistive technology.</Text>
        </Stack>
      </Card>
    </Grid>
  ),
};

export const SettingsNavigation: Story = {
  parameters: storyDescription("Section labels and trailing metadata help complex settings surfaces stay scannable."),
  render: () => (
    <Panel padding="sm" style={{ maxWidth: 360 }}>
      <SideNav label="Settings navigation">
        <SideNavSection heading="Settings">
          <SideNavItem href="#" current icon={<BadgeCheck size={16} />}>General</SideNavItem>
          <SideNavItem href="#" icon={<User size={16} />}>Members</SideNavItem>
          <SideNavItem href="#" icon={<Bell size={16} />} trailing="New">Notifications</SideNavItem>
          <SideNavItem href="#" icon={<Settings size={16} />}>Advanced</SideNavItem>
        </SideNavSection>
      </SideNav>
    </Panel>
  ),
};
