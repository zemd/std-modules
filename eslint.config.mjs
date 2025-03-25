import typescript from "@zemd/eslint-ts";

export default [
  ...typescript(),
  {
    name: "zemd/std-modules/override",
    rules: {
      "sonarjs/no-commented-code": ["off"],
    },
  },
];
