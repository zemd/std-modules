# JavaScript Standard Modules

The package includes independent ESM-modules for various use cases.

> [!NOTE]  
> The library is in development mode. Many things are still under consideration and reflect my opinion that can change in future.

## Why use this library?

Over time projects tend to depend on numerous number of small packages. When this is happens it is called dependency hell. On the flip side there are highly coupled, but still very useful libraries like lodash, which people try to avoid because they want have more transparency and control over internals, so the tree-shaking was possible.

JavaScript ecosystem evolves, but still we need some simple solutions. The idea behind this library is to collect these simple solutions, that:

- easy to use on different platforms or runtimes,
- easy to include and compile, knowing that tree-shaking algorithm should not have additional AI module to reason about what is needed and what is not,
- they should not have big amount of dependencies, that what it means to be `std`
- and finally, even easy to copy. Did you like something? just copy into your project.

Each module should be easily bundled with it's dependencies or should not have any. So you can confidently import it and do not worry about dependency hell or that you need to import something additionally.

All modules are written in TypeScript and the package exports type definitions.

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
| object    | Missing utilities for object manipulation                        | `import * as obj from "@zemd/std-modules/object" `        |
| types     | Utility types for TypeScript                                     | `import { type Simplify } from "@zemd/std-modules/types"` |

### Reference

#### `@zemd/std-modules/object`

| Name    | Description                                                                    |
| ------- | ------------------------------------------------------------------------------ |
| `merge` | Deeply merging objects into one new object. Influenced by `deepmerge` package. |

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

#### `@zemd/std-modules/dom`

| Name | Description |
| ---- | ----------- |
| TDB. |             |

#### `@zemd/std-modules/errors`

| Name        | Description |
| ----------- | ----------- |
| error       | TBD.        |
| typeError   | TBD.        |
| syntaxError | TBD.        |

## License

All packages in this monorepo are licensed under **Blue Oak Model License** 😇.

## 💙 💛 Donate

[![](https://img.shields.io/static/v1?label=UNITED24&message=support%20Ukraine&color=blue)](https://u24.gov.ua/)
