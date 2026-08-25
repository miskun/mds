import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
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
const stylesWithoutInlinedFonts = styles.replace(/@font-face\{[^{}]*\}/g, "");

if (!stylesWithoutInlinedFonts.includes(":root{")) {
  throw new Error("Could not find token root in dist/styles.css.");
}

const fontsCss = readFileSync("src/styles/fonts.css", "utf8");
writeFileSync(stylesPath, `${fontsCss}\n${stylesWithoutInlinedFonts}`);
stripDeclarationCssImports("dist/types");

const finalSize = (statSync(stylesPath).size / 1024).toFixed(1);
console.log(`Final dist/styles.css: ${finalSize} kB with external font files.`);

function stripDeclarationCssImports(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      stripDeclarationCssImports(entryPath);
      continue;
    }

    if (!entry.name.endsWith(".d.ts")) continue;

    const declaration = readFileSync(entryPath, "utf8");
    const nextDeclaration = declaration.replace(/^import\s+["'][^"']+\.css["'];\n?/gm, "");

    if (nextDeclaration !== declaration) {
      writeFileSync(entryPath, nextDeclaration);
    }
  }
}
