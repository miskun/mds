import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, Grid, Prose, Stack, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Display/Prose",
  component: Prose,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Prose styles semantic rich content with target-aware type scale, readable width, spacing, lists, links, code, quotes, and tables.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["article", "section", "div"],
      description: "Element rendered by the prose wrapper.",
    },
  },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const RichContent: Story = {
  parameters: storyDescription("Wrap semantic HTML in Prose when rendering authored content, help pages, changelogs, or editorial copy."),
  render: () => (
    <Prose>
      <h1>Designing for black surfaces</h1>
      <p>
        MDS prose keeps authored content readable without leaving the system. It supports inline{" "}
        <a href="#">navigation links</a>, strong emphasis, lists, quotes, code, and tables.
      </p>
      <h2>Writing rhythm</h2>
      <p>
        Paragraphs use the target rhythm, so content feels compact in desktop tools and more spacious in editorial contexts.
      </p>
      <ul>
        <li>Use semantic headings for document structure.</li>
        <li>Keep links descriptive and action buttons separate.</li>
        <li>Let the wrapper own vertical spacing between blocks.</li>
      </ul>
      <blockquote>
        Prose is for rich content that was authored as HTML or Markdown and rendered inside a product surface.
      </blockquote>
      <h3>Inline code</h3>
      <p>
        Token names like <code>--mds-prose-block-gap</code> inherit the same dark surface treatment as the Code primitive.
      </p>
    </Prose>
  ),
};

export const StructuredContent: Story = {
  parameters: storyDescription("Prose also covers compact technical blocks and tables used in docs or release notes."),
  render: () => (
    <Prose>
      <h2>Target rhythm</h2>
      <p>Each target provides prose tokens for size, line height, spacing, heading scale, and list indentation.</p>
      <pre>
        <code>{`<Prose>
  <h1>Release notes</h1>
  <p>Readable authored content.</p>
</Prose>`}</code>
      </pre>
      <table>
        <thead>
          <tr>
            <th>Target</th>
            <th>Use</th>
            <th>Rhythm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>desktop</td>
            <td>Native desktop apps</td>
            <td>compact</td>
          </tr>
          <tr>
            <td>admin</td>
            <td>Portals and dashboards</td>
            <td>balanced</td>
          </tr>
          <tr>
            <td>editorial</td>
            <td>Marketing and longform</td>
            <td>generous</td>
          </tr>
        </tbody>
      </table>
    </Prose>
  ),
};

export const InSurfaces: Story = {
  parameters: storyDescription("Use Prose inside cards or panels when product surfaces render formatted help, policy, or changelog content."),
  render: () => (
    <Grid minItemWidth="280px">
      <Card title="Help article">
        <Prose as="div">
          <h3>Invite reviewers</h3>
          <p>Reviewers can comment on components before a package is published.</p>
          <ol>
            <li>Open project settings.</li>
            <li>Select the reviewer group.</li>
            <li>Send the invitation.</li>
          </ol>
        </Prose>
      </Card>
      <Card title="Release note">
        <Stack gap="sm">
          <Text tone="soft" size="sm" weight="medium">Version 0.1.0</Text>
          <Prose as="div">
            <p>Added target-aware controls, display primitives, navigation, and prose styling for rich content.</p>
          </Prose>
        </Stack>
      </Card>
    </Grid>
  ),
};
