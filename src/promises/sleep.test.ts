import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sleep } from "./sleep";

describe("sleep function", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should resolve after the specified timeout", async () => {
    const promise = sleep(1000);

    // Fast-forward time by 1000ms
    vi.advanceTimersByTime(1000);

    await expect(promise).resolves.toBeUndefined();
  });

  it("should throw an error if timeout is not an integer", async () => {
    await expect(sleep(Number.NaN)).rejects.toThrow("Timeout must be a valid integer.");
    await expect(sleep("1000" as any)).rejects.toThrow("Timeout must be a valid integer.");
    await expect(sleep(1000.5)).rejects.toThrow("Timeout must be a valid integer.");
  });

  it("should include the received value in the error cause when timeout is invalid", async () => {
    try {
      await sleep("invalid" as any);
    } catch (error: any) {
      expect(error.cause).toEqual({ received: "invalid" });
    }
  });

  it("should throw if AbortSignal is already aborted before starting", async () => {
    const controller = new AbortController();
    controller.abort("test reason");

    await expect(sleep(1000, controller.signal)).rejects.toThrow(
      "The sleep method was aborted before start.",
    );
  });

  it("should include the abort reason in the error cause when aborted before start", async () => {
    const controller = new AbortController();
    controller.abort("test reason");

    try {
      await sleep(1000, controller.signal);
    } catch (error: any) {
      expect(error.cause).toEqual({ cause: { reason: "test reason" } });
    }
  });

  it("should throw if AbortSignal is aborted during sleep", async () => {
    const controller = new AbortController();
    const promise = sleep(2000, controller.signal);

    // Advance time by 500ms and then abort
    vi.advanceTimersByTime(500);
    controller.abort("aborted during sleep");

    await expect(promise).rejects.toThrow("The sleep method aborted.");
  });

  it("should include the abort reason in the error cause when aborted during sleep", async () => {
    const controller = new AbortController();
    const promise = sleep(2000, controller.signal);

    // Advance time by 500ms and then abort
    vi.advanceTimersByTime(500);
    controller.abort("aborted during sleep");

    try {
      await promise;
    } catch (error: any) {
      expect(error.cause).toEqual({
        cause: { reason: "aborted during sleep" },
      });
    }
  });

  it("should handle Error objects as abort reasons", async () => {
    const controller = new AbortController();
    const customError = new Error("Custom error");
    const promise = sleep(2000, controller.signal);

    vi.advanceTimersByTime(500);
    controller.abort(customError);

    try {
      await promise;
    } catch (error: any) {
      expect(error.cause).toEqual({ cause: customError });
    }
  });

  it("should clean up timers when aborted", async () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");
    const controller = new AbortController();
    const promise = sleep(2000, controller.signal);

    vi.advanceTimersByTime(500);
    controller.abort();

    try {
      await promise;
    } catch {
      expect(clearTimeoutSpy).toHaveBeenCalled();
    }
  });
});
