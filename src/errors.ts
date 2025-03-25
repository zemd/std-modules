/* eslint-disable sonarjs/no-nested-conditional */
import type { IncomingHttpHeaders, IncomingMessage } from "node:http";

export type ErrorCauseObject = {
  /**
   * The `cause` field within a `cause` object should always be an `Error` object that was
   * previously thrown. Note that the `cause` on an Error itself might _also_ be a
   * previously thrown error, if no additional information could be usefully added beyond
   * improving the message.
   */
  cause?: ErrorCause | unknown; // eslint-disable-line @typescript-eslint/no-redundant-type-constituents

  /** the name of something */
  name?: string;

  /** byte offset in a Buffer or file */
  offset?: number;

  /** exit code of a process, or HTTP response status code */
  status?: number | null;

  /** null or a signal that a process received */
  signal?: NodeJS.Signals | null;

  /** the current working directory of a process */
  cwd?: string;

  /** a command being run in a child process */
  command?: string;

  /** the arguments passed to a process */
  args?: string[];

  /** standard output from a process */
  stdout?: Buffer | string | null;

  /** standard error from a process */
  stderr?: Buffer | string | null;

  /** HTTP message, fetch.Response, or `@vltpkg/registry-client.CacheEntry` */
  response?:
    | IncomingMessage
    | Response
    | {
        statusCode: number;
        headers: Buffer[] | Record<string, string[] | string> | IncomingHttpHeaders;
        text?: () => string;
        [k: number | string | symbol]: any;
      };

  /** string or URL object */
  url?: URL | string;
};

export type ErrorCause = Error | ErrorCauseObject;

/**
 * An error with a cause that is a direct error cause object and not another
 * nested error.
 */
export type ErrorWithCauseObject = Error & { cause: ErrorCauseObject };

/**
 * If it is any sort of plain-ish object, assume its an error cause
 * because all properties of the cause are optional.
 */
export const isErrorCauseObject = (obj: unknown): obj is ErrorCauseObject => {
  return !!obj && typeof obj === "object" && !Array.isArray(obj);
};

/**
 * Type guard for {@link ErrorWithCauseObject} type
 */
export const isErrorRoot = (err: unknown): err is ErrorWithCauseObject => {
  return err instanceof Error && isErrorCauseObject(err.cause);
};

export const asErrorCause = (err: unknown): ErrorCause => {
  return err instanceof Error
    ? err
    : isErrorCauseObject(err)
      ? err
      : // otherwise, make an error of the stringified message
        new Error(
          // eslint-disable-next-line @typescript-eslint/no-base-to-string,eqeqeq
          err == null ? "Unknown error" : String(err) || "Unknown error",
        );
};

type ErrorCtor<T extends Error> = new (message: string, options?: { cause: ErrorCause }) => T;
type From = ((...a: any[]) => any) | (new (...a: any[]) => any);

function create<
  T extends Error,
  ArgCause extends ErrorCause | undefined = ErrorCause,
  ArgRes = ArgCause extends undefined ? T : T & { cause: ArgCause },
>(cls: ErrorCtor<T>, from: From, message: string, cause?: ArgCause): ArgRes {
  const err = new cls(message, cause ? { cause } : undefined);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Error.captureStackTrace?.(err, from);
  return err as unknown as ArgRes;
}

export const error = (message: string, cause?: ErrorCause, from?: From): Error => {
  return create(Error, from ?? error, message, cause);
};

export const typeError = (message: string, cause?: ErrorCause, from?: From): TypeError => {
  return create<TypeError>(TypeError, from ?? typeError, message, cause);
};

export const syntaxError = (message: string, cause?: ErrorCause, from?: From): SyntaxError => {
  return create<SyntaxError>(SyntaxError, from ?? syntaxError, message, cause);
};

/* eslint-enable sonarjs/no-nested-conditional */
