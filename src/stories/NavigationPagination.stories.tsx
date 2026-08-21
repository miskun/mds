import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Card, Pagination, Stack } from "../components";
import "../showcase.css";

const meta = {
  title: "MDS/Components/Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pagination moves through paged result sets and marks the current page with aria-current.",
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj;

const storyDescription = (story: string) => ({
  docs: {
    description: {
      story,
    },
  },
});

export const ResultPages: Story = {
  parameters: storyDescription("Use pagination for large result sets when users need stable pages instead of continuous loading."),
  render: () => {
    const [page, setPage] = useState(4);

    return (
      <Stack style={{ maxWidth: 760 }}>
        <Card title="Components">
          <Stack>
            <p className="mds-subtitle" style={{ fontSize: "var(--mds-font-size-md)" }}>
              Showing page {page} of 12.
            </p>
            <Pagination page={page} pageCount={12} onPageChange={setPage} />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

export const ShortResultSet: Story = {
  parameters: storyDescription("Short result sets still use previous and next controls with disabled boundary states."),
  render: () => <Pagination page={1} pageCount={3} />,
};
