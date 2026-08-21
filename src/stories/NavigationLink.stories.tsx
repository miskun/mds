import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, EmptyState, Link, Stack, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Navigation/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Links navigate to another location or resource. Use buttons for actions that change state in the current surface.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "accent"],
      description: "Visual treatment for the link.",
    },
    external: {
      control: "boolean",
      description: "Marks the link as leaving the current product surface.",
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const Playground: Story = {
  args: {
    href: "#",
    children: "Read documentation",
    variant: "default",
  },
};

export const Variants: Story = {
  parameters: storyDescription("Link variants keep navigation visible on black surfaces without using button styling."),
  render: () => (
    <Stack>
      <Link href="#">Default link</Link>
      <Link href="#" variant="subtle">Subtle link</Link>
      <Link href="#" variant="accent">Accent link</Link>
      <Link href="https://github.com/miskun/mds" external>
        GitHub repository
      </Link>
    </Stack>
  ),
};

export const InlineCopy: Story = {
  parameters: storyDescription("Inline links should sit naturally inside explanatory copy and keep the sentence readable."),
  render: () => (
    <Card title="Install MDS" style={{ maxWidth: 680 }}>
      <Text tone="muted">
        Read the <Link href="#" variant="accent">getting started guide</Link> before configuring targets in Storybook.
      </Text>
    </Card>
  ),
};

export const RecoveryCopy: Story = {
  parameters: storyDescription("Use links for navigation to help or docs. Keep recovery actions as buttons."),
  render: () => (
    <EmptyState
      title="No components found"
      description="Clear filters or review the component taxonomy."
      action={
        <Stack gap="sm" align="center">
          <Button>Clear filters</Button>
          <Link href="#" variant="subtle">Open taxonomy</Link>
        </Stack>
      }
    />
  ),
};
