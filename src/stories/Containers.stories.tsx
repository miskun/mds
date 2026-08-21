import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PanelRight } from "lucide-react";
import { Button, Card, Dialog, Drawer, Grid, Panel, Popover, Stack, StatusDot } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Containers/Overview",
  component: Panel,
  subcomponents: { Card, Popover, Dialog, Drawer },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Container components frame, disclose, or float related content. Layout primitives arrange content; containers create surfaces.",
      },
    },
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Surfaces: Story = {
  parameters: storyDescription("Panel is the low-level bounded surface. Card adds title, eyebrow, action, and body structure."),
  render: () => (
    <Grid minItemWidth="260px">
      <Panel>
        <Stack gap="sm">
          <strong>Panel</strong>
          <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
            Use for simple bounded content without a built-in header.
          </p>
          <StatusDot tone="success" label="Surface only" />
        </Stack>
      </Panel>
      <Panel variant="raised">
        <Stack gap="sm">
          <strong>Raised panel</strong>
          <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
            Use when a surface needs more separation from the page.
          </p>
        </Stack>
      </Panel>
      <Card eyebrow="Card" title="Structured surface">
        <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
          Use Card when the content has a clear title and optional action.
        </p>
      </Card>
    </Grid>
  ),
};

export const DisclosureSurfaces: Story = {
  parameters: storyDescription("Popover, Dialog, and Drawer are containers that disclose content through controlled or uncontrolled open state."),
  render: () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
      <Stack>
        <Panel>
          <Stack gap="sm">
            <strong>Disclosure containers</strong>
            <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
              Use popovers for compact contextual content, dialogs for blocking decisions, and drawers for secondary workflows.
            </p>
            <div className="mds-cluster">
              <Popover trigger={<Button variant="secondary">Open popover</Button>} title="Panel options">
                <Stack gap="sm">
                  <StatusDot tone="success" label="Autosaved" />
                  <Button size="sm">Apply</Button>
                </Stack>
              </Popover>

              <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                trigger={<Button>Open dialog</Button>}
                title="Publish changes"
                description="Confirm this surface is ready for public documentation."
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>Publish</Button>
                  </>
                }
              >
                <p>Published docs become part of the MDS component contract.</p>
              </Dialog>

              <Drawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                trigger={
                  <Button variant="secondary" icon={<PanelRight size={16} />}>
                    Open drawer
                  </Button>
                }
                title="Container settings"
                description="Drawers keep the current page visible while editing secondary details."
                footer={<Button onClick={() => setDrawerOpen(false)}>Save</Button>}
              >
                <Stack gap="sm">
                  <Panel variant="ghost" padding="sm">Ghost panel</Panel>
                  <Panel variant="raised" padding="sm">Raised panel</Panel>
                </Stack>
              </Drawer>
            </div>
          </Stack>
        </Panel>
      </Stack>
    );
  },
};
