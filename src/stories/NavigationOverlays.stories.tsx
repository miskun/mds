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
  Tooltip,
} from "../components";
import "../showcase.css";
import "./navigation-overlays.css";

const meta = {
  title: "MDS/Navigation + Overlays",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const FloatingLayer: Story = {
  render: () => (
    <div className="overlay-board">
      <Card eyebrow="Floating" title="Tooltip, Popover, Dropdown">
        <div className="mds-cluster">
          <Tooltip content="Tooltips explain compact controls.">
            <IconButton label="Notifications" icon={<Bell size={16} />} />
          </Tooltip>

          <Popover trigger={<Button variant="secondary">Filters</Button>} title="Filters">
            <div className="mds-stack">
              <Select label="Target" defaultValue="admin">
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="admin">Admin</option>
                <option value="editorial">Editorial</option>
              </Select>
              <Checkbox label="Only stable components" defaultChecked />
              <Button>Apply</Button>
            </div>
          </Popover>

          <DropdownMenu
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
        </div>
      </Card>
    </div>
  ),
};

export const Navigation: Story = {
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
  render: () => (
    <div className="mds-cluster">
      <Dialog
        trigger={<Button>Open dialog</Button>}
        title="Publish component"
        description="Confirm the component is documented and ready to use."
        footer={
          <>
            <Button variant="secondary">Cancel</Button>
            <Button>Publish</Button>
          </>
        }
      >
        <div className="mds-stack">
          <Input label="Component name" defaultValue="DropdownMenu" />
          <Checkbox label="Include in public docs" defaultChecked />
        </div>
      </Dialog>

      <Drawer
        trigger={
          <Button variant="secondary" icon={<PanelRight size={16} />}>
            Open drawer
          </Button>
        }
        title="Component settings"
        description="Drawers keep context visible while editing secondary details."
        footer={<Button>Save changes</Button>}
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

      <Tooltip content="More actions">
        <IconButton label="More actions" icon={<MoreHorizontal size={16} />} />
      </Tooltip>
    </div>
  ),
};
