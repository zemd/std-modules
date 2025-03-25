import { describe, expect, test } from "vitest";
import { merge } from "./merge";

describe("Compatibility suite with deepmerge", () => {
  test("add keys in target that do not exist at the root", () => {
    const src = { key1: "value1", key2: "value2" };
    const target = {};
    const res = merge(target, src);

    expect(res).toStrictEqual(src);
    expect(src).toStrictEqual({ key1: "value1", key2: "value2" });
    expect(target).toStrictEqual({});
  });

  test("merge existing simple keys in target at the roots", () => {
    const src = { key1: "changed", key2: "value2" };
    const target = { key1: "value1", key3: "value3" };
    const expected = {
      key1: "changed",
      key2: "value2",
      key3: "value3",
    };

    expect(target).toStrictEqual({ key1: "value1", key3: "value3" });
    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("merge nested objects into target", () => {
    const src = {
      key1: {
        subkey1: "changed",
        subkey3: "added",
      },
    };
    const target = {
      key1: {
        subkey1: "value1",
        subkey2: "value2",
      },
    };
    const expected = {
      key1: {
        subkey1: "changed",
        subkey2: "value2",
        subkey3: "added",
      },
    };

    expect(target).toStrictEqual({
      key1: {
        subkey1: "value1",
        subkey2: "value2",
      },
    });

    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("replace simple key with nested object in target", () => {
    const src = {
      key1: {
        subkey1: "subvalue1",
        subkey2: "subvalue2",
      },
    };
    const target = {
      key1: "value1",
      key2: "value2",
    };
    const expected = {
      key1: {
        subkey1: "subvalue1",
        subkey2: "subvalue2",
      },
      key2: "value2",
    };

    expect(target).toStrictEqual({ key1: "value1", key2: "value2" });
    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("should add nested object in target", () => {
    const src = {
      b: {
        c: {},
      },
    };
    const target = {
      a: {},
    };
    const expected = {
      a: {},
      b: {
        c: {},
      },
    };

    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("should replace object with simple key in target", () => {
    const src = { key1: "value1" };
    const target = {
      key1: {
        subkey1: "subvalue1",
        subkey2: "subvalue2",
      },
      key2: "value2",
    };
    const expected = { key1: "value1", key2: "value2" };

    expect(target).toStrictEqual({
      key1: {
        subkey1: "subvalue1",
        subkey2: "subvalue2",
      },
      key2: "value2",
    });
    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("should replace objects with arrays", () => {
    const target = { key1: { subkey: "one" } };
    const src = { key1: ["subkey"] };
    const expected = { key1: ["subkey"] };

    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("should replace arrays with objects", () => {
    const target = { key1: ["subkey"] };
    const src = { key1: { subkey: "one" } };
    const expected = { key1: { subkey: "one" } };

    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("should replace dates with arrays", () => {
    const target = { key1: new Date() };
    const src = { key1: ["subkey"] };
    const expected = { key1: ["subkey"] };

    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("should replace null with arrays", () => {
    const target = {
      key1: null,
    };
    const src = {
      key1: ["subkey"],
    };
    const expected = {
      key1: ["subkey"],
    };

    expect(merge(target, src)).toStrictEqual(expected);
  });

  test("should treat regular expressions like primitive values", () => {
    const target: Record<string, RegExp> = { key1: /abc/ };
    const src: Record<string, RegExp> = { key1: /efg/ };
    const expected: Record<string, RegExp> = { key1: /efg/ };

    expect(merge(target, src)).toStrictEqual(expected);
    expect(merge<Record<"key1", RegExp>>(target, src).key1.test("efg")).toBeTruthy();
  });

  test("should treat dates like primitives", () => {
    const monday = new Date("2016-09-27T01:08:12.761Z");
    const tuesday = new Date("2016-09-28T01:18:12.761Z");
    const target = {
      key: monday,
    };
    const source = {
      key: tuesday,
    };
    const expected = {
      key: tuesday,
    };
    const actual = merge<Record<"key", Date>>(target, source);

    expect(actual).toStrictEqual(expected);
    expect(actual.key.valueOf()).toEqual(tuesday.valueOf());
  });

  test("should overwrite values when property is initialised but undefined", () => {
    const target1 = { value: [] };
    const target2 = { value: null };
    const target3 = { value: 2 };

    const src = { value: undefined };

    function hasUndefinedProperty(o: { value: unknown }): void {
      expect(Object.hasOwn(o, "value")).toBeTruthy();
      expect(typeof o.value).toBe("undefined");
    }

    hasUndefinedProperty(merge(target1, src));
    hasUndefinedProperty(merge(target2, src));
    hasUndefinedProperty(merge(target3, src));
  });
});
