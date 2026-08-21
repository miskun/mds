import type { Preview } from "@storybook/react-vite";
import { createElement } from "react";
import "../src/styles/mds.css";

const preview: Preview = {
  globalTypes: {
    mdsTarget: {
      name: "MDS Target",
      description: "Switch MDS component ergonomics by product target",
      defaultValue: "desktop",
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
          "data-mds-target": context.globals.mdsTarget ?? "desktop",
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
            "Foundations",
            "Components",
            [
              "Actions",
              "Forms",
              "Navigation",
              "Overlays",
              "Display",
              "Feedback",
              "Data",
              "Layout",
            ],
            "Patterns",
            "Utilities",
            "Content",
            "Data Visualization",
          ],
        ],
      },
    },
    backgrounds: {
      default: "MDS Black",
      values: [
        { name: "MDS Black", value: "#050505" },
        { name: "MDS Panel", value: "#0a0a0b" },
      ],
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
