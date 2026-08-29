import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Cluster, Divider, Kbd, Stack, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Utilities",
  component: Kbd,
  subcomponents: { Divider },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Display utilities provide small presentational affordances such as keyboard hints and separators.",
      },
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const KeyboardHints: Story = {
  parameters: storyDescription("Keyboard hints should appear near the command they describe and stay visually compact."),
  render: () => (
    <Card title="Command menu" style={{ maxWidth: 520 }}>
      <Cluster>
        <Text as="span" tone="muted" size="md">
          Open command menu
        </Text>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </Cluster>
    </Card>
  ),
};

export const Separators: Story = {
  parameters: storyDescription("Dividers separate related groups without introducing a new surface."),
  render: () => (
    <Card title="Separated groups" style={{ maxWidth: 520 }}>
      <Stack>
        <span>Primary content</span>
        <Divider />
        <span>Secondary content</span>
      </Stack>
    </Card>
  ),
};
