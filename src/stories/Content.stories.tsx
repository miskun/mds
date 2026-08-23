import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Alert, Badge, Button, Card, Checkbox, ComboBox, Dialog, EmptyState, Input, StatusDot, Switch, Tag, Textarea, Toast } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Content/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

const principles = [
  ["Concise", "Use the fewest words that preserve meaning."],
  ["Specific", "Name the object, state, or next action."],
  ["Actionable", "Tell users what they can do next when something needs attention."],
  ["Product-focused", "Prefer domain language over implementation language."],
];

const labelRows = [
  ["Field label", "Release channel", "Choose release channel"],
  ["Button", "Publish", "Submit"],
  ["Menu item", "Duplicate component", "Make copy"],
  ["Tab", "Tokens", "Token stuff"],
];

const statusRows = [
  ["stable", "Ready for production use."],
  ["review", "Needs design or implementation review."],
  ["draft", "Still being shaped and not ready to publish."],
  ["blocked", "Needs a specific fix before work can continue."],
];

export const Overview: Story = {
  name: "Introduction",
  parameters: storyDescription("Content guidelines keep labels, hints, errors, and state copy consistent across MDS examples and products."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Content</p>
        <h1 className="mds-title">Clear interface copy for focused tools.</h1>
        <p className="mds-subtitle">
          MDS copy should be concise, specific, and useful in context. Avoid explaining the UI when the component already communicates state.
        </p>
      </header>

      <Card eyebrow="Principles" title="Write for the next action">
        <div className="token-doc__rows">
          {principles.map(([name, description]) => (
            <div className="token-doc__row" key={name}>
              <strong>{name}</strong>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mds-cluster">
        <Tag>concise</Tag>
        <Tag>specific</Tag>
        <Tag>actionable</Tag>
      </div>
    </div>
  ),
};

export const LabelsAndActions: Story = {
  parameters: storyDescription("Labels should identify the object. Actions should use verbs that match the result."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 860 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Labels and actions</p>
        <h1 className="mds-title">Name controls by what users recognize.</h1>
        <p className="mds-subtitle">
          Field labels are usually nouns. Button and menu labels are usually verbs.
        </p>
      </header>

      <table className="token-doc__table">
        <thead>
          <tr>
            <th>Surface</th>
            <th>Use</th>
            <th>Avoid</th>
          </tr>
        </thead>
        <tbody>
          {labelRows.map(([surface, good, avoid]) => (
            <tr key={surface}>
              <td>{surface}</td>
              <td>{good}</td>
              <td>{avoid}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Card eyebrow="Example" title="Publish component">
        <div className="mds-stack">
          <Input label="Component name" defaultValue="DataTable" />
          <ComboBox
            label="Release channel"
            defaultValue="review"
            options={[
              { value: "draft", label: "Draft" },
              { value: "review", label: "Review" },
              { value: "stable", label: "Stable" },
            ]}
          />
          <div className="mds-cluster">
            <Button>Publish</Button>
            <Button variant="secondary">Save draft</Button>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const HintsAndHelp: Story = {
  parameters: storyDescription("Hints should clarify impact or constraints. Skip hints when the label and component are already enough."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 720 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Hints and help</p>
        <h1 className="mds-title">Help when it changes the decision.</h1>
        <p className="mds-subtitle">
          Hints are most useful for consequences, constraints, formatting, and product-specific meaning.
        </p>
      </header>

      <Card eyebrow="Good hint" title="Explains consequence">
        <Switch label="Show command hints" hint="Surface shortcuts next to frequent actions." defaultChecked />
      </Card>

      <Card eyebrow="Unneeded hint" title="Repeats the label">
        <Input label="Name" placeholder="Miskun Design System" hint="Enter a name." />
      </Card>

      <Alert tone="info" title="Keep help close">
        Put helper text near the control it explains. Use tooltips for compact context, not required instructions.
      </Alert>
    </div>
  ),
};

export const ErrorMessages: Story = {
  parameters: storyDescription("Errors should name the problem and point to a recovery action."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 720 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Errors</p>
        <h1 className="mds-title">Say what happened and how to recover.</h1>
        <p className="mds-subtitle">
          Avoid blame, codes, or vague failure text unless the code helps support.
        </p>
      </header>

      <Card eyebrow="Validation" title="Field-level error">
        <div className="mds-stack">
          <Input label="Slug" defaultValue="mds" error="This slug is already reserved." />
          <ComboBox
            label="Release target"
            defaultValue=""
            error="Select a target before publishing."
            placeholder="Choose target"
            options={[
              { value: "desktop", label: "Desktop" },
              { value: "mobile", label: "Mobile" },
              { value: "admin", label: "Admin portal" },
              { value: "editorial", label: "Editorial" },
            ]}
          />
        </div>
      </Card>

      <Alert tone="danger" title="Publish blocked">
        Resolve invalid fields before publishing this component.
      </Alert>
    </div>
  ),
};

export const EmptyAndLoadingStates: Story = {
  parameters: storyDescription("Empty and loading copy should preserve context and offer a useful next step when one exists."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 760 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Empty and loading</p>
        <h1 className="mds-title">Explain the state, then offer recovery.</h1>
        <p className="mds-subtitle">
          Empty states should say what is missing and how to move forward. Loading labels should name what is loading.
        </p>
      </header>

      <EmptyState
        title="No matching components"
        description="Clear active filters or create a new component."
        action={<Button>Create component</Button>}
      />

      <Toast title="Component saved" action={<Button size="sm" variant="secondary">View</Button>}>
        Button stories were updated.
      </Toast>
    </div>
  ),
};

export const ConfirmationDialogs: Story = {
  parameters: storyDescription("Confirmation copy should make the consequence clear and keep the destructive action specific."),
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="mds-stack" style={{ maxWidth: 720 }}>
        <header className="mds-stack">
          <p className="mds-kicker">Confirmation dialogs</p>
          <h1 className="mds-title">Confirm decisions with consequences.</h1>
          <p className="mds-subtitle">
            Dialog titles should name the action. Body copy should explain what changes.
          </p>
        </header>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          trigger={<Button variant="danger">Archive component</Button>}
          title="Archive component"
          description="Archived components are hidden from public documentation."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Archive
              </Button>
            </>
          }
        >
          <Alert tone="warning" title="This can be restored later">
            The component remains available to maintainers.
          </Alert>
        </Dialog>
      </div>
    );
  },
};

export const StatusText: Story = {
  parameters: storyDescription("Status text should use a small shared vocabulary and avoid introducing new synonyms for the same state."),
  render: () => (
    <div className="mds-stack" style={{ maxWidth: 760 }}>
      <header className="mds-stack">
        <p className="mds-kicker">Status text</p>
        <h1 className="mds-title">Use the same words for the same states.</h1>
        <p className="mds-subtitle">
          Stable, review, draft, and blocked cover most MDS documentation states.
        </p>
      </header>

      <Card eyebrow="Vocabulary" title="Shared statuses">
        <div className="token-doc__rows">
          {statusRows.map(([status, description]) => (
            <div className="token-doc__row" key={status}>
              <StatusDot tone={status === "stable" ? "success" : status === "blocked" ? "danger" : status === "review" ? "warning" : "neutral"} label={status} />
              <span>{description}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mds-cluster">
        <Badge tone="success">stable</Badge>
        <Badge>draft</Badge>
        <Badge tone="danger">blocked</Badge>
      </div>

      <Card eyebrow="Form copy" title="Status fields">
        <div className="mds-stack">
          <Checkbox label="Publish component" error="Publishing requires at least one stable story." />
          <Textarea label="Review note" placeholder="Summarize what needs review" />
        </div>
      </Card>
    </div>
  ),
};
