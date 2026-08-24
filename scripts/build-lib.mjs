import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const fontFiles = [
  "inter-cyrillic-ext.woff2",
  "inter-cyrillic.woff2",
  "inter-greek-ext.woff2",
  "inter-greek.woff2",
  "inter-vietnamese.woff2",
  "inter-latin-ext.woff2",
  "inter-latin.woff2",
  "LICENSE-Inter.txt",
];

execFileSync("vite", ["build", "--config", "vite.lib.config.ts"], { stdio: "inherit" });
execFileSync("tsc", ["-p", "tsconfig.build.json"], { stdio: "inherit" });

mkdirSync("dist/fonts", { recursive: true });

for (const fontFile of fontFiles) {
  copyFileSync(join("src/styles/fonts", fontFile), join("dist/fonts", fontFile));
}

const stylesPath = "dist/styles.css";
const styles = readFileSync(stylesPath, "utf8");
const tokenRootIndex = styles.indexOf(":root{");

if (tokenRootIndex === -1) {
  throw new Error("Could not find token root in dist/styles.css.");
}

const fontsCss = readFileSync("src/styles/fonts.css", "utf8");
writeFileSync(stylesPath, `${fontsCss}\n${styles.slice(tokenRootIndex)}`);

const finalSize = (statSync(stylesPath).size / 1024).toFixed(1);
console.log(`Final dist/styles.css: ${finalSize} kB with external font files.`);
