import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/dom.ts",
    "src/env.ts",
    "src/errors.ts",
    "src/invariant.ts",
    "src/object.ts",
    "src/types.ts",
  ],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  format: ["esm"],
});
