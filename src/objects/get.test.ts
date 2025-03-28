import { describe, it, expect } from "vitest";
import { get } from "./get";

describe("get function", () => {
  // Test basic object property access
  it("should get a property from an object", () => {
    const obj = { name: "John", age: 30 };
    expect(get(obj, "name")).toBe("John");
    expect(get(obj, "age")).toBe(30);
  });

  // Test nested object property access
  it("should get a nested property from an object", () => {
    const obj = {
      user: {
        name: "John",
        details: {
          age: 30,
          address: { city: "New York" },
        },
      },
    };
    expect(get(obj, "user.name")).toBe("John");
    expect(get(obj, "user.details.age")).toBe(30);
    expect(get(obj, "user.details.address.city")).toBe("New York");
  });

  // Test with non-existent properties
  it("should return null for non-existent properties", () => {
    const obj = { name: "John", age: 30 };
    expect(get(obj, "address")).toBe(null);
    expect(get(obj, "job.title")).toBe(null);
  });

  // Test with null/undefined values
  it("should return null for paths that lead to null/undefined values", () => {
    const obj = {
      name: "John",
      details: null,
      settings: {
        notifications: undefined,
      },
    };
    expect(get(obj, "details")).toBe(null);
    expect(get(obj, "details.prop")).toBe(null);
    expect(get(obj, "settings.notifications")).toBe(null);
  });

  // Test with non-object argument
  it("should throw TypeError when first argument is not an object", () => {
    expect(() => {
      return get("not an object" as any, "property");
    }).toThrow(TypeError);
    expect(() => {
      return get(42 as any, "property");
    }).toThrow(TypeError);
    expect(() => {
      return get(null as any, "property");
    }).toThrow(TypeError);
    expect(() => {
      return get(undefined as any, "property");
    }).toThrow(TypeError);
  });

  // Test TypeScript type inference with a more complex example
  it("should properly handle complex nested types", () => {
    interface User {
      id: number;
      name: string;
      settings: {
        theme: "light" | "dark";
        notifications: boolean;
        preferences: {
          language: string;
        };
      };
    }

    const user: User = {
      id: 1,
      name: "John",
      settings: {
        theme: "dark",
        notifications: true,
        preferences: {
          language: "en",
        },
      },
    };

    const theme = get(user, "settings.theme");
    expect(theme).toBe("dark");

    const language = get(user, "settings.preferences.language");
    expect(language).toBe("en");

    const languageTyped: string | null = get(user, "settings.preferences.language");
    expect(languageTyped).toBe("en");

    // Non-existent path should be typed as null
    const nonExistent = get(user, "nonExistent.path");
    expect(nonExistent).toBe(null);
    // Type assertion to ensure non-existent paths are typed as null
    const nonExistentTyped: null = get(user, "nonExistent.path");
    expect(nonExistentTyped).toBe(null);
  });

  // Test TypeScript type inference with a more complex example and optional fields
  it("should properly handle complex nested types with optional fields", () => {
    interface User {
      id?: number;
      name?: string;
      settings?: {
        theme: "light" | "dark";
        notifications: boolean;
        preferences?: {
          language?: string | undefined;
        };
      } | null;
    }

    const user: User = {
      id: 1,
      name: "John",
      settings: {
        theme: "dark",
        notifications: true,
        preferences: {
          language: "en",
        },
      },
    };

    const theme = get(user, "settings.theme");
    expect(theme).toBe("dark");

    const language = get(user, "settings.preferences.language");
    expect(language).toBe("en");
  });
});
