import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: ["src/dom/**/*.test.ts"],
          name: "browser",
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            headless: true,
            screenshotFailures: false,
            fileParallelism: false,
          },
          environment: "happy-dom",
          maxConcurrency: 1,
        },
      },
      {
        test: {
          include: ["**/*.test.ts"],
          exclude: [
            "src/dom/**",
            "**/node_modules/**",
            "**/dist/**",
            "**/.{idea,git,cache,output,temp}/**",
            "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
          ],
          name: "unit",
          environment: "node",
        },
      },
    ],
  },
});
