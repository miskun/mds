import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, Home } from "lucide-react";
import { BreadcrumbItem, Breadcrumbs, Card, Stack, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  subcomponents: { BreadcrumbItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Breadcrumbs show location within a hierarchy and mark the current page with aria-current.",
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const PageTrail: Story = {
  parameters: storyDescription("Use breadcrumbs when users need to move up through a page hierarchy."),
  render: () => (
    <Stack style={{ maxWidth: 760 }}>
      <Breadcrumbs>
        <BreadcrumbItem href="#">
          <Home size={14} />
        </BreadcrumbItem>
        <BreadcrumbItem href="#">MDS</BreadcrumbItem>
        <BreadcrumbItem href="#">Components</BreadcrumbItem>
        <BreadcrumbItem current href="#">
          Forms
        </BreadcrumbItem>
      </Breadcrumbs>

      <Card title="Current page">
        <Text tone="muted" size="md">
          The final breadcrumb is still rendered as a link element for API consistency, but it is marked as the current page.
        </Text>
      </Card>
    </Stack>
  ),
};

export const DocumentTrail: Story = {
  parameters: storyDescription("Breadcrumbs can include compact icons when the icon has clear navigational meaning."),
  render: () => (
    <Breadcrumbs label="Document breadcrumbs">
      <BreadcrumbItem href="#">
        <Home size={14} />
      </BreadcrumbItem>
      <BreadcrumbItem href="#">
        <FileText size={14} /> Docs
      </BreadcrumbItem>
      <BreadcrumbItem current href="#">
        Release notes
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};
