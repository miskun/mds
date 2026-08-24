import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, FileText, Folder, LayoutPanelTop, Settings } from "lucide-react";
import { Card, Grid, Panel, Stack, Text, TreeItem, TreeView } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Navigation/TreeView",
  component: TreeView,
  subcomponents: { TreeItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "TreeView presents nested navigation for files, documentation, settings, projects, and other hierarchical structures.",
      },
    },
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const DocumentationTree: Story = {
  parameters: storyDescription("Use branches for expandable hierarchy and leaf links for final destinations. Arrow keys move through visible tree items."),
  render: () => (
    <Grid minItemWidth="280px" style={{ maxWidth: 980 }}>
      <Panel padding="sm">
        <TreeView label="Documentation navigation">
          <TreeItem label="Getting started" level={1} icon={<Folder size={16} />} defaultExpanded>
            <TreeItem href="#" label="Introduction" level={2} icon={<FileText size={16} />} />
            <TreeItem href="#" label="Installation" level={2} icon={<FileText size={16} />} />
          </TreeItem>
          <TreeItem label="Foundations" level={1} icon={<Folder size={16} />} defaultExpanded>
            <TreeItem href="#" label="Targets" level={2} icon={<FileText size={16} />} />
            <TreeItem href="#" label="Tokens" level={2} icon={<FileText size={16} />} />
          </TreeItem>
          <TreeItem label="Components" level={1} icon={<Folder size={16} />} defaultExpanded>
            <TreeItem label="Navigation" level={2} icon={<Folder size={16} />} defaultExpanded>
              <TreeItem href="#" label="SideNav" level={3} icon={<LayoutPanelTop size={16} />} current />
              <TreeItem href="#" label="TreeView" level={3} icon={<Box size={16} />} />
            </TreeItem>
            <TreeItem href="#" label="Forms" level={2} icon={<FileText size={16} />} />
            <TreeItem href="#" label="Display" level={2} icon={<FileText size={16} />} />
          </TreeItem>
          <TreeItem href="#" label="Settings" level={1} icon={<Settings size={16} />} />
        </TreeView>
      </Panel>
      <Card title="Hierarchy behavior">
        <Stack gap="sm">
          <Text>
            Branch items expose expanded state, while leaf items use links and can mark the current page.
          </Text>
          <Text tone="muted">
            Row height, icon size, and nested indentation resolve through the selected target.
          </Text>
        </Stack>
      </Card>
    </Grid>
  ),
};

export const ProjectTree: Story = {
  parameters: storyDescription("TreeView can also model project or file hierarchies in desktop and admin tools."),
  render: () => (
    <Panel padding="sm" style={{ maxWidth: 420 }}>
      <TreeView label="Project files">
        <TreeItem label="src" level={1} icon={<Folder size={16} />} defaultExpanded>
          <TreeItem label="components" level={2} icon={<Folder size={16} />} defaultExpanded>
            <TreeItem href="#" label="SideNav.tsx" level={3} icon={<FileText size={16} />} current />
            <TreeItem href="#" label="TreeView.tsx" level={3} icon={<FileText size={16} />} />
          </TreeItem>
          <TreeItem href="#" label="styles" level={2} icon={<Folder size={16} />} />
        </TreeItem>
        <TreeItem href="#" label="package.json" level={1} icon={<FileText size={16} />} />
      </TreeView>
    </Panel>
  ),
};
