import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clock, FileText, Settings } from "lucide-react";
import {
  ActivityFeed,
  ActivityItem,
  Badge,
  Button,
  DescriptionItem,
  DescriptionList,
  DetailPanel,
  Grid,
  IconButton,
  ListItem,
  Stack,
  StatusDot,
} from "../components";
import "./data-admin.css";
import { rows } from "./data-admin-data";

const meta = {
  title: "MDS/Components/Data/Detail and activity",
  component: DetailPanel,
  subcomponents: { ActivityFeed, ActivityItem },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Detail and activity primitives support record inspection, history, and contextual actions around data objects.",
      },
    },
  },
} satisfies Meta<typeof DetailPanel>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const ListAndDetail: Story = {
  parameters: storyDescription("List and detail compositions combine compact records, status metadata, contextual actions, and activity history."),
  render: () => (
    <Grid minItemWidth="320px">
      <Stack>
        {rows.slice(0, 3).map((row) => (
          <ListItem
            key={row.id}
            title={row.name}
            description={`${row.target} target maintained by ${row.owner}`}
            meta={<StatusDot tone={row.status === "stable" ? "success" : "warning"} label={row.status} />}
            media={<Badge tone="accent">{row.stories}</Badge>}
            action={<IconButton label={`Configure ${row.name}`} icon={<Settings size={14} />} />}
          />
        ))}
      </Stack>
      <DetailPanel title="DataTable" meta="Admin target · review" actions={<Button size="sm">Open</Button>}>
        <Stack>
          <DescriptionList orientation="inline">
            <DescriptionItem term="Owner">Miskun</DescriptionItem>
            <DescriptionItem term="Stories">4</DescriptionItem>
            <DescriptionItem term="Status">Review</DescriptionItem>
          </DescriptionList>
          <ActivityFeed>
            <ActivityItem title="Story added" meta="2h" icon={<FileText size={13} />}>
              Added selectable rows and row actions.
            </ActivityItem>
            <ActivityItem title="Review requested" meta="1d" icon={<Clock size={13} />}>
              Waiting for target pass on mobile.
            </ActivityItem>
          </ActivityFeed>
        </Stack>
      </DetailPanel>
    </Grid>
  ),
};
