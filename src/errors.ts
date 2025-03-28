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
  signal?: globalThis.NodeJS.Signals | null;

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

  /** HTTP message, fetch.Response */
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
  return create<Error>(Error, from ?? error, message, cause);
};

export const typeError = (message: string, cause?: ErrorCause, from?: From): TypeError => {
  return create<TypeError>(TypeError, from ?? typeError, message, cause);
};

export const syntaxError = (message: string, cause?: ErrorCause, from?: From): SyntaxError => {
  return create<SyntaxError>(SyntaxError, from ?? syntaxError, message, cause);
};

export const rangeError = (message: string, cause?: ErrorCause, from?: From): RangeError => {
  return create<RangeError>(RangeError, from ?? rangeError, message, cause);
};

export const httpBadRequest = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpBadRequest,
    "Bad Request",
    Object.assign(cause ?? {}, { status: 400 }),
  );
};

export const httpUnauthorized = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpUnauthorized,
    "Unauthorized",
    Object.assign(cause ?? {}, { status: 401 }),
  );
};

export const httpPaymentRequired = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpPaymentRequired,
    "Payment Required",
    Object.assign(cause ?? {}, { status: 402 }),
  );
};

export const httpForbidden = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpForbidden,
    "Forbidden",
    Object.assign(cause ?? {}, { status: 403 }),
  );
};

export const httpNotFound = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpNotFound,
    "Not Found",
    Object.assign(cause ?? {}, { status: 404 }),
  );
};

export const httpMethodNotAllowed = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpMethodNotAllowed,
    "Method Not Allowed",
    Object.assign(cause ?? {}, { status: 405 }),
  );
};

export const httpNotAcceptable = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpNotAcceptable,
    "Not Acceptable",
    Object.assign(cause ?? {}, { status: 406 }),
  );
};

export const httpProxyAuthenticationRequired = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpProxyAuthenticationRequired,
    "Proxy Authentication Required",
    Object.assign(cause ?? {}, { status: 407 }),
  );
};

export const httpRequestTimeout = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpRequestTimeout,
    "Request Timeout",
    Object.assign(cause ?? {}, { status: 408 }),
  );
};

export const httpConflict = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpConflict,
    "Conflict",
    Object.assign(cause ?? {}, { status: 409 }),
  );
};

export const httpGone = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpGone,
    "Gone",
    Object.assign(cause ?? {}, { status: 410 }),
  );
};

export const httpLengthRequired = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpLengthRequired,
    "Length Required",
    Object.assign(cause ?? {}, { status: 411 }),
  );
};

export const httpPreconditionFailed = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpPreconditionFailed,
    "Precondition Failed",
    Object.assign(cause ?? {}, { status: 412 }),
  );
};

export const httpPayloadTooLarge = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpPayloadTooLarge,
    "Payload Too Large",
    Object.assign(cause ?? {}, { status: 413 }),
  );
};

export const httpUriTooLong = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpUriTooLong,
    "URI Too Long",
    Object.assign(cause ?? {}, { status: 414 }),
  );
};

export const httpUnsupportedMediaType = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpUnsupportedMediaType,
    "Unsupported Media Type",
    Object.assign(cause ?? {}, { status: 415 }),
  );
};

export const httpRangeNotSatisfiable = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpRangeNotSatisfiable,
    "Range Not Satisfiable",
    Object.assign(cause ?? {}, { status: 416 }),
  );
};

export const httpExpectationFailed = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpExpectationFailed,
    "Expectation Failed",
    Object.assign(cause ?? {}, { status: 417 }),
  );
};

export const httpImATeapot = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpImATeapot,
    "I'm a teapot",
    Object.assign(cause ?? {}, { status: 418 }),
  );
};

export const httpMisdirectedRequest = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpMisdirectedRequest,
    "Misdirected Request",
    Object.assign(cause ?? {}, { status: 421 }),
  );
};

export const httpUnprocessableEntity = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpUnprocessableEntity,
    "Unprocessable Entity",
    Object.assign(cause ?? {}, { status: 422 }),
  );
};

export const httpLocked = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpLocked,
    "Locked",
    Object.assign(cause ?? {}, { status: 423 }),
  );
};

export const httpFailedDependency = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpFailedDependency,
    "Failed Dependency",
    Object.assign(cause ?? {}, { status: 424 }),
  );
};

export const httpTooEarly = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpTooEarly,
    "Too Early",
    Object.assign(cause ?? {}, { status: 425 }),
  );
};

export const httpUpgradeRequired = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpUpgradeRequired,
    "Upgrade Required",
    Object.assign(cause ?? {}, { status: 426 }),
  );
};

export const httpPreconditionRequired = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpPreconditionRequired,
    "Precondition Required",
    Object.assign(cause ?? {}, { status: 428 }),
  );
};

export const httpTooManyRequests = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpTooManyRequests,
    "Too Many Requests",
    Object.assign(cause ?? {}, { status: 429 }),
  );
};

export const httpRequestHeaderFieldsTooLarge = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpRequestHeaderFieldsTooLarge,
    "Request Header Fields Too Large",
    Object.assign(cause ?? {}, { status: 431 }),
  );
};

export const httpUnavailableForLegalReasons = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpUnavailableForLegalReasons,
    "Unavailable For Legal Reasons",
    Object.assign(cause ?? {}, { status: 451 }),
  );
};

export const httpInternalServerError = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpInternalServerError,
    "Internal Server Error",
    Object.assign(cause ?? {}, { status: 500 }),
  );
};

export const httpNotImplemented = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpNotImplemented,
    "Not Implemented",
    Object.assign(cause ?? {}, { status: 501 }),
  );
};

export const httpBadGateway = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpBadGateway,
    "Bad Gateway",
    Object.assign(cause ?? {}, { status: 502 }),
  );
};

export const httpServiceUnavailable = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpServiceUnavailable,
    "Service Unavailable",
    Object.assign(cause ?? {}, { status: 503 }),
  );
};

export const httpGatewayTimeout = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpGatewayTimeout,
    "Gateway Timeout",
    Object.assign(cause ?? {}, { status: 504 }),
  );
};

export const httpHttpVersionNotSupported = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpHttpVersionNotSupported,
    "HTTP Version Not Supported",
    Object.assign(cause ?? {}, { status: 505 }),
  );
};

export const httpVariantAlsoNegotiates = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpVariantAlsoNegotiates,
    "Variant Also Negotiates",
    Object.assign(cause ?? {}, { status: 506 }),
  );
};

export const httpInsufficientStorage = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpInsufficientStorage,
    "Insufficient Storage",
    Object.assign(cause ?? {}, { status: 507 }),
  );
};

export const httpLoopDetected = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpLoopDetected,
    "Loop Detected",
    Object.assign(cause ?? {}, { status: 508 }),
  );
};

export const httpNotExtended = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpNotExtended,
    "Not Extended",
    Object.assign(cause ?? {}, { status: 510 }),
  );
};

export const httpNetworkAuthenticationRequired = (cause?: ErrorCause, from?: From): Error => {
  return create<Error>(
    Error,
    from ?? httpNetworkAuthenticationRequired,
    "Network Authentication Required",
    Object.assign(cause ?? {}, { status: 511 }),
  );
};

/* eslint-enable sonarjs/no-nested-conditional */
