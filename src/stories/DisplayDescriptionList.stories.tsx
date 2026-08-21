import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, DescriptionItem, DescriptionList, DetailPanel, Grid, Stack, StatusDot, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Description list",
  component: DescriptionList,
  subcomponents: { DescriptionItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Description lists present key/value metadata using semantic dl, dt, and dd markup.",
      },
    },
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const BasicDetails: Story = {
  parameters: storyDescription("Use stacked description lists for compact metadata groups."),
  render: () => (
    <DescriptionList>
      <DescriptionItem term="Owner">Miskun</DescriptionItem>
      <DescriptionItem term="Target">Admin portal</DescriptionItem>
      <DescriptionItem term="Status">
        <StatusDot tone="success" label="Stable" />
      </DescriptionItem>
    </DescriptionList>
  ),
};

export const InlineSummary: Story = {
  parameters: storyDescription("Inline orientation works well in narrow detail panels where terms should align with values."),
  render: () => (
    <Card title="Release summary" style={{ maxWidth: 560 }}>
      <DescriptionList orientation="inline">
        <DescriptionItem term="Version">0.1.0</DescriptionItem>
        <DescriptionItem term="Package">@miskun/design-system</DescriptionItem>
        <DescriptionItem term="Owner">Design systems</DescriptionItem>
      </DescriptionList>
    </Card>
  ),
};

export const MultiColumn: Story = {
  parameters: storyDescription("Use columns for dashboard or admin summaries with several short values."),
  render: () => (
    <Grid minItemWidth="280px">
      <Card title="Component metadata">
        <DescriptionList columns={2}>
          <DescriptionItem term="Component">DataTable</DescriptionItem>
          <DescriptionItem term="Stories">8</DescriptionItem>
          <DescriptionItem term="Target">Admin</DescriptionItem>
          <DescriptionItem term="Status">Review</DescriptionItem>
        </DescriptionList>
      </Card>
      <DetailPanel title="Tooltip" meta="Overlay primitive">
        <Stack>
          <DescriptionList orientation="inline">
            <DescriptionItem term="Owner">Miskun</DescriptionItem>
            <DescriptionItem term="Target">Desktop</DescriptionItem>
            <DescriptionItem term="State">Draft</DescriptionItem>
          </DescriptionList>
          <Text tone="muted" size="sm">
            Pair description lists with detail panels when users need to inspect structured metadata.
          </Text>
        </Stack>
      </DetailPanel>
    </Grid>
  ),
};
