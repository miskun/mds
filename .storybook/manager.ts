import { addons } from "storybook/manager-api";
import { mdsStorybookTheme } from "./mdsTheme";

addons.setConfig({
  theme: mdsStorybookTheme,
});
