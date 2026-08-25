import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Code, Grid, Stack, Text, Title } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Text",
  component: Text,
  subcomponents: { Title, Code },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Text primitives provide target-aware body copy, headings, and code treatment without relying on local typography styles.",
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const TypographyScale: Story = {
  parameters: storyDescription("Use Text for body, metadata, and supporting copy. Use Title for document and section headings."),
  render: () => (
    <Stack>
      <Title level={1} size="page">Design system typography</Title>
      <Text size="lg" tone="muted">
        Inter is the MDS typeface. Text primitives keep size, tone, and rhythm consistent across targets.
      </Text>
      <Grid minItemWidth="220px">
        <Card title="Body">
          <Stack gap="sm">
            <Text>Default body copy for product surfaces.</Text>
            <Text tone="muted">Muted supporting copy.</Text>
            <Text tone="soft" size="sm">Soft metadata and secondary labels.</Text>
            <Text tone="soft" size="xxs">Dense data qualifiers and table headers.</Text>
          </Stack>
        </Card>
        <Card title="Weight">
          <Stack gap="sm">
            <Text weight="regular">Regular text</Text>
            <Text weight="medium">Medium text</Text>
            <Text weight="strong">Strong text</Text>
          </Stack>
        </Card>
        <Card title="Tone">
          <Stack gap="sm">
            <Text tone="accent">Accent text</Text>
            <Text tone="success">Success text</Text>
            <Text tone="warning">Warning text</Text>
            <Text tone="danger">Danger text</Text>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  ),
};

export const Titles: Story = {
  parameters: storyDescription("Title separates semantic heading level from visual size."),
  render: () => (
    <Stack>
      <Title level={1} size="page">Page title</Title>
      <Title level={2} size="section">Section title</Title>
      <Title level={3} size="subsection">Subsection title</Title>
      <Title level={4} size="compact">Compact title</Title>
    </Stack>
  ),
};

export const CodeExamples: Story = {
  parameters: storyDescription("Use Code for package names, tokens, snippets, and compact technical values."),
  render: () => (
    <Stack style={{ maxWidth: 760 }}>
      <Text>
        Wrap package names like <Code>@miskun/design-system</Code> and token names like <Code>--mds-accent</Code>.
      </Text>
      <Code block>{`import { Button, Text, Title } from "@miskun/design-system";

export function Example() {
  return <Button>Continue</Button>;
}`}</Code>
    </Stack>
  ),
};
