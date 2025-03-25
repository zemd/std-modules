import { describe, it, expect } from "vitest";
import {
  isErrorCauseObject,
  isErrorRoot,
  asErrorCause,
  error,
  typeError,
  syntaxError,
} from "./errors";

describe("error utilities", () => {
  describe("isErrorCauseObject", () => {
    it("should return true for plain objects", () => {
      expect(isErrorCauseObject({})).toBe(true);
      expect(isErrorCauseObject({ name: "test" })).toBe(true);
      expect(isErrorCauseObject({ status: 404 })).toBe(true);
    });

    it("should return false for non-objects", () => {
      expect(isErrorCauseObject(null)).toBe(false);
      expect(isErrorCauseObject(undefined)).toBe(false);
      expect(isErrorCauseObject("string")).toBe(false);
      expect(isErrorCauseObject(123)).toBe(false);
      expect(isErrorCauseObject([])).toBe(false);
    });
  });

  describe("isErrorRoot", () => {
    it("should return true for Error with cause object", () => {
      const err = new Error("test");
      (err as any).cause = { name: "cause" };
      expect(isErrorRoot(err)).toBe(true);
    });

    it("should return false for Error without cause", () => {
      expect(isErrorRoot(new Error("test"))).toBe(false);
    });

    it("should return false for non-Error values", () => {
      expect(isErrorRoot({})).toBe(false);
      expect(isErrorRoot(null)).toBe(false);
      expect(isErrorRoot("error")).toBe(false);
    });
  });

  describe("asErrorCause", () => {
    it("should return Error instance as is", () => {
      const err = new Error("test");
      expect(asErrorCause(err)).toBe(err);
    });

    it("should return error cause object as is", () => {
      const cause = { name: "test" };
      expect(asErrorCause(cause)).toBe(cause);
    });

    it("should create new Error for other values", () => {
      expect(asErrorCause("message")).toBeInstanceOf(Error);
      expect((asErrorCause("message") as Error).message).toBe("message");

      expect((asErrorCause(null) as Error).message).toBe("Unknown error");
      expect((asErrorCause(undefined) as Error).message).toBe("Unknown error");
    });
  });

  describe("error creators", () => {
    describe("error", () => {
      it("should create Error with message", () => {
        const err = error("test message");
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe("test message");
      });

      it("should create Error with cause", () => {
        const cause = { name: "cause" };
        const err = error("test message", cause);
        expect(err).toBeInstanceOf(Error);
        expect(err.cause).toBe(cause);
      });
    });

    describe("typeError", () => {
      it("should create TypeError with message", () => {
        const err = typeError("test message");
        expect(err).toBeInstanceOf(TypeError);
        expect(err.message).toBe("test message");
      });

      it("should create TypeError with cause", () => {
        const cause = { name: "cause" };
        const err = typeError("test message", cause);
        expect(err).toBeInstanceOf(TypeError);
        expect(err.cause).toBe(cause);
      });
    });

    describe("syntaxError", () => {
      it("should create SyntaxError with message", () => {
        const err = syntaxError("test message");
        expect(err).toBeInstanceOf(SyntaxError);
        expect(err.message).toBe("test message");
      });

      it("should create SyntaxError with cause", () => {
        const cause = { name: "cause", code: "ERR_TEST" };
        const err = syntaxError("test message", cause);
        expect(err).toBeInstanceOf(SyntaxError);
        expect(err.cause).toBe(cause);
      });
    });

    // it("should capture stack trace with custom from function", () => {
    //   function customFrom() {
    //     return error("test", undefined, customFrom);
    //   }
    //   const err = customFrom();
    //   expect(err.stack).not.toContain("error@");
    //   expect(err.stack).toContain("customFrom");
    // });
  });
});
