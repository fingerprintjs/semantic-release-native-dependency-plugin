# Semantic Release Plugin: Native Dependency Version Retriever

> **Note**
> This repository isn’t part of our core product.

## Overview

This plugin retrieves native dependency version information from iOS and/or Android projects and integrates it into the
semantic release workflow generate notes steps.

- Extracts dependency versions from podspec file (iOS) and/or Gradle task output (Android)
- Ensures version consistency in release notes
- Automates version retrieval for better release documentation

## Installation

```sh
pnpm add -D @fingerprintjs/semantic-release-native-dependency-plugin
```

## Usage

Add the plugin to your `.releaserc` configuration:

```json
{
  "plugins": [
    ...,
    [
      "@fingerprintjs/semantic-release-native-dependency-plugin",
      {
        "heading": "Supported Native SDK Version Range",
        "platforms": {
          "iOS": {
            "podSpecPath": "RNFingerprintjsPro.podspec.json",
            "dependencyName": "FingerprintPro",
            "displayName": "Fingerprint iOS SDK"
          },
          "android": {
            "path": "android",
            "gradleTaskName": "printFingerprintNativeSDKVersion",
            "displayName": "Fingerprint Android SDK"
          }
        }
      }
    ]
  ]
}
```

### Plugin Configuration Reference

| Key                                | Type     | Default               | Description                                                                  |
|------------------------------------|----------|-----------------------|------------------------------------------------------------------------------|
| `heading`                          | `string` | `Native Dependencies` | Optional h3 heading shown before listing platform specific version ranges.   |
| `platforms`                        | `object` |                       | Top-level object defining configuration for each platform.                   |
| `platforms.iOS`                    | `object` |                       | Configuration for the iOS dependency version resolution.                     |
| `platforms.iOS.podSpecPath`        | `string` |                       | Path to the PODSPEC file containing iOS dependency metadata.                 |
| `platforms.iOS.dependencyName`     | `string` |                       | Name of the dependency to extract the version.                               |
| `platforms.iOS.displayName`        | `string` | `iOS`                 | Name for the iOS dependency shown in release notes.                          |
| `platforms.android`                | `object` |                       | Configuration for the Android dependency version resolution.                 |
| `platforms.android.path`           | `string` |                       | Relative path to the Android project directory which contains `build.gradle. |
| `platforms.android.gradleTaskName` | `string` |                       | Name of the custom Gradle task that outputs the dependency version.          |
| `platforms.android.displayName`    | `string` | `android`             | Name for the Android dependency shown in release notes.                      |

> **Note:** You can configure one or both platforms depending on your project needs. At least one platform
> (`iOS` or `android`) must be configured. The plugin will throw an error if both are omitted.

## How It Works

- The plugin reads version information from podspec file (iOS) and/or a custom Gradle task output (Android).
- It automatically includes the extracted versions in the release notes.
- Helps maintain transparency about dependency versions used in each release.

Example generated release notes:

```markdown
## 3.4.0 (https://github.com/.../compare/v3.3.1...v3.4.0) (2025-04-10)

### Features

* example feat release ([018455b](https://github.com/.../commit/...))

### Supported Native SDK Version Range

* Fingerprint Android SDK Version Range: `>= 2.7.0 and < 3.0.0`
* Fingerprint iOS SDK Version Range: `>= 2.7.0 and < 3.0.0`
```

## Requirements

- Node.js 20.8.1 or higher
- Semantic Release configured in your project

## Contribution & Development

We welcome contributions! To get started with development:

### Development Environment

- **Node.js 20.8.1 or higher** required
- Uses **pnpm** as the package manager
- Code follows ESLint and Prettier configurations
- Uses **[Husky][husky]** and **[Lint-Staged][lint-staged]** for pre-commit checks
- **[Jest][jest]** for testing
- **[Commitizen][commitizen]** for conventional commits

### Setup

1. Clone the repository
    ```shell
    git clone https://github.com/fingerprintjs/semantic-release-native-dependency-plugin.git
    cd semantic-release-native-dependency-plugin
    ```
2. Install dependencies
    ```shell
    pnpm install
    ```
3. Integrate git hooks
    ```shell
    pnpm prepare
    ```

### Development Workflow

- Start development mode with live rebuilds:
    ```shell
    pnpm start
    ```
  or build the project manually:
    ```shell
    pnpm build
    ```
- Run tests:
    ```shell
    pnpm test
    pnpm test:coverage # run tests with coverage report
    ```
- Lint and format code:
    ```shell
    pnpm lint
    pnpm lint:fix # auto fix issues
    ```
- Run type checks:
    ```shell
    pnpm typecheck
    ```
- Generate documentation:
    ```shell
    pnpm docs
    ```

## License

MIT

[husky]: https://typicode.github.io/husky

[lint-staged]: https://github.com/lint-staged/lint-staged

[jest]: https://jestjs.io

[commitizen]: https://commitizen-tools.github.io/commitizen
