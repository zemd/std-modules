export type Runtime = "node" | "deno" | "bun" | "workerd" | "fastly" | "edge-light" | "other";
export const knownUserAgents: Partial<Record<Runtime, string>> = {
  deno: "Deno",
  bun: "Bun",
  workerd: "Cloudflare-Workers",
  node: "Node.js",
};

export const getRuntimeKey = (): Runtime => {
  const global = globalThis as any;

  // check if the current runtime supports navigator.userAgent
  const userAgentSupported =
    typeof navigator !== "undefined" && typeof navigator.userAgent === "string";

  // if supported, check the user agent
  if (userAgentSupported) {
    for (const [runtimeKey, userAgent] of Object.entries(knownUserAgents)) {
      if (checkUserAgentEquals(userAgent)) {
        return runtimeKey as Runtime;
      }
    }
  }

  // check if running on Edge Runtime
  if (typeof global?.EdgeRuntime === "string") {
    return "edge-light";
  }

  // check if running on Fastly
  if (global?.fastly !== undefined) {
    return "fastly";
  }

  // userAgent isn't supported before Node v21.1.0; so fallback to the old way
  if (global?.process?.release?.name === "node") {
    return "node";
  }

  // couldn't detect the runtime
  return "other";
};

export const checkUserAgentEquals = (platform: string): boolean => {
  const userAgent = navigator.userAgent;
  return userAgent.startsWith(platform);
};

export const envOptional = <T extends string>(envVar: string): T | undefined => {
  const runtimeKey = getRuntimeKey();

  if (runtimeKey === "deno") {
    // @ts-expect-error if the runtime is Deno, then Deno is defined
    // eslint-disable-next-line no-undef
    const env = Deno.env.toObject();
    return env[envVar];
  }

  // ["bun", "edge-light", "workerd", "node"] ->
  const global = globalThis as any;
  const globalEnv = (global?.process?.env ?? {}) as Record<string, string>;

  return globalEnv[envVar] as T | undefined;
};

export const envRequired = (envVar: string): string => {
  const value = envOptional(envVar);

  if (value === undefined) {
    throw new Error(`Environment variable "${envVar}" is required`);
  }

  return value;
};

export const envIntOptional = (envVar: string): number | undefined => {
  const value = envOptional(envVar);

  if (value === undefined) {
    return undefined;
  }

  const num = Number.parseInt(value, 10);

  if (Number.isNaN(num)) {
    throw new TypeError(`Environment variable "${envVar}" must be a number`);
  }

  return num;
};

export const envIntRequired = (envVar: string): number => {
  const value = envIntOptional(envVar);

  if (value === undefined) {
    throw new Error(`Environment variable "${envVar}" is required`);
  }

  return value;
};

export const envBoolOptional = (envVar: string): boolean | undefined => {
  const value = envOptional(envVar);

  if (value === undefined) {
    return undefined;
  }

  if (["true", "1", "on", "yes"].includes(value.toLowerCase())) {
    return true;
  }

  if (["false", "0", "off", "no"].includes(value.toLowerCase())) {
    return false;
  }

  throw new TypeError(
    `Environment variable "${envVar}" must be a boolean (true/false/1/0/on/off/yes/no)`,
  );
};

export const envBoolRequired = (envVar: string): boolean => {
  const value = envBoolOptional(envVar);

  if (value === undefined) {
    throw new Error(`Environment variable "${envVar}" is required`);
  }

  return value;
};

export const envPortOptional = (envVar: string): number | undefined => {
  const value = envIntOptional(envVar);

  if (value === undefined) {
    return undefined;
  }

  // Port numbers from 0 to 1023 are reserved for common TCP/IP applications and are called well-known ports
  if (value < 1024 || value > 65_535) {
    throw new RangeError(`Environment variable "${envVar}" must be a valid port number`);
  }

  return value;
};

export const envPortRequired = (envVar: string): number => {
  const value = envPortOptional(envVar);

  if (value === undefined) {
    throw new Error(`Environment variable "${envVar}" is required`);
  }

  return value;
};

export const envUrlOptional = (envVar: string): URL | undefined => {
  const value = envOptional(envVar);

  if (value === undefined) {
    return undefined;
  }

  try {
    return new URL(value);
  } catch (err: unknown) {
    const error = new TypeError(`Environment variable "${envVar}" must be a valid URL`);
    error.cause = err;
    throw error;
  }
};

export const envUrlRequired = (envVar: string): URL => {
  const value = envUrlOptional(envVar);

  if (value === undefined) {
    throw new Error(`Environment variable "${envVar}" is required`);
  }

  return value;
};

export const envJsonOptional = <T>(envVar: string): T | undefined => {
  const value = envOptional(envVar);

  if (value === undefined) {
    return undefined;
  }

  try {
    return JSON.parse(value) as T;
  } catch (err: unknown) {
    const error = new SyntaxError(`Environment variable "${envVar}" must be a valid JSON string`);
    error.cause = err;
    throw error;
  }
};

export const envJsonRequired = <T>(envVar: string): T => {
  const value = envJsonOptional<T>(envVar);

  if (value === undefined) {
    throw new Error(`Environment variable "${envVar}" is required`);
  }

  return value;
};

export const envRegexOptional = (envVar: string, regex: RegExp): string | undefined => {
  const value = envOptional(envVar);

  if (value === undefined) {
    return undefined;
  }

  if (!regex.test(value)) {
    throw new SyntaxError(`Environment variable "${envVar}" must match the regex pattern`);
  }

  return value;
};

export const envRegexRequired = (envVar: string, regex: RegExp): string => {
  const value = envRegexOptional(envVar, regex);

  if (value === undefined) {
    throw new Error(`Environment variable "${envVar}" is required`);
  }

  return value;
};

export const envOneOfOptional = <T extends string>(
  envVar: string,
  values: readonly T[],
): T | undefined => {
  const value = envOptional<T>(envVar);

  if (value === undefined) {
    return undefined;
  }

  if (!values.includes(value)) {
    throw new RangeError(
      `Environment variable "${envVar}" must be one of the allowed values. "${value}" was provided.`,
    );
  }

  return value;
};

export const envOneOfRequired = <T extends string>(envVar: string, values: readonly T[]): T => {
  const value = envOneOfOptional<T>(envVar, values);

  if (value === undefined) {
    throw new Error(`Environment variable "${envVar}" is required`);
  }

  return value;
};
