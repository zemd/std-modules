import { describe, expect, test } from "vitest";
import { experimental_cloneTree } from "./cloneTree";
import { createTestBlockElement } from "./testing";
import { fragmentToString } from "./fragment";

describe("cloneTree() test suite", () => {
  test("Creating structure before the Text node", () => {
    const element = createTestBlockElement(`<strong>Hello</strong> World`);
    const fragment = experimental_cloneTree(
      element,
      element.childNodes[0]?.firstChild as Text,
      document.createTextNode("Hello"),
      "before",
    );

    expect(fragmentToString(fragment)).toEqual("<strong>Hello</strong>");
  });

  test("Creating structure after the Text node", () => {
    const element = createTestBlockElement(`<strong>Hello</strong> World`);
    const fragment = experimental_cloneTree(
      element,
      element.childNodes[0]?.firstChild as Text,
      document.createTextNode(""),
      "after",
    );

    expect(fragmentToString(fragment)).toEqual(" World");
  });
});
