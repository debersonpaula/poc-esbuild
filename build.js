const fs = require("fs");
const path = require("path");
const root = __dirname;
const output = "dist";
const template = "src/index.html";

const outputPath = path.resolve(root, output);
if (!fs.existsSync(outputPath)) {
  console.log("Creating output path: " + outputPath);
  fs.mkdirSync(outputPath, { recursive: true });
}

const inputConfigFile = path.resolve(root, template);
const outputConfigFile = path.resolve(outputPath, "index.html");
if (fs.existsSync(inputConfigFile)) {
  fs.copyFileSync(inputConfigFile, outputConfigFile);
} else {
  console.error(`Config file ${inputConfigFile} not found`);
  process.exit(1);
}

require("esbuild")
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    outfile: "dist/out.js",
  })
  .catch(() => process.exit(1));
