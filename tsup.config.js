import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/dom.ts",
    "src/env.ts",
    "src/errors.ts",
    "src/invariant.ts",
    "src/objects.ts",
    "src/types.ts",
    "src/promises.ts",
  ],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  format: ["esm"],
});
