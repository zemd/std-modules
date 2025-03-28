const causeWithReason = (reason: any) => {
  return reason instanceof Error ? { cause: reason } : { cause: { reason } };
};

export const sleep = async (timeout: number, signal?: AbortSignal): Promise<void> => {
  if (!Number.isInteger(timeout)) {
    throw new TypeError("Timeout must be a valid integer.", {
      cause: {
        received: timeout,
      },
    });
  }
  if (signal?.aborted) {
    throw new Error("The sleep method was aborted before start.", {
      cause: causeWithReason(signal.reason),
    });
  }

  return new Promise<void>((resolve, reject) => {
    const combinedSignal = AbortSignal.any([
      signal ?? new AbortController().signal,
      AbortSignal.timeout(timeout),
    ]);
    const timer = setTimeout(() => {
      resolve();
    }, timeout);
    const abortHandler = () => {
      clearTimeout(timer);
      reject(
        new Error("The sleep method aborted.", {
          cause: causeWithReason(combinedSignal.reason),
        }),
      );
    };
    combinedSignal.addEventListener("abort", abortHandler, { once: true });
  });
};
