# JavaScript Standard Modules

[![npm](https://img.shields.io/npm/v/@zemd/std-modules?color=0000ff&label=npm&labelColor=000)](https://npmjs.com/package/@zemd/std-modules)

The package offers standalone ECMAScript Modules (ESM) tailored for diverse use cases.​

> [!NOTE]  
> This library is currently in active development. Many aspects are under consideration and may evolve over time.​

## Why Choose This Library?

As projects grow, they often accumulate numerous small package dependencies, leading to what's commonly known as "dependency hell." Conversely, some developers avoid comprehensive yet tightly coupled libraries like Lodash to maintain greater transparency and control over their codebase, facilitating effective tree-shaking.

While the JavaScript ecosystem continues to evolve, there's an enduring need for straightforward solutions. This library aims to consolidate such solutions that are:

- **Versatile Across Platforms and Runtimes**: Designed for seamless integration into various environments,
- **Optimized for Compilation**: Structured to work harmoniously with tree-shaking algorithms, ensuring only necessary code is included without requiring complex analyses,
- **Minimal Dependencies**: Emphasizing a standard (`std`) approach by reducing reliance on external packages
- **Easily Adaptable**: If you find a module beneficial, feel free to copy it directly into your project.

Each module is designed to be bundled effortlessly with its dependencies, if any, allowing you to import them confidently without concerns about dependency issues or additional requirements.

All modules are crafted in TypeScript, and the package includes comprehensive type definitions to enhance your development experience.

## Usage

### Installation

```bash
npm install @zemd/std-modules
```

### Available modules

| Name      | Description                                                      | Import                                                    |
| --------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| dom       | DOM utilities                                                    | `import * as dom from "@zemd/std-modules/dom"`            |
| env       | Utilities for extracting env variables                           | `import * as env from "@zemd/std-modules/env"`            |
| errors    | Utility functions for Error creation inspired by `vltpkg`        | `import { error } from "@zemd/std-modules/errors"`        |
| invariant | Simple invariant function. Inspired by `tiny-invariant` library. | `import { invariant } from "@zemd/std-modules/invariant"` |
| math      | Mathematical utility functions                                   | `import * as math from "@zemd/std-modules/math"`          |
| objects   | Missing utilities for object manipulation                        | `import * as Objects from "@zemd/std-modules/objects" `   |
| types     | Utility types for TypeScript                                     | `import { type Simplify } from "@zemd/std-modules/types"` |
| promises  | Utility functions to work with promises                          | `import * as Promises from "@zemd/std-modules/promises"`  |

### Reference

#### `@zemd/std-modules/objects`

| Name    | Description                                                                    |
| ------- | ------------------------------------------------------------------------------ |
| `merge` | Deeply merging objects into one new object. Influenced by `deepmerge` package. |
| `get`   | Get a value from an object using a path string or array of keys.               |

#### `@zemd/std-modules/types`

| Name                        | Description                                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `type Prettify`             | Inspired by https://www.totaltypescript.com/concepts/the-prettify-helper                                                |
| `type Kebab`                | Transform a string into its kebab case equivalent                                                                       |
| `type ValueOf`              | Similar to `keyof`, gets the type of all the values of an object                                                        |
| `type RemoveIndexSignature` | Removes index signatures (string, number, symbol keys) from a given type T, keeping only explicitly defined properties. |
| `type Brand`                | Brand type builder.                                                                                                     |

#### `@zemd/std-modules/env`

| Name               | Description                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `envOptional`      | Retrieves an optional environment variable depending on the runtime environment.                                                                                         |
| `envRequired`      | Retrieves a required environment variable. If the value is `undefined` throws an error.                                                                                  |
| `envIntOptional`   | Retrieves an optional `integer` variable. If the value is present uses `parseInt` to parse it, and if the value is `NaN` throw an error.                                 |
| `envIntRequired`   | Retrieves a required `integer` variable.                                                                                                                                 |
| `envBoolOptional`  | Retrieves an optional `boolean` variable. If the value is present verifies that it is one of `["true", "false", "1", "0", "on", "off", "yes", "no"]` or throws an error. |
| `envBoolRequired`  | Retrieves a required `boolean` variable.                                                                                                                                 |
| `envPortOptional`  | Retrieves an optional `integer` variable that should be used as a port number. If value is present verifies that is in range from 1024 to 65535 or throws an error.      |
| `envPortRequired`  | Retrieves a required port number variable.                                                                                                                               |
| `envUrlOptional`   | Retrieves an optional `url` variable. If the value is present builds an `Url` object. If error occurs throws an error.                                                   |
| `envUrlRequired`   | Retrieves a required `url` variable.                                                                                                                                     |
| `envJsonOptional`  | Retrieves an optional `json` variable. If the value is present parses it with `JSON.parse`. If error occurs throws an error.                                             |
| `envJsonRequired`  | Retrieves a required `json` variable.                                                                                                                                    |
| `envRegexOptional` | Retrieves an optional value that should match the provided regex.                                                                                                        |
| `envRegexRequired` | Retrieves a required value that should match the provided regex.                                                                                                         |
| `envOneOfOptional` | Retrieves an optional value that should be one of the provided values.                                                                                                   |
| `envOneOfRequired` | Retrieves a required value that should be one of the provided values.                                                                                                    |

**Recipes:**

<details>
<summary>Implementing custom `envNodeEnv`</summary>

```ts
export const ENVIRONMENTS = ["development", "production", "test"] as const;
export type Environment = (typeof ENVIRONMENTS)[number];

export const envNodeEnv = (): Environment => {
  return envOneOfRequired("NODE_ENV", ENVIRONMENTS);
};

// Usage
const nodeEnv = envRequired("NODE_ENV");
```

</details>

#### `@zemd/std-modules/invariant`

| Name        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `invariant` | Asserts the condition and throw an error if it is false. |

#### `@zemd/std-modules/math`

| Name       | Description                                              |
| ---------- | -------------------------------------------------------- |
| `clamp`    | Clamps a number between a minimum and maximum value.     |
| `lerp`     | Linear interpolation between two values.                 |
| `round`    | Rounds a number to a specified number of decimal places. |
| `random`   | Generates a random number between min and max values.    |
| `degToRad` | Converts degrees to radians.                             |
| `radToDeg` | Converts radians to degrees.                             |

#### `@zemd/std-modules/dom`

| Name                                 | Description                                               |
| ------------------------------------ | --------------------------------------------------------- |
| `caret`                              | Utilities for working with text caret position.           |
| `check`                              | DOM element checking utilities.                           |
| `cloneTree`                          | Clone DOM tree with optional filtering.                   |
| `fragment`                           | Create and manipulate document fragments.                 |
| `removeNestedElementsWithTagName`    | Remove nested elements with specific tag names.           |
| `selection`                          | Text selection utilities.                                 |
| `createCommentTreeWalker`            | Create a TreeWalker for comment nodes.                    |
| `createElementWithTagNameIterator`   | Create an iterator for elements with specific tag names.  |
| `createElementWithTagNameTreeWalker` | Create a TreeWalker for elements with specific tag names. |
| `createParentElementsIterator`       | Create an iterator for parent elements.                   |
| `createRangeTreeWalker`              | Create a TreeWalker for a specific range.                 |
| `createRangeWalkerIterator`          | Create an iterator for walking through a range.           |
| `getCommentNode`                     | Get comment nodes from DOM.                               |
| `getElementByClientCoordinates`      | Get element at specific client coordinates.               |
| `getNearestBlockElement`             | Find the nearest block-level element.                     |
| `getNearestChildTextNode`            | Find the nearest child text node.                         |
| `getNextSiblings`                    | Get next sibling elements.                                |
| `getParentElements`                  | Get parent elements in the DOM hierarchy.                 |

#### `@zemd/std-modules/errors`

| Name                              | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| error                             | builds a generic `Error`.                               |
| typeError                         | builds a `TypeError`                                    |
| syntaxError                       | builds a `SyntaxError`                                  |
| rangeError                        | builds a `RangeError`                                   |
| httpBadRequest                    | builds an `Error` with http message and status in cause |
| httpUnauthorized                  | builds an `Error` with http message and status in cause |
| httpPaymentRequired               | builds an `Error` with http message and status in cause |
| httpForbidden                     | builds an `Error` with http message and status in cause |
| httpNotFound                      | builds an `Error` with http message and status in cause |
| httpMethodNotAllowed              | builds an `Error` with http message and status in cause |
| httpNotAcceptable                 | builds an `Error` with http message and status in cause |
| httpProxyAuthenticationRequired   | builds an `Error` with http message and status in cause |
| httpRequestTimeout                | builds an `Error` with http message and status in cause |
| httpConflict                      | builds an `Error` with http message and status in cause |
| httpGone                          | builds an `Error` with http message and status in cause |
| httpLengthRequired                | builds an `Error` with http message and status in cause |
| httpPreconditionFailed            | builds an `Error` with http message and status in cause |
| httpPayloadTooLarge               | builds an `Error` with http message and status in cause |
| httpUriTooLong                    | builds an `Error` with http message and status in cause |
| httpUnsupportedMediaType          | builds an `Error` with http message and status in cause |
| httpRangeNotSatisfiable           | builds an `Error` with http message and status in cause |
| httpExpectationFailed             | builds an `Error` with http message and status in cause |
| httpImATeapot                     | builds an `Error` with http message and status in cause |
| httpMisdirectedRequest            | builds an `Error` with http message and status in cause |
| httpUnprocessableEntity           | builds an `Error` with http message and status in cause |
| httpLocked                        | builds an `Error` with http message and status in cause |
| httpFailedDependency              | builds an `Error` with http message and status in cause |
| httpTooEarly                      | builds an `Error` with http message and status in cause |
| httpUpgradeRequired               | builds an `Error` with http message and status in cause |
| httpPreconditionRequired          | builds an `Error` with http message and status in cause |
| httpTooManyRequests               | builds an `Error` with http message and status in cause |
| httpRequestHeaderFieldsTooLarge   | builds an `Error` with http message and status in cause |
| httpUnavailableForLegalReasons    | builds an `Error` with http message and status in cause |
| httpInternalServerError           | builds an `Error` with http message and status in cause |
| httpNotImplemented                | builds an `Error` with http message and status in cause |
| httpBadGateway                    | builds an `Error` with http message and status in cause |
| httpServiceUnavailable            | builds an `Error` with http message and status in cause |
| httpGatewayTimeout                | builds an `Error` with http message and status in cause |
| httpHttpVersionNotSupported       | builds an `Error` with http message and status in cause |
| httpVariantAlsoNegotiates         | builds an `Error` with http message and status in cause |
| httpInsufficientStorage           | builds an `Error` with http message and status in cause |
| httpLoopDetected                  | builds an `Error` with http message and status in cause |
| httpNotExtended                   | builds an `Error` with http message and status in cause |
| httpNetworkAuthenticationRequired | builds an `Error` with http message and status in cause |

#### `@zemd/std-modules/promises`

| Name    | Description                                              |
| ------- | -------------------------------------------------------- |
| `sleep` | Pauses execution for a specified number of milliseconds. |

## License

All packages in this monorepo are licensed under **Blue Oak Model License** 😇.

## 💙 💛 Donate

[![](https://img.shields.io/static/v1?label=UNITED24&message=support%20Ukraine&color=blue)](https://u24.gov.ua/)
