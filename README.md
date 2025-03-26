# Semantic Release Plugin: Native SDK Version Retriever

> :warning: **Work in progress**: This is a beta version of the plugin

> **Note**
> This repository isn’t part of our core product.

## Overview

This plugin retrieves native SDK dependency version information from iOS and Android projects and integrates it into the semantic release workflow generate notes steps.

- Extracts SDK versions from podspec json file (iOS) and Gradle task output (Android)
- Ensures version consistency in release notes
- Automates version retrieval for better release documentation

## Installation

```sh
pnpm add -D semantic-release-native-sdk
```

## Usage

Add the plugin to your `.releaserc` configuration:

```json
{
  "plugins": [
    ...,
    [
      "semantic-release-native-sdk",
      {
        "iOSPodSpecJsonPath": "RNFingerprintjsPro.podspec.json",
        "iOSDependencyName": "FingerprintPro",
        "androidPath": "android",
        "androidGradleTaskName": "printFingerprintNativeSDKVersion",
      }
    ],
  ]
}
```

## How It Works

- The plugin reads version information from podspec json file (iOS) and a custom Gradle task output (Android).
- It automatically includes the extracted versions in the release notes.
- Helps maintain transparency about SDK versions used in each release.

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
    git clone https://github.com/fingerprintjs/semantic-release-native-sdk-plugin.git
    cd semantic-release-native-sdk-plugin
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
