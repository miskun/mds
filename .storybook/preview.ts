import type { Preview } from "@storybook/react-vite";
import { createElement } from "react";
import { mdsStorybookTheme } from "./mdsTheme";
import "../src/styles/mds.css";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    mdsTarget: {
      name: "MDS Target",
      description: "Switch MDS component ergonomics by product target",
      defaultValue: "admin",
      toolbar: {
        title: "MDS Target",
        icon: "browser",
        dynamicTitle: true,
        items: [
          { value: "desktop", title: "Desktop" },
          { value: "mobile", title: "Mobile" },
          { value: "admin", title: "Web admin" },
          { value: "editorial", title: "Editorial" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) =>
      createElement(
        "div",
        {
          "data-mds-target": context.globals.mdsTarget ?? "admin",
          style: { minHeight: "100%" },
        },
        createElement(Story),
      ),
  ],
  parameters: {
    options: {
      storySort: {
        order: [
          "MDS",
          [
            "Getting Started",
            ["Introduction", "Installation", "Using Components"],
            "Foundations",
            ["Overview", "Targets", "Tokens"],
            "Components",
            [
              "Overview",
              "Actions",
              ["Overview", "Buttons"],
              "Forms",
              ["Overview", "Form layouts", "Text controls", "Selects", "Selection controls", "Search and filter controls"],
              "Navigation",
              ["Overview", "Breadcrumbs", "Link", "Tabs", "Pagination", "Nav list", "Side nav", "Tree view"],
              "Overlays",
              ["Overview"],
              "Display",
              ["Overview", "Avatar", "Description list", "Metadata", "Prose", "Records", "Metrics", "Text", "Utilities"],
              "Feedback",
              ["Overview", "Alerts", "Empty states", "Loading", "Toasts"],
              "Data",
              ["Overview", "Tables", "Data table", "Toolbars and bulk actions", "Detail and activity"],
              "Layout",
              ["Overview", "Flex", "Grid", "Page header"],
              "Containers",
              ["Overview"],
            ],
            "Patterns",
            ["Overview"],
            "Content",
            ["Overview"],
            "Utilities",
            ["Overview"],
            "Data Visualization",
            ["Overview"],
          ],
        ],
      },
    },
    backgrounds: {
      default: "MDS Black",
      values: [
        { name: "MDS Black", value: "#000000" },
        { name: "MDS Panel", value: "#0a0a0b" },
      ],
    },
    docs: {
      theme: mdsStorybookTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
