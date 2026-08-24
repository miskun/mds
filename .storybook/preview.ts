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
            "Components",
            [
              "Overview",
              "Actions",
              "Forms",
              "Navigation",
              "Overlays",
              "Display",
              "Feedback",
              "Data",
              "Layout",
              "Containers",
            ],
            "Patterns",
            "Content",
            "Utilities",
            "Data Visualization",
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
