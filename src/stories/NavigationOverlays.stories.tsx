import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Bell, Bolt, ChevronDown, FileText, Home, LayoutDashboard, MoreHorizontal, PanelRight, Settings, User } from "lucide-react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Dialog,
  Drawer,
  DropdownMenu,
  IconButton,
  Input,
  MenuCheckboxItem,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuSub,
  NavItem,
  NavList,
  Popover,
  Segment,
  SegmentedControl,
  Select,
  Tab,
  Tabs,
  Tooltip,
} from "../components";
import "../showcase.css";
import "./navigation-overlays.css";

const meta = {
  title: "MDS/Components/Navigation + Overlays",
  component: SegmentedControl,
  subcomponents: { Segment, Tabs, Tab, NavList, NavItem, Breadcrumbs, BreadcrumbItem, Popover, DropdownMenu, Dialog, Drawer, Tooltip },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navigation and overlay primitives expose controlled state where selection or open state matters and use keyboard behavior that matches the component pattern.",
      },
    },
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

export const FloatingLayer: Story = {
  parameters: storyDescription("Floating layers use controlled open state examples, disabled trigger coverage, and the MDS target scale from the toolbar."),
  render: () => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <div className="overlay-board">
        <Card eyebrow="Floating" title="Tooltip, Popover, Dropdown">
          <div className="mds-cluster">
            <Tooltip content="Tooltips explain compact controls." delayDuration={120}>
              <IconButton label="Notifications" icon={<Bell size={16} />} />
            </Tooltip>

            <Popover
              trigger={<Button variant="secondary">Filters</Button>}
              title="Filters"
              open={popoverOpen}
              onOpenChange={setPopoverOpen}
            >
              <div className="mds-stack">
                <Select label="Target" defaultValue="admin">
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                  <option value="admin">Admin</option>
                  <option value="editorial">Editorial</option>
                </Select>
                <Checkbox label="Only stable components" defaultChecked />
                <Button onClick={() => setPopoverOpen(false)}>Apply</Button>
              </div>
            </Popover>

            <DropdownMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <Button variant="secondary" icon={<ChevronDown size={16} />}>
                  Actions
                </Button>
              }
            >
              <MenuLabel>Component</MenuLabel>
              <MenuItem icon={<FileText size={14} />}>Open story</MenuItem>
              <MenuItem icon={<Bolt size={14} />}>Generate variant</MenuItem>
              <MenuSub trigger="Export">
                <MenuItem inset>React</MenuItem>
                <MenuItem inset>CSS</MenuItem>
              </MenuSub>
              <MenuSeparator />
              <MenuCheckboxItem checked>Show deprecated</MenuCheckboxItem>
            </DropdownMenu>

            <Popover trigger={<Button variant="secondary" disabled>Disabled trigger</Button>} title="Unavailable">
              Disabled trigger content
            </Popover>
          </div>
        </Card>
      </div>
    );
  },
};

export const Navigation: Story = {
  parameters: storyDescription("Navigation primitives cover breadcrumbs, nav lists, segmented controls, active state, disabled state, and keyboard-focused search."),
  render: () => {
    const [target, setTarget] = useState("admin");

    return (
      <div className="nav-layout">
        <aside className="nav-layout__sidebar">
          <NavList>
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

export const ModalSurfaces: Story = {
  parameters: storyDescription("Dialog and drawer examples show controlled open state, trigger composition, form content, and footer actions."),
  render: () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
      <div className="mds-cluster">
        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          trigger={<Button>Open dialog</Button>}
          title="Publish component"
          description="Confirm the component is documented and ready to use."
          footer={
            <>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Publish</Button>
            </>
          }
        >
          <div className="mds-stack">
            <Input label="Component name" defaultValue="DropdownMenu" />
            <Checkbox label="Include in public docs" defaultChecked />
          </div>
        </Dialog>

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          trigger={
            <Button variant="secondary" icon={<PanelRight size={16} />}>
              Open drawer
            </Button>
          }
          title="Component settings"
          description="Drawers keep context visible while editing secondary details."
          footer={<Button onClick={() => setDrawerOpen(false)}>Save changes</Button>}
        >
          <div className="mds-stack">
            <Input label="Owner" defaultValue="Miskun" />
            <Select label="Target" defaultValue="admin">
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="admin">Admin</option>
              <option value="editorial">Editorial</option>
            </Select>
          </div>
        </Drawer>

        <Tooltip content="More actions" defaultOpen>
          <IconButton label="More actions" icon={<MoreHorizontal size={16} />} />
        </Tooltip>
      </div>
    );
  },
};
