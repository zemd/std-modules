// Merge all the intersection of a type into one type. This is useful for making tooltips better in the editor for complex types
export type Prettify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

// Transform a string into its kebab case equivalent (camelCase -> kebab-case). Useful for CSS-in-JS to CSS.
export type Kebab<T extends string, A extends string = ""> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;

// Similar to `keyof`, gets the type of all the values of an object
export type ValueOf<T> = T[keyof T];

// https://stackoverflow.com/a/66252656/1945960
export type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K];
};

declare const brand: unique symbol;
export type Brand<T, R extends string> = T & { [brand]: R };
