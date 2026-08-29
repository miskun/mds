import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Card, Eyebrow, Grid, Prose, Stack, Text } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Foundations",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const foundationAreas = [
  ["Tokens", "Color, spacing, typography, radii, focus, and state values.", "Foundations / Tokens"],
  ["Target Scale", "How desktop, mobile, admin, and editorial adjust component ergonomics.", "Foundations / Tokens / Target Scale"],
  ["Prose Rhythm", "Readable rich content defaults for marketing, docs, blogs, and product copy.", "Foundations / Tokens / Prose Rhythm"],
  ["Naming Rules", "How base, semantic, component, and state tokens should be used.", "Foundations / Tokens / Naming Rules"],
];

const rules = [
  ["Set target once", "Use MDSProvider to describe product intent for an app or subtree."],
  ["Use semantic sizes", "Treat sm, md, and lg as target-aware sizes, not fixed global dimensions."],
  ["Use surface tokens", "Build depth from black, panel, raised, control, and state surfaces."],
  ["Keep states consistent", "Focus, validation, disabled, selected, and loading states should reuse shared tokens."],
];

const targets = [
  ["desktop", "Native desktop apps", "Pointer-first, compact controls"],
  ["mobile", "Native mobile apps", "Touch-first, larger controls"],
  ["admin", "Web admin portals", "Operational control scale"],
  ["editorial", "Marketing and publishing", "Spacious reading rhythm"],
];

export const Overview: Story = {
  name: "Overview",
  render: () => (
    <Stack style={{ maxWidth: 1040 }}>
      <Prose as="header">
        <Eyebrow>Foundations</Eyebrow>
        <h1>The system rules behind every component.</h1>
        <p>
          Foundations explain how MDS turns a black-first visual language into target-aware components. Use this section for tokens, target behavior, typography, spacing, focus, and state rules.
        </p>
      </Prose>

      <div className="mds-cluster">
        <Badge tone="accent">Black-first</Badge>
        <Badge>Inter</Badge>
        <Badge>Target-aware</Badge>
        <Badge tone="success">Semantic tokens</Badge>
      </div>

      <Grid minItemWidth="220px">
        {foundationAreas.map(([title, description, location]) => (
          <Card key={title} eyebrow="Docs" title={title}>
            <Stack gap="sm">
              <Text tone="muted" size="md">
                {description}
              </Text>
              <code>{location}</code>
            </Stack>
          </Card>
        ))}
      </Grid>

      <Card eyebrow="Target model" title="Target describes product intent">
        <Stack>
          <Text tone="muted" size="md">
            Viewport is screen size. Target is ergonomics: typography, spacing, control scale, hit area, and interaction comfort.
          </Text>
          <div className="token-doc__rows">
            {targets.map(([target, use, intent]) => (
              <div className="token-doc__row" key={target}>
                <strong>{target}</strong>
                <span>{use}</span>
                <code>{intent}</code>
              </div>
            ))}
          </div>
        </Stack>
      </Card>

      <Grid minItemWidth="240px">
        {rules.map(([title, description]) => (
          <Card key={title} eyebrow="Rule" title={title}>
            <Text tone="muted" size="md">
              {description}
            </Text>
          </Card>
        ))}
      </Grid>

      <Card eyebrow="Provider" title="Apply target">
        <pre>{`<MDSProvider target="admin">
  <Button>Save</Button>
  <Input label="Name" />
</MDSProvider>`}</pre>
      </Card>
    </Stack>
  ),
};
