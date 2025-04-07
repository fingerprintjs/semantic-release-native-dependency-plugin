# Semantic Release Plugin: Native Dependency Version Retriever

> **Note**
> This repository isn’t part of our core product.

## Overview

This plugin retrieves native dependency version information from iOS and/or Android projects and integrates it into the semantic release workflow generate notes steps.

- Extracts dependency versions from podspec json file (iOS) and/or Gradle task output (Android)
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
        "platforms": {
          "iOS": {
            "podSpecJsonPath": "RNFingerprintjsPro.podspec.json",
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

## How It Works

- The plugin reads version information from podspec json file (iOS) and/or a custom Gradle task output (Android).
- It automatically includes the extracted versions in the release notes.
- Helps maintain transparency about dependency versions used in each release.

## Requirements

- Node.js 20.8.1 or higher
- Semantic Release configured in your project

## Contribution & Development

We welcome contributions! To get started with development:

### Development Environment

- **Node.js 20.8.1 or higher** required
- Uses **pnpm** as the package manager
- Code follows ESLint and Prettier configurations
- Uses **Husky** and **Lint-Staged** for pre-commit checks
- **Jest** for testing
- **Commitizen** for conventional commits

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
