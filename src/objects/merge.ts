/**
 * Checks if a value is a plain object.
 */
const isPlainObject = (value: unknown): boolean => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value) as unknown;
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
};

type TInput = Record<string, any>;

/**
 * Deeply merges objects.
 *
 * This function takes any number of objects and deeply merges them into a new object.
 * If two or more objects have the same property, the property value from the last object
 * in the arguments list will be used. All properties are deeply cloned.
 */
export const merge = <TReturn extends Record<string, any>>(
  ...inputs: (TInput | null | undefined)[]
): TReturn => {
  if (inputs.length === 0) {
    return {} as TReturn;
  }
  const initial: TReturn = {} as TReturn;
  return inputs.reduce<TReturn>((acc, input) => {
    if (typeof input !== "object" || Array.isArray(input)) {
      return acc;
    }
    for (const prop in input) {
      if (isPlainObject(input[prop]) && !Array.isArray(input[prop])) {
        acc[prop as keyof TReturn] = merge(acc[prop] as TInput, input[prop] as TInput);
      } else if (typeof input[prop] === "function") {
        acc[prop as keyof TReturn] = input[prop] as unknown as TReturn[keyof TReturn];
      } else {
        acc[prop as keyof TReturn] = structuredClone(
          input[prop],
        ) as unknown as TReturn[keyof TReturn];
      }
    }
    return acc;
  }, initial);
};
