import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Card, SortHeader, Stack, StatusDot, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components";
import "./data-admin.css";
import { rows } from "./data-admin-data";

const meta = {
  title: "MDS/Components/Data/Tables",
  component: Table,
  subcomponents: { TableHead, TableBody, TableRow, TableHeader, TableCell, SortHeader },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Table primitives provide semantic table structure for simple data before richer DataTable behavior is needed.",
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const BasicTable: Story = {
  parameters: storyDescription("Use basic tables when rows do not need built-in selection, sorting state, row actions, or empty/loading handling."),
  render: () => (
    <Card title="Component status">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Component</TableHeader>
            <TableHeader>Target</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="mds-table__header--numeric">Stories</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(0, 4).map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Stack gap="xs">
                  <strong>{row.name}</strong>
                  <span className="data-muted">{row.id}</span>
                </Stack>
              </TableCell>
              <TableCell>
                <Badge tone={row.target === "admin" ? "accent" : "neutral"}>{row.target}</Badge>
              </TableCell>
              <TableCell>
                <StatusDot tone={row.status === "stable" ? "success" : row.status === "review" ? "warning" : "neutral"} label={row.status} />
              </TableCell>
              <TableCell className="mds-table__cell--numeric">{row.stories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ),
};

export const SortableHeaders: Story = {
  parameters: storyDescription("SortHeader adds accessible sort affordances when the parent owns sort state."),
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <SortHeader active direction="asc" sortLabel="Component">
            Component
          </SortHeader>
          <SortHeader sortLabel="Target">Target</SortHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Button</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>Stable</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
