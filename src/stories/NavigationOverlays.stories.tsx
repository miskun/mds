import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { Bell, Bolt, ChevronDown, FileText, MoreHorizontal, PanelRight } from "lucide-react";
import {
  Button,
  Card,
  Checkbox,
  ComboBox,
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
  Popover,
  SelectField,
  Tooltip,
} from "../components";
import "../showcase.css";
import "./navigation-overlays.css";

const meta = {
  title: "MDS/Components/Overlays/Overview",
  component: Popover,
  subcomponents: { DropdownMenu, Dialog, Drawer, Tooltip },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Overlay primitives expose controlled open state, trigger composition, focus management, and target-aware floating surfaces.",
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
                <ComboBox
                  label="Target"
                  defaultValue="admin"
                  options={[
                    { value: "desktop", label: "Desktop" },
                    { value: "mobile", label: "Mobile" },
                    { value: "admin", label: "Admin" },
                    { value: "editorial", label: "Editorial" },
                  ]}
                />
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

export const ModalSurfaces: Story = {
  parameters: storyDescription("Dialog and drawer examples show controlled open state, triggerless focus return, trigger composition, form content, and footer actions."),
  render: () => {
    const dialogButtonRef = useRef<HTMLButtonElement>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
      <div className="mds-cluster">
        <Button ref={dialogButtonRef} onClick={() => setDialogOpen(true)}>Open dialog</Button>
        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          returnFocusTo={dialogButtonRef}
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
            <ComboBox
              label="Target"
              defaultValue="admin"
              options={[
                { value: "desktop", label: "Desktop" },
                { value: "mobile", label: "Mobile" },
                { value: "admin", label: "Admin" },
                { value: "editorial", label: "Editorial" },
              ]}
            />
          </div>
        </Drawer>

        <Tooltip content="More actions" defaultOpen>
          <IconButton label="More actions" icon={<MoreHorizontal size={16} />} />
        </Tooltip>
      </div>
    );
  },
};

export const ScrollableDialog: Story = {
  parameters: storyDescription("Dialog bodies scroll when content is taller than the viewport while header, close, and footer actions remain reachable."),
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open long dialog</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Check long record"
          description="Review all fields before confirming the record."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Check it</Button>
            </>
          }
        >
          <div className="mds-stack">
            {Array.from({ length: 8 }, (_, index) => (
              <Input key={index} label={`Record field ${index + 1}`} defaultValue={`Value ${index + 1}`} />
            ))}
            <SelectField
              label="Review lane"
              placeholder="Choose lane"
              options={[
                { value: "triage", label: "Triage" },
                { value: "quality", label: "Quality" },
                { value: "release", label: "Release" },
              ]}
            />
            <ComboBox
              label="Assignee"
              placeholder="Search assignee"
              options={[
                { value: "miskun", label: "Miskun" },
                { value: "studio", label: "Studio" },
                { value: "ops", label: "Operations" },
              ]}
            />
            <Checkbox label="I verified the full record" />
          </div>
        </Dialog>
      </>
    );
  },
};
