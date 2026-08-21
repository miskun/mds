import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FileText, Home, LayoutDashboard, Settings, User } from "lucide-react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Input,
  NavItem,
  NavList,
  Segment,
  SegmentedControl,
  SideNav,
  SideNavItem,
  SideNavSection,
  Tab,
  Tabs,
} from "../components";
import "../showcase.css";
import "./navigation-overlays.css";

const meta = {
  title: "MDS/Components/Navigation/Overview",
  component: Tabs,
  subcomponents: { Tab, SegmentedControl, Segment, SideNav, SideNavSection, SideNavItem, NavList, NavItem, Breadcrumbs, BreadcrumbItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navigation primitives cover wayfinding, selected state, keyboard movement, and compact product navigation surfaces.",
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const NavigationPrimitives: Story = {
  parameters: storyDescription("Breadcrumbs, nav lists, tabs, and segmented controls share target-aware spacing and keyboard behavior."),
  render: () => {
    const [target, setTarget] = useState("admin");

    return (
      <div className="nav-layout">
        <aside className="nav-layout__sidebar">
          <SideNav>
            <SideNavSection>
              <SideNavItem href="#" current icon={<LayoutDashboard size={16} />}>
                Overview
              </SideNavItem>
              <SideNavItem href="#" icon={<FileText size={16} />}>
                Components
              </SideNavItem>
              <SideNavItem href="#" icon={<Settings size={16} />}>
                Tokens
              </SideNavItem>
              <SideNavItem href="#" icon={<User size={16} />}>
                Team
              </SideNavItem>
            </SideNavSection>
          </SideNav>
        </aside>
        <section className="nav-layout__main">
          <Breadcrumbs>
            <BreadcrumbItem href="#">
              <Home size={14} />
            </BreadcrumbItem>
            <BreadcrumbItem href="#">MDS</BreadcrumbItem>
            <BreadcrumbItem current href="#">
              Components
            </BreadcrumbItem>
          </Breadcrumbs>
          <div className="mds-cluster">
            <Tabs label="Sections" defaultValue="overview">
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
              <Segment value="editorial" disabled>
                Editorial
              </Segment>
            </SegmentedControl>
            <Input aria-label="Search" placeholder={`Search ${target}`} />
          </div>
        </section>
      </div>
    );
  },
};
